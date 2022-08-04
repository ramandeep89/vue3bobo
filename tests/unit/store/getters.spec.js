import getters from "@/store/getters";

describe("getters", () => {
  describe("UNIQUE_ORGANIZATIONS", () => {
    it("finds unique organizations from list of jobs", () => {
      const state = {
        jobs: [
          { organization: "TestOrg1" },
          { organization: "TestOrg2" },
          { organization: "TestOrg2" },
        ],
      };
      const result = getters.UNIQUE_ORGANIZATIONS(state);
      expect(result).toEqual(new Set(["TestOrg1", "TestOrg2"]));
    });
  });

  describe("UNIQUE_JOB_TYPES", () => {
    it("finds unique job types from list of jobs", () => {
      const state = {
        jobs: [
          { jobType: "TestJobType1" },
          { jobType: "TestJobType2" },
          { jobType: "TestJobType2" },
        ],
      };
      const result = getters.UNIQUE_JOB_TYPES(state);
      expect(result).toEqual(new Set(["TestJobType1", "TestJobType2"]));
    });
  });

  describe("INCLUDE_JOB_BY_ORGANIZATION", () => {
    describe("when user has not selected any organizations", () => {
      it("displays job", () => {
        const state = {
          selectedOrganizations: [],
        };
        const job = { organization: "TestOrg" };
        const includeJob = getters.INCLUDE_JOB_BY_ORGANIZATION(state)(job);
        expect(includeJob).toBeTruthy();
      });
      it("identifies if job is associated with given organizations", () => {
        const state = {
          selectedOrganizations: ["TestOrg1", "TestOrg2"],
        };
        const job = { organization: "TestOrg1" };
        const includeJob = getters.INCLUDE_JOB_BY_ORGANIZATION(state)(job);
        expect(includeJob).toBeTruthy();
      });
    });
  });

  describe("INCLUDE_JOB_BY_JOB_TYPE", () => {
    describe("when user has not selected any job types", () => {
      it("displays job", () => {
        const state = {
          selectedJobTypes: [],
        };
        const job = { jobType: "TestJobType" };
        const includeJob = getters.INCLUDE_JOB_BY_JOB_TYPE(state)(job);
        expect(includeJob).toBeTruthy();
      });
      it("identifies if job is associated with given job types", () => {
        const state = {
          selectedJobTypes: ["TestJobType1", "TestJobType2"],
        };
        const job = { jobType: "TestJobType1" };
        const includeJob = getters.INCLUDE_JOB_BY_JOB_TYPE(state)(job);
        expect(includeJob).toBeTruthy();
      });
    });
  });

  describe("FILTERED_JOBS", () => {
    it("filters jobs by organization and job type", () => {
      const INCLUDE_JOB_BY_JOB_TYPE = jest.fn().mockReturnValue(true);
      const INCLUDE_JOB_BY_ORGANIZATION = jest.fn().mockReturnValue(true);
      const mockGetters = {
        INCLUDE_JOB_BY_JOB_TYPE,
        INCLUDE_JOB_BY_ORGANIZATION,
      };
      const job = { id: 1, title: "SomeJobTitle" };
      const state = { jobs: [job] };

      const result = getters.FILTERED_JOBS(state, mockGetters);
      expect(result).toEqual([job]);
      expect(INCLUDE_JOB_BY_JOB_TYPE).toHaveBeenCalledWith(job);
      expect(INCLUDE_JOB_BY_ORGANIZATION).toHaveBeenCalledWith(job);
    });
  });
});
