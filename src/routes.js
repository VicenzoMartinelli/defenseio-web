import React, { Suspense, lazy } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import Loading from "./components/Loading";
import Register from "pages/register";
import NotFound from "pages/notfound";

const Login = lazy(() => import("./pages/login/index.js"));
const ProviderLayout = lazy(() => import("./layouts/UserProviderLayout"));

const Routes = () => (
  <Router history={history}>
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path={["/provider"]} component={ProviderLayout} />
        {/* <Route exact path="/articles/sei" component={() => <Articles event={1} />} /> */}
        <Route path={["/login", "", "/"]} component={Login} exact />
        <Route path="/register" component={() => <Register />} exact />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  </Router>
);

export default Routes;
