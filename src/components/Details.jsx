import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productContext from "../contexts/productContext";
import AddToCart from "./AddToCart";

const getProduct = (products, id) => ({ ...products.find(({ id: productID }) => productID === id) });

const Details = ({ match: { params: { id } = {} } }) => {
    const [products] = useContext(productContext).products;

    const product = getProduct(products, +id);

    const { title, img, price, company, info } = product;

    const [src, setSrc] = useState(img);

    useEffect(() => {
        const domImg = document.querySelector("img.img-product");

        window.location.href.includes("details") ? setSrc(domImg.src.replace("details/", "")) : setSrc(img);
    }, [img]);

    return (
        <div className="details--component product-details">
            <h3 className="title">{title}</h3>

            <div className="wrapper">
                <div className="img-container">
                    <img src={src} alt={title} className="img-product" />
                </div>

                <div className="details">
                    <h4 className="product-model">Model: {title}</h4>

                    <span className="company">Made By: {company}</span>

                    <span className="price">
                        Price: {price}
                        <i className="fas fa-dollar-sign"></i>
                    </span>

                    <span className="info-title">Some info about {title} product : </span>

                    <p className="info">{info}</p>

                    <div className="actions">
                        <Link to="/" className="home-link">
                            Back to products
                        </Link>

                        <AddToCart product={product} content={["In Cart", "Add To Cart"]} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
