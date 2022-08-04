import { shallowMount, flushPromises, RouterLinkStub } from "@vue/test-utils";
import { useFilteredJobs, useFetchJobsDispatch } from "@/store/composables";
jest.mock("@/store/composables");

import useCurrentPage from "@/composables/useCurrentPage";
jest.mock("@/composables/useCurrentPage");

import usePreviousAndNextPages from "@/composables/usePreviousAndNextPages";
jest.mock("@/composables/usePreviousAndNextPages");

import JobListings from "@/components/jobResults/JobListings.vue";
import { ref } from "vue";

describe("JobListings", () => {
  beforeEach(() => {});
  afterEach(() => {});

  const createConfig = () => ({
    global: {
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  describe("what happens when the component mounts", () => {
    it("makes call to fetch jobs from the API", () => {
      useFilteredJobs.mockReturnValue({ value: [] });
      useCurrentPage.mockReturnValue({ value: 2 });
      usePreviousAndNextPages.mockReturnValue({
        previousPage: { value: 1 },
        nextPage: { value: 3 },
      });
      shallowMount(JobListings, createConfig());
      expect(useFetchJobsDispatch).toHaveBeenCalledTimes(1);
    });
  });

  it("creates a job listing for a max of 10 jobs", async () => {
    useFilteredJobs.mockReturnValue({ value: Array(15).fill({}) });
    useCurrentPage.mockReturnValue({ value: 1 });
    usePreviousAndNextPages.mockReturnValue({
      previousPage: { value: undefined },
      nextPage: { value: 2 },
    });
    const wrapper = shallowMount(JobListings, createConfig());
    await flushPromises();
    const jobListings = wrapper.findAll("[data-test='job-listing']");
    expect(jobListings).toHaveLength(10);
  });

  it("creates a job listing for a max of 5 jobs on last page with 15 jobs", async () => {
    useFilteredJobs.mockReturnValue({ value: Array(15).fill({}) });
    useCurrentPage.mockReturnValue({ value: 2 });
    usePreviousAndNextPages.mockReturnValue({
      previousPage: { value: 1 },
      nextPage: { value: 3 },
    });
    const wrapper = shallowMount(JobListings, createConfig());
    await flushPromises();
    const jobListings = wrapper.findAll("[data-test='job-listing']");
    expect(jobListings).toHaveLength(5);
  });

  it("displays current page number", () => {
    useFilteredJobs.mockReturnValue({ value: Array(95).fill({}) });
    useCurrentPage.mockReturnValue(ref(2));
    usePreviousAndNextPages.mockReturnValue({
      previousPage: { value: 1 },
      nextPage: { value: 3 },
    });
    const wrapper = shallowMount(JobListings, createConfig());
    expect(wrapper.text()).toMatch("Page: 2");
  });

  it("displays max page number", () => {
    useFilteredJobs.mockReturnValue({ value: Array(95).fill({}) });
    useCurrentPage.mockReturnValue({ value: 2 });
    usePreviousAndNextPages.mockReturnValue({
      previousPage: { value: 1 },
      nextPage: { value: 3 },
    });
    const wrapper = shallowMount(JobListings, createConfig());
    expect(wrapper.text()).toMatch("of 10");
  });

  describe("when user is on the first page", () => {
    it("does not show previous page", async () => {
      useFilteredJobs.mockReturnValue({ value: Array(15).fill({}) });
      useCurrentPage.mockReturnValue(ref(1));
      usePreviousAndNextPages.mockReturnValue({
        previousPage: ref(undefined),
        nextPage: ref(2),
      });
      const wrapper = shallowMount(JobListings, createConfig());
      await flushPromises();
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBeFalsy();
    });

    it("shows next page", async () => {
      useFilteredJobs.mockReturnValue({ value: Array(15).fill({}) });
      useCurrentPage.mockReturnValue(ref(1));
      usePreviousAndNextPages.mockReturnValue({
        previousPage: ref(undefined),
        nextPage: ref(2),
      });
      const wrapper = shallowMount(JobListings, createConfig());
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBeTruthy();
    });
  });

  describe("when user in on the last page", () => {
    it("shows previous page", async () => {
      useFilteredJobs.mockReturnValue({ value: Array(15).fill({}) });
      useCurrentPage.mockReturnValue(ref(2));
      usePreviousAndNextPages.mockReturnValue({
        previousPage: ref(1),
        nextPage: ref(undefined),
      });
      const wrapper = shallowMount(JobListings, createConfig());
      await flushPromises();
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBeTruthy();
    });

    it("does not show next page", async () => {
      useFilteredJobs.mockReturnValue({ value: Array(15).fill({}) });
      useCurrentPage.mockReturnValue(ref(2));
      usePreviousAndNextPages.mockReturnValue({
        previousPage: ref(1),
        nextPage: ref(undefined),
      });
      const wrapper = shallowMount(JobListings, createConfig());
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBeFalsy();
    });
  });
});
