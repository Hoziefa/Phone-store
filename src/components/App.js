import React, { useState } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import productContext from "../contexts/productContext";

import { storeProducts, detailProduct } from "../data";

import Modal from "./Modal";
import Navbar from "./Navbar";
import ProductsList from "./ProductsList";
import Details from "./Details";
import Cart from "./Cart";
import Notfound from "./Notfound";

const App = () => {
    const products = useState(storeProducts);
    const productData = useState(detailProduct);
    const carts = useState([]);

    return (
        <productContext.Provider value={{ carts, products, productData }}>
            <BrowserRouter>
                <Navbar />
                <Modal />

                <Switch>
                    <Route path="/products" exact component={ProductsList} />

                    <Route path="/details/:id" exact component={Details} />

                    <Route path="/cart" exact component={Cart} />

                    <Redirect from="/" to="/products" exact />

                    <Route path="/notfound" exact component={Notfound} />

                    <Redirect to="/notfound" />
                </Switch>
            </BrowserRouter>
        </productContext.Provider>
    );
};

export default App;
