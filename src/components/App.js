import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../assets/css/style.css";
import routes from "../utils/routes/index";
import Header from "./Header";
import firebase from "../config/firebase";
import AppContext from "../store/AppContext";
import AuthRoute from "../utils/routes/AuthRoute";
import GuestRoute from "../utils/routes/GuestRoute";
import Loading from "./Loading";
import NotFound from "../pages/404";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUser(user);
        setIsLoading(false);
        setIsLoggedIn(true);
      } else {
        setUser({});
        setIsLoading(false);
        setIsLoggedIn(false);
      }
    });
  }, []);

  if (isLoading) return <Loading />;

  // Or put HOME at the end
  return (
    <Router>
      <AppContext.Provider value={[isLoggedIn, user]}>
        <Header />
        <Switch>
          {routes.map((route, index) => {
            if (route.protected === "auth") {
              return (
                <AuthRoute
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              );
            }

            if (route.protected === "guest") {
              return (
                <GuestRoute
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              );
            }

            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            );
          })}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </AppContext.Provider>
    </Router>
  );
}

export default App;
