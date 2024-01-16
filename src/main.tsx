import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import * as Sentry from "@sentry/react";
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom";

import App from "./App";
import { ErrorPage } from "./pages/ErrorPage";

// 당장은 항상 다크모드로 사용
document.documentElement.classList.add("dark");

// const usingSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
// if (localStorage.theme === "dark" || (!localStorage.theme && usingSystemDark)) {
//   document.documentElement.classList.add("dark");
// } else {
//   document.documentElement.classList.remove("dark");
// }

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing({
      // See docs for support of different versions of variation of react router
      // https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      ),
    }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  tracesSampleRate: 1.0,
});

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error) => {
        Sentry.captureException(error);
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      Sentry.captureException(error);
    },
  }),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Sentry.ErrorBoundary fallback={<ErrorPage />}>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <App />
    </QueryClientProvider>
  </Sentry.ErrorBoundary>,
);
