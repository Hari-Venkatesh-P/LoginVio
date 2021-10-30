import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginScreen from "../../pages/login/index";
import DashboardScreen from "../../pages/dashboard/index";
import ProtectedRoute from "./protectedroute"

function Navigation() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginScreen} />
        <ProtectedRoute exact path="/dashboard" component={DashboardScreen} />
      </Switch>
    </BrowserRouter>
  );
}

export default Navigation;
