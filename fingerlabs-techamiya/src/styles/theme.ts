import { css, DefaultTheme } from "styled-components";

const colors = {
  bg: "#180D36",
  purple1: "#7F7991",
  purple2: "#2A2045",
  pink: "#C676FF",
};

const fonts = {
  title: css`
    font-family: "Dongle", sans-serif;
  `,
};

const theme: DefaultTheme = {
  colors,
  fonts,
};
export default theme;
