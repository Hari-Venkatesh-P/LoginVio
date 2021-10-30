import "./App.css";
import Navigation from "./components/router/";
import { Provider } from "react-redux";
import Store from "./store";

function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <Navigation />
      </Provider>
    </div>
  );
}

export default App;
