import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { Link } from "react-router-dom";
import productContext from "../contexts/productContext";

const hideDisplayModal = ({ currentTarget: modal, target }, product, setProduct) =>
    target.matches(`.${modal.classList[0]}, .close-btn`) && setProduct({ ...product, active: false });

const Modal = () => {
    const [product, setProduct] = useContext(productContext).productData;

    const { img, title, price, active } = product;

    const [src, setSrc] = useState(img);

    useEffect(() => {
        const domImg = document.querySelector("img.img-product");

        window.location.href.includes("details") ? setSrc(domImg.src.replace("details/", "")) : setSrc(img);
    }, [img]);

    return ReactDOM.createPortal(
        <div
            className={`modal-component modal-container ${active ? "show" : ""}`}
            onClick={e => hideDisplayModal(e, product, setProduct)}>
            <div className="modal-content">
                <button className="close-btn">
                    <i className="fas fa-times fa-lg"></i>
                </button>

                <span>Product added to cart</span>

                <div className="content">
                    <img src={src} alt={title} className="img-product" />

                    <h4 className="title">{title}</h4>

                    <span className="price">
                        Price : {price}
                        <i className="fas fa-dollar-sign"></i>
                    </span>
                </div>

                <div className="actions">
                    <Link to="/" className="home-link" onClick={() => setProduct({ ...product, active: false })}>
                        Continuo Shopping
                    </Link>

                    <Link to="/cart" className="cart-link" onClick={() => setProduct({ ...product, active: false })}>
                        Go to Cart
                    </Link>
                </div>
            </div>
        </div>,

        document.querySelector("#modal"),
    );
};

export default Modal;
