from playwright.sync_api import sync_playwright
import time

def run(playwright):
    browser = playwright.chromium.launch()
    context = browser.new_context()
    page = context.new_page()

    # Navigate to the local file
    import os
    page.goto(f"file://{os.getcwd()}/index.html")

    # Give the page time to load
    time.sleep(2)

    # Desktop screenshot
    page.set_viewport_size({"width": 1280, "height": 800})
    page.screenshot(path="jules-scratch/verification/desktop_header.png")

    # Mobile screenshot
    page.set_viewport_size({"width": 375, "height": 667})
    page.screenshot(path="jules-scratch/verification/mobile_header.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
