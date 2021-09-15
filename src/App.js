import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import routes from "./routes";
import { useSelector } from "react-redux";
import { IntlProvider } from "react-intl";
import ar from "./translations/ar.json";
import en from "./translations/en.json";
import { ToastContainer } from "react-toastify";
import "./scss/style.scss";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const TheLayout = React.lazy(() => import("./containers/TheLayout"));
const Login = React.lazy(() => import("./views/pages/login"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));

const ProtectedRoute = ({ token, ...props }) => {
  if (!token) return <Redirect to="/login" />;
  return <Route {...props} />;
};

const loading = (
  <div
    className="text-center d-flex justify-content-center align-items-center bg-primary position-fixed"
    style={{ zIndex: 9999, left: 0, top: 0, right: 0, bottom: 0 }}
  >
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

function App() {
  const { locale, user } = useSelector((state) => state);

  useEffect(() => {
    const html = document.getElementsByTagName("html")[0];
    html.lang = locale;
    html.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const token = localStorage.getItem("token") || user?.token;
  const Layout = token ? TheLayout : Fragment;

  return (
    <BrowserRouter basename="/">
      <IntlProvider
        messages={locale === "ar" ? ar : en}
        locale={locale}
        defaultLocale="ar"
        textComponent={React.Fragment}
      >
        <React.Suspense fallback={loading}>
          <Layout>
            <ToastContainer hideProgressBar position="top-right" />
            <Switch>
              <Route
                exact
                path="/login"
                name="Login Page"
                render={(props) =>
                  token ? <Redirect to="/dashboard" /> : <Login {...props} />
                }
              />
              <Route
                exact
                path="/"
                name="Home"
                render={() =>
                  token ? (
                    <Redirect to="/dashboard" />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
              {routes.map(({ component: Component, ...route }, idx) => {
                return (
                  Component && (
                    <ProtectedRoute
                      token={token}
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(props) => <Component {...props} />}
                    />
                  )
                );
              })}

              <Route path="*" name="Not Found" component={Page404} />
            </Switch>
          </Layout>
        </React.Suspense>
      </IntlProvider>
    </BrowserRouter>
  );
}

export default App;
