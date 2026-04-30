const { test, expect } = require("@playwright/test");

//1. login ->create workspace-> create project

test("Create workspace and project after login", async ({ page }) => {
  //Create Workspace
  await page.goto("/");

  await page.locator("h4").first().click();

  await page.getByRole("link", { name: "Create workspace" }).click();

  // Workspace name
  const workspaceName = `Test assignment ${Date.now()}`;
  await page.getByRole("textbox", { name: "Name your workspace*" }).fill(workspaceName);

  // Select range
  await page.getByRole("button", { name: "Select a range" }).click();
  await page.getByText("-10").click();

  // Create workspace
  const createBtn = page.getByRole("button", { name: "Create workspace" });
  await expect(createBtn).toBeVisible({ timeout: 10000 });

  await createBtn.click();
  console.log("workspace created successfully");

  // Create Project

  await page.getByLabel("Main sidebar").getByRole("link", { name: "Projects" }).click();

  await page.getByText("Add Project", { exact: true }).click();

  const projectName = `Proj-${Date.now()}`;

  await page.locator("#name").fill(projectName);

  // 10-digit numeric unique ID
  const projectId =
    (Date.now() % 1e7).toString().padStart(7, "0") +
    Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");

  await page.locator("#identifier").fill(projectId);

  await page.locator("#description").fill("Test project created by automation");

  await page.getByRole("button", { name: /create project/i }).click();

  console.log("project created successfully");
});
