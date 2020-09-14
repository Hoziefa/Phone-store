import React, { useEffect, useState } from "react";

const AlertMessage = ({ isActive, message = "" }) => {
    const [active, setActive] = useState(isActive);

    useEffect(() => {
        setTimeout(() => setActive(false), 1000);
    }, [active]);

    return <div className={`alert-message ${active ? "active" : ""}`}>{message}</div>;
};

export default AlertMessage;
