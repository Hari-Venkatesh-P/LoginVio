import "./App.css";
import Navigation from "./components/router/";
import { Provider } from "react-redux";
import ReactNotifications from 'react-notifications-component';
import Store from "./store";

function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <ReactNotifications  />
        <Navigation />
      </Provider>
    </div>
  );
}

export default App;
