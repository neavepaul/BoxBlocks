import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useStateContext } from "../context";
import Navbar from "./Navbar";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { Link } from "react-router-dom";
import BookListTable from "./BookListTable";

function AddBookForm() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    // const { addBookCall } = useStateContext();
    const { contract } = useContract(
        "0x823E2acE55Ccca906A835f0E0Fe89a3a14Ce1E0b"
    );
    const { mutateAsync: addBook, isLoading } = useContractWrite(
        contract,
        "addBook"
    );

    const call = async (title, author) => {
        try {
            console.log("Book being added:");
            console.log(title, author);
            const data = await addBook({ args: [title, author] });
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    };
    const handleAddBook = async (e) => {
        e.preventDefault();
        try {
            console.log("yes");
            await call(title, author);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <head>
                <link
                    href="https://api.fontshare.com/v2/css?f[]=clash-grotesk@200,700,400,600,300,500&display=swap"
                    rel="stylesheet"
                ></link>
            </head>
            <div>
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
                        </ul>
                    </nav>
                </div>
                <div className="center">
                    <h1 className="main-title">Add a Book to the Chain</h1>
                    {/* <Navbar /> */}
                </div>
                <BookListTable />
                <div className="center">
                    <div className="add-book-form">
                        <h2
                            style={{
                                color: "white",
                                fontFamily: "Clash Grotesk",
                                textAlign: "center",
                            }}
                        >
                            Add a New Book
                        </h2>
                        <form onSubmit={handleAddBook} className="custom-form">
                            <div style={{ display: "flex" }}>
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="form-input"
                                />
                                <input
                                    type="text"
                                    placeholder="Author"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    className="form-input"
                                />
                            </div>
                            <button
                                type="submit"
                                className="submit-button"
                                style={{ marginBottom: "20px" }}
                            >
                                Add Book
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddBookForm;
