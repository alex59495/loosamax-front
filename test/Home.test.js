import React from "react";
import { mount } from "enzyme";
import Home from "../src/components/Home";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";

import { storeFactory, findByTestAttr } from "./testUtils";

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>
  );
};

describe("user logged", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup({ user: { _id: "1234" } });
  });

  test("render Home avec button profile", () => {
    const buttonProfile = findByTestAttr(wrapper, "button-profile");
    expect(buttonProfile.length).toBe(1);
  });
});

describe("user unlogged", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({ user: false });
  });
  test("render Home avec button login", () => {
    const buttonProfile = findByTestAttr(wrapper, "button-login");
    expect(buttonProfile.length).toBe(1);
  });
});
