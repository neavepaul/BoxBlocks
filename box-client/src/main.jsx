import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";

import App from "./App";
import "./styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <ThirdwebProvider
        clientId={"20aa394f50a7237379d6e76ed8e041cb"}
        activeChain={Sepolia}
    >
        <Router>
            <App />
        </Router>
    </ThirdwebProvider>
);
