import React, { useState } from "react";
// import { useStateContext } from "../context";
import { useNavigate } from "react-router-dom";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { Link } from "react-router-dom";
import BookListTable from "./BookListTable";

function ReturnBookForm() {
    const [bookId, setBookId] = useState("");
    // const { returnBook, returnBookLoading } = useStateContext();
    const navigate = useNavigate();

    const { contract } = useContract(
        "0x823E2acE55Ccca906A835f0E0Fe89a3a14Ce1E0b"
    );
    const { mutateAsync: returnBook } = useContractWrite(
        contract,
        "returnBook"
    );

    const call = async (_id) => {
        try {
            const data = await returnBook({ args: [_id] });
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    };

    const handleReturnBook = async () => {
        if (bookId !== "") {
            try {
                await call(bookId);
                navigate("/");
                console.log("Book returned successfully!");
            } catch (error) {
                console.error("Error returning book:", error);
            }
        } else {
            alert("Please enter a book ID.");
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
            </div>
            <div className="center">
                <h1 className="main-title">Return a Book to the Chain</h1>
            </div>
            <BookListTable />
            <div className="center">
                <div className="return-book-form">
                    <input
                        type="text"
                        placeholder="Enter Book ID"
                        value={bookId}
                        onChange={(e) => setBookId(e.target.value)}
                        style={{
                            padding: "10px",
                            borderRadius: "5px", // Rounded corners
                            border: "1px solid #ccc", // Add a border for a clean finish
                        }}
                    />
                    <button
                        onClick={handleReturnBook}
                        style={{
                            padding: "10px 20px",
                            borderRadius: "5px", // Rounded corners
                            border: "none", // Remove default button border
                            backgroundColor: "#007bff", // Blue background color
                            color: "white", // White text color
                        }}
                    >
                        Return Book
                    </button>
                </div>
            </div>
        </>
    );
}

export default ReturnBookForm;
