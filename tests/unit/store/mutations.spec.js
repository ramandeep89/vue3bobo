import mutations from "@/store/mutations";

describe("mutations", () => {
  describe("LOGIN_USER", () => {
    it("logs the user in", () => {
      const state = { isLoggedIn: false };
      mutations.LOGIN_USER(state);
      expect(state.isLoggedIn).toBeTruthy();
    });
  });

  describe("RECEIVE_JOBS", () => {
    it("receives jobs from API response", () => {
      const state = { jobs: [] };
      mutations.RECEIVE_JOBS(state, ["Test Job 0", "Test Job 1"]);
      expect(state).toEqual({ jobs: ["Test Job 0", "Test Job 1"] });
    });
  });

  describe("ADD_SELECTED_ORGANIZATIONS", () => {
    it("updates organizations that the user has chosen to filter jobs by", () => {
      const state = { selectedOrganizations: [] };
      mutations.ADD_SELECTED_ORGANIZATIONS(state, ["TestOrg0", "TestOrg1"]);
      expect(state).toEqual({
        selectedOrganizations: ["TestOrg0", "TestOrg1"],
      });
    });
  });

  describe("ADD_SELECTED_JOB_TYPES", () => {
    it("updates job types that the user has chosen to filter jobs by", () => {
      const state = { selectedJobTypes: [] };
      mutations.ADD_SELECTED_JOB_TYPES(state, ["TestJobType1", "TestJobType1"]);
      expect(state).toEqual({
        selectedJobTypes: ["TestJobType1", "TestJobType1"],
      });
    });
  });
});
