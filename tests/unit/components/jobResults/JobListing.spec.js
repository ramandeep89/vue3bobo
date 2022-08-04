import { mount, RouterLinkStub } from "@vue/test-utils";

import JobListing from "@/components/jobResults/JobListing.vue";

const createJobsProps = (jobProps = {}) => ({
  title: "Test Title",
  organization: "Test Org",
  locations: ["Some city"],
  minimumQualifications: ["Some Qual"],
  ...jobProps,
});

const createConfig = (jobProps) => ({
  props: {
    job: { ...jobProps },
  },
  global: {
    stubs: {
      "router-link": RouterLinkStub,
    },
  },
});

describe("JobListing", () => {
  it("renders job title", () => {
    const jobProps = createJobsProps({ title: "Some Test Title" });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Some Test Title");
  });

  it("renders job organization", () => {
    const jobProps = createJobsProps({ organization: "Some Test Org" });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Some Test Org");
  });

  it("renders job locations", () => {
    const jobProps = createJobsProps({
      locations: ["Some city", "Some other city"],
    });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Some city");
    expect(wrapper.text()).toMatch("Some other city");
  });

  it("renders job qualifications", () => {
    const jobProps = createJobsProps({
      minimumQualifications: ["Some Qual 1, Some Qual 2"],
    });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Some Qual 1");
    expect(wrapper.text()).toMatch("Some Qual 2");
  });

  it("links to right job page", () => {
    const jobProps = createJobsProps({ id: 222 });
    const wrapper = mount(JobListing, createConfig(jobProps));
    const JobPageLink = wrapper.findComponent(RouterLinkStub);
    const toProp = JobPageLink.props("to");
    expect(toProp).toMatch("222");
  });
});
