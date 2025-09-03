import { defineConfig } from "cypress";

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://wildwestwild.github.io/react-burger",
    viewportWidth: 1440,
    viewportHeight: 900,
  },
});