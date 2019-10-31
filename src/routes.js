import React, { Suspense, lazy } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import Loading from "./components/Loading";
import Register from "pages/register";

const NoMatch = () => (
  <div
    style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignContent: "center"
    }}
  >
    <h2> Nada aqui :( </h2>
  </div>
);

const Login = lazy(() => import("./pages/login/index.js"));
const Home = lazy(() => import("./pages/home/index.js"));

const Routes = () => (
  <Router history={history}>
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path={["/home"]} component={Home} />
        {/* <Route exact path="/articles/sei" component={() => <Articles event={1} />} /> */}
        <Route path={["/login", "", "/"]} component={Login} exact />
        <Route path="/register" component={() => <Register />} exact />
        <Route component={NoMatch} />
      </Switch>
    </Suspense>
  </Router>
);

export default Routes;
