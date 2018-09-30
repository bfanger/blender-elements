import React from "react";
import { storiesOf } from "@storybook/react";
import Page from "./components/Page";
import Welcome from "./components/Welcome";

storiesOf("Welcome", module).add("to Blender Elements", () => (
  <Page>
    <Welcome />
  </Page>
));
