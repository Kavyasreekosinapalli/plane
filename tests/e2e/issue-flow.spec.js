import { test, expect } from "@playwright/test";

test("Create issue, update details and verify in list", async ({ page }) => {
  // Go to project
  await page.goto("/");

  await page.getByLabel("Main sidebar").getByRole("link", { name: "Projects" }).click();
  await page.getByRole("link", { name: /Test assignment/i }).click();
  console.log("Navigated to project successfully");

  // Create Issue
  const issueTitle = `Issue-${Date.now()}`;

  await page.getByRole("button", { name: "Add work item" }).click();
  await page.getByRole("textbox", { name: "Title" }).fill(issueTitle);
  await page.locator(".tiptap").first().fill("Initial description");
  await page.getByRole("button", { name: "Save" }).click();
  console.log("Issue created successfully");

  // Verify issue created in list
  await expect(page.getByText(issueTitle)).toBeVisible();
  console.log("Issue verified in list");

  // Open issue
  const issue = page.locator(`text=${issueTitle}`).first();
  await issue.waitFor({ state: "visible", timeout: 60000 });
  await issue.click();
  //await page.getByText(issueTitle).click();
  console.log("Issue opened successfully");

  // Edit title
  const updatedTitle = issueTitle + "-updated";
  await page.getByRole("textbox", { name: "Work item title" }).fill(updatedTitle);

  // Edit description
  await page.locator(".tiptap").first().fill("Updated description");
  console.log("Issue updated with new title and description");

  // Assign user
  await page.getByRole("button", { name: "Add assignees" }).first().click();
  await page.locator("div").filter({ hasText: "You" }).nth(11).click();
  console.log("User assigned successfully");

  // Change status: Backlog → Done

  await page.getByRole("button", { name: "Backlog" }).nth(1).click();
  //   await page.locator('[id="base-ui-:ris:"]').click();
  //   await page.locator('[id="headlessui-combobox-option-:rme:"]').getByText('Done').click();
  await page.getByRole("option", { name: "Done" }).click();

  console.log("Issue status changed to Done");
  // await page.pause();

  // Go back to list

  await page
    .locator("button", {
      has: page.locator("svg.lucide-move-right"),
    })
    .click();
  console.log("Navigated back to Work Items list");

  // Final verification
  await expect(page.getByText(updatedTitle)).toBeVisible();
  console.log("Final verification successful: updated issue is visible in list");
});
