import React from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import Navbar from "./Navbar";
import ill from "../assets/ill.png";
import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <>
            <head>
                <link
                    href="https://api.fontshare.com/v2/css?f[]=clash-grotesk@200,700,400,600,300,500&display=swap"
                    rel="stylesheet"
                ></link>
            </head>
            <div className="App">
                <div className="container">
                    <div className="main-header">
                        <nav>
                            <li className="logo">
                                <Link to="/">ChainReads</Link>
                            </li>
                            <ul className="nav-list">
                                <li className="nav-list-item">
                                    <Link to="/add">Add Book</Link>
                                </li>
                                <li className="nav-list-item">
                                    <Link to="/borrow">Borrow Book</Link>
                                </li>
                                <li className="nav-list-item">
                                    <Link to="/return">Return Book</Link>
                                </li>
                                <li className="nav-list-item">
                                    <Navbar />
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <h1 className="main-title">A Secure Blockchain</h1>
                    <h2 className="sub-title">
                        Sharing Stories, Building Blocks.
                    </h2>
                    <div className="img">
                        <img src={ill} className="ill" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default LandingPage;
