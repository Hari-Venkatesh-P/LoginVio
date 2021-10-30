import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginScreen from "../../pages/login/index";

function Navigation() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginScreen} />
      </Switch>
    </BrowserRouter>
  );
}

export default Navigation;
