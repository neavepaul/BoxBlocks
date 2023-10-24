import React from "react";
import { useNavigate } from "react-router-dom";
import { useAddress, useMetamask } from "@thirdweb-dev/react";

// import { useStateContext } from "../context";
import CustomButton from "./CustomButton";

const Navbar = () => {
    const connect = useMetamask();
    const address = useAddress();

    if (address) {
        return null; // If there's an address, do not render the button
    }

    return (
        <div>
            <div>
                <button
                    onClick={connect}
                    style={{
                        height: "50px",
                        width: "180px",
                        borderRadius: "8px", // Rounded corners
                        fontFamily: "Clash Grotesk", // Change to your font-family
                        background:
                            "linear-gradient(90deg, #FF3BFF 0%, #D94FD5 16.32%, #5C24FF 99.13%)", // Gradient background
                        color: "#FFFFFF", // Text color
                        padding: "10px 20px", // Padding for the button
                        border: "none", // Remove border
                        cursor: "pointer",
                        fontSize: "18px",
                        fontWeight: "500", // Add a pointer cursor
                    }}
                >
                    Connect Wallet
                </button>
            </div>
        </div>
    );
};

export default Navbar;
