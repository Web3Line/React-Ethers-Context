import ReactDOM from "react-dom/client"

import Web3Provider from "./contexts/Web3Context"

import Web3 from "./components/Web3"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <Web3Provider>
        <h1>Hello World!</h1>
        <Web3 />
    </Web3Provider>
)