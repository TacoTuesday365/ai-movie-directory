import asyncio
from playwright.async_api import async_playwright, expect
import os
import json

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # A smaller list of movies to speed up the test
        mock_movies_list = [
            {"title": "The Creator", "year": "2023"},      # New Releases
            {"title": "I, Robot", "year": "2004"},         # Modern Classics
            {"title": "Blade Runner", "year": "1982"},    # Golden Age
            {"title": "Metropolis", "year": "1927"}       # Vintage
        ]

        # This script will run before the page's scripts, overwriting the movie list
        init_script = f"""
            window.aiMovies = {json.dumps(mock_movies_list)};
        """
        await page.add_init_script(init_script)

        # Mock movie data to be returned by the intercepted request
        # We need to provide a valid poster to avoid broken images
        mock_movie_details = {
            "Title": "Test Movie From Mock",
            "Year": "2024",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMjA5ODU3NTI0MV5BMl5BanBnXkFtZTcwODczMTk2Mw@@._V1_SX300.jpg",
            "Plot": "A test plot for a test movie.",
            "imdbRating": "8.8",
            "Response": "True"
        }

        async def handle_route(route, request):
            if "/.netlify/functions/get_movies" in request.url:
                await route.fulfill(
                    status=200,
                    content_type="application/json",
                    body=json.dumps(mock_movie_details)
                )
            else:
                await route.continue_()

        await page.route("**/*", handle_route)

        file_path = os.path.abspath('index.html')
        await page.goto(f'file://{file_path}', wait_until='domcontentloaded')

        # Wait for the hero section to load and display our mock data
        hero_title = page.locator('.hero-title')
        await expect(hero_title).to_have_text("Test Movie From Mock", timeout=30000)

        # Wait for all 4 carousels to be visible
        await expect(page.locator('.carousel-title')).to_have_count(4, timeout=30000)

        # Wait for all 4 movie cards to be visible
        await expect(page.locator('.movie-card')).to_have_count(4, timeout=30000)

        # Give it a little extra time for images to render
        await page.wait_for_timeout(2000)

        await page.screenshot(path="jules-scratch/verification/verification.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
