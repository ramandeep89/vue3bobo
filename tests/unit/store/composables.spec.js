import { useStore } from "vuex";
jest.mock("vuex");

import {
  useFetchJobsDispatch,
  useFilteredJobs,
  useUniqueJobTypes,
  useUniqueOrganizations,
} from "@/store/composables";

describe("composables", () => {
  describe("useFilteredJobs", () => {
    it("retrieves filtered jobs from store", () => {
      useStore.mockReturnValue({ getters: { FILTERED_JOBS: [{ id: 1 }] } });
      const result = useFilteredJobs();
      expect(result.value).toEqual([{ id: 1 }]);
    });
  });

  describe("useUniqueJobTypes", () => {
    it("retrieves unique job types from store", () => {
      useStore.mockReturnValue({
        getters: { UNIQUE_JOB_TYPES: new Set(["Full Time"]) },
      });
      const result = useUniqueJobTypes();
      expect(result.value).toEqual(new Set(["Full Time"]));
    });
  });

  describe("useUniqueOrganizations", () => {
    it("retrieves unique organizations from store", () => {
      useStore.mockReturnValue({
        getters: { UNIQUE_ORGANIZATIONS: new Set(["Apple"]) },
      });
      const result = useUniqueOrganizations();
      expect(result.value).toEqual(new Set(["Apple"]));
    });
  });

  describe("useFetchJobsDispatch", () => {
    it("sends call to fetch jobs from api", () => {
      const dispatch = jest.fn();
      useStore.mockReturnValue({
        dispatch,
      });
      useFetchJobsDispatch();
      expect(dispatch).toHaveBeenCalledWith("FETCH_JOBS");
    });
  });
});
