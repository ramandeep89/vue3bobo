import { mount } from "@vue/test-utils";
import { useRouter } from "vue-router";
jest.mock("vue-router");

import JobSearchForm from "@/components/jobSearch/JobSearchForm";

describe("JobSearchForm", () => {
  describe("when the user submits the form", () => {
    it("directs user to job results page with user's search parameters", async () => {
      const push = jest.fn();
      useRouter.mockReturnValue({ push });
      const wrapper = mount(JobSearchForm, {
        attachTo: document.body,
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });

      const roleInput = wrapper.find("[data-test='role-input']");
      roleInput.setValue("Vue Developer");
      const locationInput = wrapper.find("[data-test='location-input']");
      locationInput.setValue("Dallas");

      const submitButton = wrapper.find("[data-test='form-submit-button']");
      await submitButton.trigger("click");

      expect(push).toHaveBeenCalledWith({
        name: "JobResults",
        query: {
          role: "Vue Developer",
          location: "Dallas",
        },
      });
    });
  });
});
