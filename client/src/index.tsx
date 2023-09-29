import ReactDOM from "react-dom/client"
import App from "./App"
import { Provider } from "react-redux"
import { store } from "./store"
import "./styles/index.scss"
import "./assets/fonts/PoetsenOne-Regular.ttf"
import { BrowserRouter } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
