import React, { useContext } from "react";
import productContext from "../contexts/productContext";
import { alertMessage } from "../utils";

const handleDeleteProduct = (carts, setCarts, products, setProducts, cartId) => {
    setProducts(products.map(product => (product.id === cartId ? { ...product, inCart: false } : product)));
    setCarts(carts.filter(({ id }) => id !== cartId));
    alertMessage(`"${carts.find(({ id }) => id === cartId).title}" Deleted Successfully!`);
};

const cartQuantity = (type, cart) => ({
    ...cart,
    count: type === "inc" ? cart.count + 1 : cart.count - 1,
    get total() {
        return this.price * this.count;
    },
});

const handleQuantity = (type, cartId, carts, setCarts) => {
    setCarts(carts.map(cart => (cart.id === cartId ? cartQuantity(type, cart) : cart)));
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

const renderCart = ({ id, title, img, price, count, total }, carts, setCarts, products, setProducts) => {
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

                <ul>{carts.map(cart => renderCart(cart, carts, setCarts, products, setProducts))}</ul>
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

                <a
                    href="https://www.paypal.com/us/home"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="paypal-buy-now-button">
                    <svg
                        aria-label="PayPal"
                        xmlns="http://www.w3.org/2000/svg"
                        width="90"
                        height="33"
                        viewBox="34.417 0 90 33">
                        <path
                            fill="#253B80"
                            d="M46.211 6.749h-6.839a.95.95 0 0 0-.939.802l-2.766 17.537a.57.57 0 0 0 .564.658h3.265a.95.95 0 0 0 .939-.803l.746-4.73a.95.95 0 0 1 .938-.803h2.165c4.505 0 7.105-2.18 7.784-6.5.306-1.89.013-3.375-.872-4.415-.972-1.142-2.696-1.746-4.985-1.746zM47 13.154c-.374 2.454-2.249 2.454-4.062 2.454h-1.032l.724-4.583a.57.57 0 0 1 .563-.481h.473c1.235 0 2.4 0 3.002.704.359.42.469 1.044.332 1.906zM66.654 13.075h-3.275a.57.57 0 0 0-.563.481l-.146.916-.229-.332c-.709-1.029-2.29-1.373-3.868-1.373-3.619 0-6.71 2.741-7.312 6.586-.313 1.918.132 3.752 1.22 5.03.998 1.177 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .562.66h2.95a.95.95 0 0 0 .939-.804l1.77-11.208a.566.566 0 0 0-.56-.657zm-4.565 6.374c-.316 1.871-1.801 3.127-3.695 3.127-.951 0-1.711-.305-2.199-.883-.484-.574-.668-1.392-.514-2.301.295-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.499.589.697 1.411.554 2.317zM84.096 13.075h-3.291a.955.955 0 0 0-.787.417l-4.539 6.686-1.924-6.425a.953.953 0 0 0-.912-.678H69.41a.57.57 0 0 0-.541.754l3.625 10.638-3.408 4.811a.57.57 0 0 0 .465.9h3.287a.949.949 0 0 0 .781-.408l10.946-15.8a.57.57 0 0 0-.469-.895z"></path>
                        <path
                            fill="#179BD7"
                            d="M94.992 6.749h-6.84a.95.95 0 0 0-.938.802l-2.767 17.537a.57.57 0 0 0 .563.658h3.51a.665.665 0 0 0 .656-.563l.785-4.971a.95.95 0 0 1 .938-.803h2.164c4.506 0 7.105-2.18 7.785-6.5.307-1.89.012-3.375-.873-4.415-.971-1.141-2.694-1.745-4.983-1.745zm.789 6.405c-.373 2.454-2.248 2.454-4.063 2.454h-1.031l.726-4.583a.567.567 0 0 1 .562-.481h.474c1.233 0 2.399 0 3.002.704.358.42.467 1.044.33 1.906zM115.434 13.075h-3.272a.566.566 0 0 0-.562.481l-.146.916-.229-.332c-.709-1.029-2.289-1.373-3.867-1.373-3.619 0-6.709 2.741-7.312 6.586-.312 1.918.131 3.752 1.22 5.03 1 1.177 2.426 1.666 4.125 1.666 2.916 0 4.532-1.875 4.532-1.875l-.146.91a.57.57 0 0 0 .563.66h2.949a.95.95 0 0 0 .938-.804l1.771-11.208a.57.57 0 0 0-.564-.657zm-4.565 6.374c-.314 1.871-1.801 3.127-3.695 3.127-.949 0-1.711-.305-2.199-.883-.483-.574-.666-1.392-.514-2.301.297-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.501.589.699 1.411.554 2.317zM119.295 7.23l-2.807 17.858a.569.569 0 0 0 .562.658h2.822c.469 0 .866-.34.938-.803l2.769-17.536a.57.57 0 0 0-.562-.659h-3.16a.571.571 0 0 0-.562.482z"></path>
                    </svg>

                    <small>Checkout</small>
                </a>
                <small>The safer, easier way to pay</small>
            </div>
        </div>
    );
};

export default Cart;
