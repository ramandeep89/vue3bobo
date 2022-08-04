import { mount } from "@vue/test-utils";

import ActionButton from "@/components/shared/ActionButton";

describe("ActionButton", () => {
  it("displays text", () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: "clickme",
        type: "primary",
      },
    });
    expect(wrapper.text()).toMatch("clickme");
  });

  it("applies on of the styles", () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: "",
        type: "primary",
      },
    });
    const button = wrapper.find("button");
    expect(button.classes("primary")).toBe(true);
  });
});
