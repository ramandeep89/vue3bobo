import { mount } from "@vue/test-utils";

import HeaderContainer from "@/components/shared/HeaderContainer";

describe("HeaderContainer", () => {
  // const createConfig = () => ({
  //   slots: {
  //     title: "<h2>Test Title</h2>",
  //     subtitle: "<h3>Test Subtitle</h3>",
  //   },
  // });

  it("allows parent component to provide title", () => {
    const wrapper = mount(HeaderContainer, {
      slots: {
        title: "<h2>Test Title</h2>",
      },
    });
    expect(wrapper.text()).toMatch("Test Title");
  });

  it("allows parent component to provide subtitle", () => {
    const wrapper = mount(HeaderContainer, {
      slots: {
        subtitle: "<h3>Test Subtitle</h3>",
      },
    });
    expect(wrapper.text()).toMatch("Test Subtitle");
  });
});
