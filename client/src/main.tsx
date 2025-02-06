import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18.ts";
import { ThemeProvider } from "@mui/material";
import theme from "./Theme.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          <ToastContainer />
        </Provider>
      </ThemeProvider>
    </I18nextProvider>
  </StrictMode>
);
