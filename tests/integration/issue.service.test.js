import { test, expect } from "@playwright/test";

test.describe("Issue API Integration", () => {
  test("should create and update an issue", async ({ request }) => {
    const workspaceSlug = "test-assignment-1777541157559";
    const projectId = "c52aa904-85fd-424c-96b2-d47f0d2c15e6";

    const issueTitle = `Issue-${Date.now()}`;

    // CREATE ISSUE
    const createRes = await request.post(
      `https://api.plane.so/api/workspaces/${workspaceSlug}/projects/${projectId}/issues/`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          name: issueTitle,
          description_html: "<p>Test issue</p>",
        },
      }
    );

    console.log("Create Status:", createRes.status());

    const created = await createRes.json();
    console.log("Create Response:", created);

    expect(createRes.status()).toBe(201);
    expect(created.name).toBe(issueTitle);

    // UPDATE ISSUE
    const updatedTitle = issueTitle + "-updated";

    const updateRes = await request.patch(
      `https://api.plane.so/api/workspaces/${workspaceSlug}/projects/${projectId}/issues/${created.id}/`,
      {
        data: {
          name: updatedTitle,
        },
      }
    );

    console.log("Update Status:", updateRes.status());

    // 204 = success, no content
    expect(updateRes.status()).toBe(204);

    // VERIFY USING GET
    const getRes = await request.get(
      `https://api.plane.so/api/workspaces/${workspaceSlug}/projects/${projectId}/issues/${created.id}/`
    );

    const fetched = await getRes.json();

    expect(getRes.status()).toBe(200);
    expect(fetched.name).toBe(updatedTitle);

    console.log("Issue API create, update and verification successful");
  });
});
