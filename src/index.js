import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { IntlProvider, addLocaleData } from "react-intl";
import fi from "react-intl/locale-data/fi";

addLocaleData([...fi]);

ReactDOM.render(
  <IntlProvider locale="fi">
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </IntlProvider>,
  document.getElementById("root")
);
registerServiceWorker();
