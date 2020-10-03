import React, { useContext } from "react";
import Product from "./Product";
import productContext from "../contexts/productContext";

const ProductsList = () => {
    const [products] = useContext(productContext).products;

    return (
        <div className="Products-list container">
            <h2>Our Products</h2>

            <ul className="products-container">{products.map(Product)}</ul>
        </div>
    );
};

export default ProductsList;
