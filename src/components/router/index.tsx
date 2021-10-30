import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginScreen from "../../pages/login/index";
import DashboardScreen from "../../pages/dashboard/index";
import ProtectedRoute from "./protectedroute"
import PageNotFound from "../pagenotfound";

function Navigation() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginScreen} />
        <ProtectedRoute exact path="/dashboard" component={DashboardScreen} />
        <Route  component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default Navigation;
