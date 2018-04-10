
const SummaryModule = (function() {

    const infoInputs = { // Summary containers
        model: document.querySelector("[data-category='model']"),
        engine: document.querySelector("[data-category='engine']"),
        gearbox: document.querySelector("[data-category='gearbox']"),
        color: document.querySelector("[data-category='color']"),
        price: document.querySelector("[data-category='price']"),
        img: document.querySelector("#img")   
    };

    let prices = { // Object for prices of chosen parts
        model: 0,
        engine: 0,
        gearbox: 0,
        color: 0
    };

    let parts = { // Object for chocen parts
        model: "",
        engine: "",
        gearbox: "",
        color: ""
    }

    const setTotalPrice = function() {
        let totalPrice = 0;
        for(const price in prices) { // sum all prices
            if (prices.hasOwnProperty(price)) {
                totalPrice += prices[price]
            }
        }
        totalPrice = totalPrice.toFixed(2);
        totalPrice = numberWithSpaces(totalPrice);

        infoInputs.price.textContent = `\$ ${totalPrice}`;
    };

    const numberWithSpaces = function(x) { 
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
    }

    const setChosenParts = function() {
        for(const element in infoInputs) {
            if (infoInputs.hasOwnProperty(element)) {
                infoInputs[element].textContent = parts[element];
            }
        }
    };

    const setImgColor = function(color) {
        infoInputs.img.setAttribute("style", `color: ${color};`)
    };

    const setImg = function(nameClass) {
        infoInputs.img.className = nameClass;
    };

    const clearValue = function(property) { // Function for case, user would undone previous choice, and data in summary need to be cleard
        update("", 0, null, property);
    }

    const update = function(id, price, view, choice) {
        prices[choice] = price;
        parts[choice] = id;

        setChosenParts();
        setTotalPrice();

        if(choice === "model") setImg(view);
        if(choice === "color") setImgColor(view);
    };

    return {
        update,
        clearValue
    };
})();

export default SummaryModule;