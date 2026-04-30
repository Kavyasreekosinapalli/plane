# QA Testing Strategy – Plane (Workspace, Project & Issue Flow)

## 1. Scope Selection

I chose to focus on the **core workflow: Workspace → Project → Issue lifecycle**.

### Why this area?

- This represents the **primary user journey** in Plane
- It involves both **frontend interactions and backend APIs**
- Covers multiple layers:
  - Authentication/session reuse
  - Data creation (workspace, project, issue)
  - Data updates (issue edit, status change)
  - Data validation (list visibility)

This flow is **high-risk and business-critical**, as any failure directly impacts user productivity.

---

## 2. Testing Pyramid Approach

I followed a **balanced testing pyramid**:

- **Integration Tests (Majority)**
  Validate backend APIs and data consistency

- **End-to-End Tests (Selective)**
  Validate real user workflows through UI

### Rationale:

- Faster feedback from integration tests
- E2E used only for critical user journeys

---

## 3. Integration vs E2E Responsibilities

### Integration Tests (API Layer)

Covered using Playwright `request`:

- Project creation via API
- Issue creation via API
- Issue update via API
- Data verification using GET endpoints

**Purpose:**

- Validate API contracts
- Ensure backend logic works correctly
- Verify persistence of data

---

### E2E Tests (UI Layer)

#### 1. Workspace + Project Flow

- Create workspace
- Create project
- Validate project creation flow

#### 2. Issue Lifecycle Flow

- Create issue
- Edit title and description
- Assign user
- Change status (Backlog → Done)
- Verify updated issue in list

**Purpose:**

- Validate real user behavior
- Ensure UI + backend integration works
- Catch issues not visible at API level

---

## 4. Key Risks Covered

- Data creation failures (workspace/project/issue)
- UI not reflecting backend state
- Incorrect issue updates (title, description)
- Status transition failures
- Assignment flow issues
- Flaky UI behavior due to async operations

---

## 5. Coverage Target & Rationale

- **Integration Coverage Target:** ~70% for selected modules
- Focused on:
  - Project APIs
  - Issue APIs

### Why not 100%?

- Prioritized **critical paths over exhaustive coverage**
- Avoided low-value tests
- Focused on meaningful validation rather than numbers

---

## 6. What Was Not Tested (Due to Time Constraints)

- Authentication edge cases
- Permissions and role-based access
- Filtering and search functionality
- Comments/activity flows
- Performance and load testing
- Cross-browser testing

---

## 7. How to Run Tests Locally

### Install dependencies

```bash
pnpm install
```

### Run all tests

```bash
pnpm exec playwright test
```

### Run with browser (headed)

```bash
pnpm exec playwright test --headed
```

### Run with HTML report

```bash
pnpm exec playwright test --headed --reporter=html
pnpm exec playwright show-report
```

---

## 8. Assumptions & Setup Requirements

- User is already authenticated (using `storageState.json`)
- A Workspace already exists
- Valid `projectId` is available for API tests
- Stable internet connection for API calls
- Test data is dynamically generated to avoid conflicts

---

## 9. Design Decisions

- Avoided hard waits (`waitForTimeout`) → used **state-based waits**
- Used **dynamic data** (`Date.now()`) to prevent collisions
- Preferred **user-visible validations** in E2E tests
- Handled async UI behavior with proper synchronization

---

## 10. Summary

This testing approach ensures:

- Strong coverage of **critical workflows**
- Clear separation between **API and UI testing**
- Stable, maintainable, and realistic test scenarios

The focus was on **quality, clarity, and real-world reliability** rather than exhaustive coverage.
