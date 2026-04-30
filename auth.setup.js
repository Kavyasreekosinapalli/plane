const { chromium } = require("@playwright/test");

(async () => {
  const browser = await chromium.launch({ headless: false });

  const context = await browser.newContext();
  const page = await context.newPage();

  console.log("🚀 Opening Plane login...");

  await page.goto("https://app.plane.so");

  console.log("🔐 Please login manually in the opened browser...");

  await page.pause();

  console.log("⏳ Waiting for dashboard...");

  const workspaceSwitcher = page.getByRole("button", {
    name: "Open workspace switcher",
  });

  await workspaceSwitcher.waitFor({ timeout: 120000 });

  console.log("✅ Login successful");

  await page.waitForTimeout(2000);

  await context.storageState({
    path: "storageState.json",
  });

  console.log("💾 storageState.json saved successfully");

  await browser.close();
})();
