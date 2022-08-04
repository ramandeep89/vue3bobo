import state from "@/store/state";

describe("state", () => {
  it("keeps track of whether user is logged in", () => {
    const startingState = state;
    expect(startingState.isLoggedIn).toBeFalsy();
  });

  it("stores job listings", () => {
    const startingState = state;
    expect(startingState.jobs).toEqual([]);
  });

  it("stores filtered jobs for selected organizations", () => {
    const startingState = state;
    expect(startingState.selectedOrganizations).toEqual([]);
  });

  it("stores filtered jobs for selected job types", () => {
    const startingState = state;
    expect(startingState.selectedJobTypes).toEqual([]);
  });
});
