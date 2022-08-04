import { mount } from "@vue/test-utils";

import { useStore } from "vuex";
jest.mock("vuex");

import { useRouter } from "vue-router";
jest.mock("vue-router");

import JobFiltersSidebarCheckboxGroup from "@/components/jobResults/jobFiltersSidebar/JobFiltersSidebarCheckboxGroup";

const createConfig = (props = {}) => ({
  global: {
    stubs: {
      FontAwesomeIcon: true,
    },
  },
  props: {
    header: "Some Header",
    name: "someName",
    uniqueValues: new Set(["Value1", "Value2"]),
    mutation: "someMutation",
    ...props,
  },
});

describe("JobFiltersSidebarJobTypes", () => {
  it("renders unique list of job types for filtering jobs", async () => {
    const props = { uniqueValues: new Set(["Value1", "Value2"]) };
    const wrapper = mount(JobFiltersSidebarCheckboxGroup, createConfig(props));
    await wrapper.find("[data-test='clickable-area']").trigger("click");
    const inputLabels = wrapper.findAll("[data-test='value-label']");
    const values = inputLabels.map((node) => node.text());
    expect(values).toEqual(["Value1", "Value2"]);
  });

  describe("when user clicks a checkbox", () => {
    it("communicates that user has selected checkbox for job type", async () => {
      const commit = jest.fn();
      useStore.mockReturnValue({ commit });
      useRouter.mockReturnValue({ push: jest.fn() });
      const props = {
        mutation: "SomeNewMutation",
        uniqueValues: new Set(["SomeTestValue"]),
      };
      const wrapper = mount(
        JobFiltersSidebarCheckboxGroup,
        createConfig(props)
      );
      await wrapper.find("[data-test='clickable-area']").trigger("click");
      const testValue1Input = wrapper.find("[data-test='SomeTestValue']");
      testValue1Input.setChecked();

      expect(commit).toHaveBeenCalledWith("SomeNewMutation", ["SomeTestValue"]);
    });

    it("navigates back to page 1 of the job listings", async () => {
      useStore.mockReturnValue({ commit: jest.fn() });
      const push = jest.fn();
      useRouter.mockReturnValue({ push });
      const props = {
        uniqueValues: new Set(["SomeTestValue"]),
      };
      const wrapper = mount(
        JobFiltersSidebarCheckboxGroup,
        createConfig(props)
      );
      await wrapper.find("[data-test='clickable-area']").trigger("click");
      const testOrg1Input = wrapper.find("[data-test='SomeTestValue']");
      testOrg1Input.setChecked();

      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
