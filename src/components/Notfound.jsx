import React from "react";
import { Link } from "react-router-dom";
import notFoundImg from "../not-found.jpg";

const Notfound = () => (
    <div className="Notfound not-found">
        <img src={notFoundImg} alt="not-found" />
        <Link to="/">Home</Link>
    </div>
);

export default Notfound;
