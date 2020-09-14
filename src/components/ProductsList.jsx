import React, { useContext, useState } from "react";
import Product from "./Product";
import productContext from "../contexts/productContext";

const ProductsList = () => {
    const [products] = useContext(productContext).products;

    useState();

    return (
        <div className="Products-list container">
            <h2>Our Products</h2>

            <ul className="products-container">
                {products.map(product => (
                    <Product key={product.id} product={product} />
                ))}
            </ul>
        </div>
    );
};

export default ProductsList;
