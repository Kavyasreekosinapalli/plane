import { test, expect } from "@playwright/test";

test.describe("Project API Integration", () => {
  test("should create a project successfully", async ({ request }) => {
    const workspaceSlug = "test-assignment-1777541157559";
    const projectName = `Proj-${Date.now()}`;

    const response = await request.post(`https://api.plane.so/api/workspaces/${workspaceSlug}/projects/`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: projectName,
        identifier: `${Date.now()}`.slice(-10),
        description: "Integration test project",
      },
    });

    console.log("Status:", response.status());
    const body = await response.json();
    console.log("Response:", body);

    expect(response.status()).toBe(201); // Plane usually returns 201 for create
    expect(body.name).toBe(projectName);
    expect(body.identifier).toBeDefined();

    console.log("Project API test passed");
  });
});
