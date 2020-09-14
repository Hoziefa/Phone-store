import React, { useContext } from "react";
import productContext from "../contexts/productContext";
import { alertMessage } from "../utils";

const addToCart = (carts, setCarts, product, products, setProducts, setProductData) => {
    if (carts.some(({ id }) => id === product.id)) return alertMessage(`"${product.title}" Already in Cart`);

    setProducts(products.map(prod => (prod.id === product.id ? { ...prod, inCart: true } : prod)));

    setCarts([...carts, { ...product, inCart: true, count: 1, total: product.price }]);

    setProductData({ ...product, active: true });
};

const AddToCart = ({ product, content: [contentInCart, contentNotInCart] }) => {
    const { products: [products, setProducts] = [], carts: [carts, setCarts] = [] } = useContext(productContext);
    const { productData: [, setProductData] = [] } = useContext(productContext);

    return (
        <button
            className={`add-btn ${product.inCart ? "in-cart" : ""}`}
            onClick={() => addToCart(carts, setCarts, product, products, setProducts, setProductData)}>
            <span>{product.inCart ? contentInCart : contentNotInCart}</span>
        </button>
    );
};

export default AddToCart;
