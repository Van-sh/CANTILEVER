import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

import App from "./App.jsx";
import "./index.css";

import store from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
   <Provider store={store}>
      <BrowserRouter>
         <App />
         <Toaster position="bottom-right" />
      </BrowserRouter>
   </Provider>,
);
