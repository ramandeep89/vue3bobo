import { flushPromises, mount } from "@vue/test-utils";
import axios from "axios";
jest.mock("axios");

import SpotlightComponent from "@/components/jobSearch/SpotlightComponent";

describe("Spotlight", () => {
  const mockSpotlightResponse = (data = {}) => {
    axios.get.mockResolvedValue({
      data: [
        {
          img: "SomeImageLink",
          title: "Some Title",
          description: "Some Description",
          ...data,
        },
      ],
    });
  };

  it("provides img attribute to parent component", async () => {
    mockSpotlightResponse({ img: "SomeImageLink" });
    const wrapper = mount(SpotlightComponent, {
      slots: {
        default: `<template #default="slotProps">
          <h1>{{ slotProps.img }}</h1>
        </template>`,
      },
    });
    await flushPromises();
    expect(wrapper.text()).toMatch("SomeImageLink");
  });

  it("provides title attribute to parent component", async () => {
    mockSpotlightResponse({ title: "Some Title" });
    const wrapper = mount(SpotlightComponent, {
      slots: {
        default: `<template #default="slotProps">
          <h1>{{ slotProps.title }}</h1>
        </template>`,
      },
    });
    await flushPromises();
    expect(wrapper.text()).toMatch("Some Title");
  });

  it("provides description attribute to parent component", async () => {
    mockSpotlightResponse({ description: "Some Description" });
    const wrapper = mount(SpotlightComponent, {
      slots: {
        default: `<template #default="slotProps">
          <h1>{{ slotProps.description }}</h1>
        </template>`,
      },
    });
    await flushPromises();
    expect(wrapper.text()).toMatch("Some Description");
  });
});
