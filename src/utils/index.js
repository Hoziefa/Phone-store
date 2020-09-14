let timeout;
export const alertMessage = (message = "") => {
    const domMessage = document.querySelector(".alert-message");

    domMessage.textContent = message;

    domMessage.classList.add("active");

    timeout && clearTimeout(timeout);

    timeout = setTimeout(() => domMessage.classList.remove("active"), 1500);
};
