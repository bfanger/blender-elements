import { configure } from "@storybook/react";
import "bootstrap/dist/css/bootstrap.min.css";
import blenderElements from "../src";

window.blenderElements = blenderElements;

configure(() => {
  require("../stories/intro");
  require("../stories/buttonStories");
}, module);
