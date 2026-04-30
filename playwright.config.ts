import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  testMatch: /.*\.(spec|test)\.(js|ts)/,

  use: {
    headless: true,
    baseURL: "https://app.plane.so",
    storageState: "storageState.json",
  },

  webServer: {
    command: "pnpm dev",
    port: 3000,
    reuseExistingServer: true,
  },
});
