import React from "react";
import { useSelector } from "react-redux";

import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, StyledEngineProvider } from "@material-ui/core";

// routing
import Routes from "./routes";

// defaultTheme
import theme from "./themes";

// project imports
import Locales from "./ui-component/Locales";
import NavigationScroll from "./layout/NavigationScroll";
// import RTLLayout from './ui-component/RTLLayout';
import Snackbar from "./ui-component/extended/Snackbar";

// context provider
import AppContextProvider from "./contexts";

//-----------------------|| APP ||-----------------------//

const App = () => {
  const customization = useSelector((state) => state.customization);
  console.log("in App.js")
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme(customization)}>
        <CssBaseline />
        {/* RTL layout */}
        {/* <RTLLayout> */}
        <Locales>
          <NavigationScroll>
            <AppContextProvider>
              <Routes />
              <Snackbar />
            </AppContextProvider>
          </NavigationScroll>
        </Locales>
        {/* </RTLLayout> */}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
