import { shallow } from "enzyme";

import React from "react";
import toJson from "enzyme-to-json";

import { SearchBox } from "./searchBox";

describe("Search Box", () => {
  it("Renders the children elements", () => {
    const component = shallow(
      <SearchBox>
        <p>Rendering Card Content</p>
      </SearchBox>
    );
    expect(toJson(component)).toMatchSnapshot();
  });
});
