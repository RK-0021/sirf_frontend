import { createTheme } from "@mui/material/styles";
const green = "#2F664D";

const white = "#FFFFFF";

const charterfont = "Roboto";

// const helveticafont = "Helvetica";

const theme = createTheme({
  palette: {
    primary: {
      main: `${white}`,
    },
    // secondary: {
    //   main: green[500],
    // },
    black:
    {
      main: '#000',
    },
    green:{
        main: '#E2F2E0',
    },
    success:
    {
      main: '#185d2e',
    },
    secondary:
    {
      main: '#202020;',
    },
  },
  typography: {

    charterfont: `${charterfont}`,
    login: {
      fontFamily: `${charterfont}`,
      color: "#1b1b1b",
      fontSize: "35px",
    },
    fontFamily: '"Helvetica"',

    signin: {
      fontFamily: `${charterfont}`,
      color: `${white}`,
      fontSize: "20px",
      backgroundColor: `${arcOrange}`,
    },
  },
});

export default theme;
