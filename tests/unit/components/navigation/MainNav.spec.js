import { RouterLinkStub, shallowMount } from "@vue/test-utils";

import MainNav from "@/components/navigation/MainNav";

describe("MainNav", () => {
  const createConfig = ($store) => ({
    global: {
      stubs: {
        "router-link": RouterLinkStub,
      },
      mocks: {
        $store,
      },
    },
  });

  it("displays company name", () => {
    const $store = { state: { isLoggedIn: false } };
    const wrapper = shallowMount(MainNav, createConfig($store));
    expect(wrapper.text()).toMatch("Bobo Careers");
  });

  it("displays menu items for navigation", () => {
    const $store = { state: { isLoggedIn: false } };
    const wrapper = shallowMount(MainNav, createConfig($store));
    const navigationMenuItems = wrapper.findAll(
      "[data-test='main-nav-list-item']"
    );
    const navigationMenuTexts = navigationMenuItems.map((item) => item.text());
    expect(navigationMenuTexts).toEqual([
      "Teams",
      "Locations",
      "Life at Bobo",
      "How we hire",
      "Students",
      "Jobs",
    ]);
  });

  describe("when user is logged out", () => {
    it("prompts user to sign in", () => {
      const $store = { state: { isLoggedIn: false } };
      const wrapper = shallowMount(MainNav, createConfig($store));
      const loginButton = wrapper.find("[data-test='login-button']");
      expect(loginButton.exists()).toBeTruthy();
    });

    it("issues call to Vuex to log in user", async () => {
      const $store = { state: { isLoggedIn: false } };
      const commit = jest.fn();
      $store.commit = commit;
      const wrapper = shallowMount(MainNav, createConfig($store));
      const loginButton = wrapper.find("[data-test='login-button']");
      await loginButton.trigger("click");
      expect(commit).toHaveBeenCalledWith("LOGIN_USER", expect.anything());
    });
  });

  describe("when user logs in", () => {
    it("displays user profile image", async () => {
      const $store = { state: { isLoggedIn: true } };
      const wrapper = shallowMount(MainNav, createConfig($store));
      const profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBeTruthy();
    });

    it("displays sub-navigation menu with addition information", async () => {
      const $store = { state: { isLoggedIn: true } };
      const wrapper = shallowMount(MainNav, createConfig($store));
      const subnav = wrapper.find("[data-test='sub-nav']");
      expect(subnav.exists()).toBeTruthy();
    });
  });
});
