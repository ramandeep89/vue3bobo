import { mount } from "@vue/test-utils";

import AccordionComponent from "@/components/shared/Accordion";

describe("Accordion", () => {
  const createConfig = (config = {}) => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
    props: { header: "Test Header" },
    slots: {
      default: "<h3>Nested Child</h3>",
    },
    ...config,
  });

  it("renders child", async () => {
    const slots = { default: "<h3>Nested Child</h3>" };
    const config = { slots };
    const wrapper = mount(AccordionComponent, createConfig(config));
    expect(wrapper.text()).not.toMatch("Nested Child");
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    expect(wrapper.text()).toMatch("Nested Child");
  });

  describe("when there is no custom child content", () => {
    it("renders default content", async () => {
      const slots = {};
      const config = { slots };
      const wrapper = mount(AccordionComponent, createConfig(config));
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");
      expect(wrapper.text()).toMatch("Missing slot content");
    });
  });
});
