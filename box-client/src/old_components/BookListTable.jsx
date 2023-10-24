import React from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import Navbar from "./Navbar";
import ill from "../assets/ill.png";
import LandingPage from "./LandingPage";

function BookListTable() {
    const { contract } = useContract(
        "0x823E2acE55Ccca906A835f0E0Fe89a3a14Ce1E0b"
    );
    const { data: books } = useContractRead(contract, "getAllBooks", []);

    if (!books) {
        return <p>Loading...</p>;
    }

    const availableBooks = books.filter((book) => book.isAvailable);

    if (availableBooks.length === 0) {
        return (
            <div>
                <Navbar />
                <div className="book-list">
                    <h2>
                        Oops! Looks like there are no books available at the
                        moment.
                    </h2>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="">
                <div className="book-list">
                    <h2 className="sub-title">Available Books</h2>
                    <div className="center">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                </tr>
                            </thead>
                            <tbody>
                                {availableBooks.map((book) => (
                                    <tr key={book.id}>
                                        <td>{book.id.toNumber()}</td>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookListTable;
