import React, { useContext } from "react";
import { Link } from "react-router-dom";
import productContext from "../contexts/productContext";
import { alertMessage } from "../utils";

const handleDeleteProduct = (carts, setCarts, products, setProducts, cartId) => {
    setProducts(products.map(product => (product.id === cartId ? { ...product, inCart: false } : product)));
    setCarts(carts.filter(({ id }) => id !== cartId));
    alertMessage(`"${carts.find(({ id }) => id === cartId).title}" Deleted Successfully!`);
};

const getCart = (type, cart) => ({
    ...cart,
    count: type === "inc" ? cart.count + 1 : cart.count - 1,
    get total() {
        return this.price * this.count;
    },
});

const handleQuantity = (type, cartId, carts, setCarts) => {
    setCarts(carts.map(cart => (cart.id === cartId ? getCart(type, cart) : cart)));
};

const calcProductsTotals = carts => ({
    subtotal: carts.reduce((acc, { total }) => acc + total, 0),
    get tax() {
        return +(this.subtotal * 0.1).toFixed(2);
    },
    get total() {
        return (this.subtotal + this.tax).toFixed(2);
    },
});

const clearCart = (setCarts, products, setProducts, push) => {
    setCarts([]);
    setProducts(products.map(product => ({ ...product, inCart: false })));
    alertMessage(`Cart Cleared`);
    push("/");
};

const renderTbody = ({ id, title, img, price, count, total }, carts, setCarts, products, setProducts) => {
    return (
        <li key={id} className="">
            <div className="product-img">
                <img src={img} alt={title} />
            </div>

            <div className="product-title">
                <h6>{title}</h6>
            </div>

            <div className="product-price">
                {price}
                <i className="fas fa-dollar-sign"></i>
            </div>

            <div className="product-quantity">
                <button
                    className="decrease"
                    disabled={count <= 1}
                    onClick={() => handleQuantity("dec", id, carts, setCarts)}>
                    <i className="fas fa-minus"></i>
                </button>

                <span className="quantity">{count}</span>

                <button className="increase" onClick={() => handleQuantity("inc", id, carts, setCarts)}>
                    <i className="fas fa-plus"></i>
                </button>
            </div>

            <div className="product-delete">
                <button onClick={() => handleDeleteProduct(carts, setCarts, products, setProducts, id)}>
                    <i className="fas fa-trash fa-2x"></i>
                </button>
            </div>

            <div className="product-total">
                Product total: {total}
                <i className="fas fa-dollar-sign"></i>
            </div>
        </li>
    );
};

const Cart = ({ history: { push } }) => {
    const { carts: [carts, setCarts] = [], products: [products, setProducts] = [] } = useContext(productContext);

    const { subtotal, tax, total } = calcProductsTotals(carts);

    if (!carts.length) return <p className="carts-alert text-center">Your Cart is currently empty add Some Products!</p>;

    return (
        <div className="carts--component carts-container">
            <h2>Your Cart</h2>

            <div className="products-table">
                <div className="container-fluid text-center d-none d-md-block">
                    <div className="row">
                        <div className="col-10 mx-auto col-md-2 table-title">
                            <p className="text-uppercase">Products</p>
                        </div>

                        <div className="col-10 mx-auto col-md-2 table-title">
                            <p className="text-uppercase">Name of Product</p>
                        </div>

                        <div className="col-10 mx-auto col-md-2 table-title">
                            <p className="text-uppercase">Price</p>
                        </div>

                        <div className="col-10 mx-auto col-md-2 table-title">
                            <p className="text-uppercase">Quantity</p>
                        </div>

                        <div className="col-10 mx-auto col-md-2 table-title">
                            <p className="text-uppercase">Delete Product</p>
                        </div>

                        <div className="col-10 mx-auto col-md-2 table-title">
                            <p className="text-uppercase">Total</p>
                        </div>
                    </div>
                </div>

                <ul>{carts.map(cart => renderTbody(cart, carts, setCarts, products, setProducts))}</ul>
            </div>

            <div className="totals-container">
                <button className="clear-cart" onClick={() => clearCart(setCarts, products, setProducts, push)}>
                    Clear Cart
                </button>

                <span className="sub-total">
                    Subtotal: {subtotal}
                    <i className="fas fa-dollar-sign"></i>
                </span>
                <span className="tax">
                    Tax: {tax}
                    <i className="fas fa-dollar-sign"></i>
                </span>
                <span className="total">
                    Total: {total}
                    <i className="fas fa-dollar-sign"></i>
                </span>

                <Link to="https://paypal.com" className="payPal-btn">
                    payPal placeholder
                </Link>

                <small>The safer, easier way to pay</small>
            </div>
        </div>
    );
};

export default Cart;
