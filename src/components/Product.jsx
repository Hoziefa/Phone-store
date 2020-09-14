import React from "react";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";

const Product = ({ product }) => {
    const { id, title, img, price } = product;

    return (
        <li className="Product">
            <AddToCart product={product} content={["In Cart", <i className="fas fa-cart-plus"></i>]} />

            <Link to={`/details/${id}`}>
                <img src={img} alt={title} />

                <div className="details">
                    <span className="title">{title}</span>
                    <span className="price">
                        {price}
                        <i className="fas fa-dollar-sign"></i>
                    </span>
                </div>
            </Link>
        </li>
    );
};

export default Product;
