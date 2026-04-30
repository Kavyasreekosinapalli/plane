const { chromium } = require("@playwright/test");

(async () => {
  const browser = await chromium.launch({ headless: false });

  const context = await browser.newContext();
  const page = await context.newPage();

  console.log("🚀 Opening Plane login...");

  await page.goto("https://app.plane.so");

  // =========================
  // 1️⃣ LOGIN FLOW (MANUAL OR AUTO)
  // =========================

  await page.getByRole("textbox", { name: "Email" }).fill("kavyasree@yopmail.com");
  await page.getByRole("button", { name: "Continue" }).click();

  await page.getByRole("textbox", { name: "Unique code" }).fill("397512"); // replace with dynamic OTP if needed
  await page.getByRole("button", { name: "Continue" }).click();

  // =========================
  // 2️⃣ WAIT FOR REAL LOGIN SUCCESS
  // =========================

  console.log("⏳ Waiting for dashboard to load...");

  const workspaceSwitcher = page.getByRole("button", {
    name: "Open workspace switcher",
  });

  await workspaceSwitcher.waitFor({ timeout: 120000 });

  console.log("✅ Login successful");

  // small buffer for tokens/localStorage
  await page.waitForTimeout(2000);

  // =========================
  // 3️⃣ SAVE AUTH STATE
  // =========================

  await context.storageState({
    path: "storageState.json",
  });

  console.log("💾 storageState.json saved successfully");

  await browser.close();
})();
