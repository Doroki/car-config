/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var SummaryModule = function () {

    var infoInputs = { // Summary containers
        model: document.querySelector("[data-category='model']"),
        engine: document.querySelector("[data-category='engine']"),
        gearbox: document.querySelector("[data-category='gearbox']"),
        color: document.querySelector("[data-category='color']"),
        price: document.querySelector("[data-category='price']"),
        img: document.querySelector("#img")
    };

    var prices = { // Object for prices of chosen parts
        model: 0,
        engine: 0,
        gearbox: 0,
        color: 0
    };

    var parts = { // Object for chocen parts
        model: "",
        engine: "",
        gearbox: "",
        color: ""
    };

    var setTotalPrice = function setTotalPrice() {
        var totalPrice = 0;
        for (var price in prices) {
            // sum all prices
            if (prices.hasOwnProperty(price)) {
                totalPrice += prices[price];
            }
        }
        totalPrice = totalPrice.toFixed(2);
        totalPrice = numberWithSpaces(totalPrice);

        infoInputs.price.textContent = "$ " + totalPrice;
    };

    var numberWithSpaces = function numberWithSpaces(x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
    };

    var setChosenParts = function setChosenParts() {
        for (var element in infoInputs) {
            if (infoInputs.hasOwnProperty(element)) {
                infoInputs[element].textContent = parts[element];
            }
        }
    };

    var setImgColor = function setImgColor(color) {
        infoInputs.img.setAttribute("style", "color: " + color + ";");
    };

    var setImg = function setImg(nameClass) {
        infoInputs.img.className = nameClass;
    };

    var clearValue = function clearValue(property) {
        // Function for case, user would undone previous choice, and data in summary need to be cleard
        update("", 0, null, property);
    };

    var update = function update(id, price, view, choice) {
        prices[choice] = price;
        parts[choice] = id;

        setChosenParts();
        setTotalPrice();

        if (choice === "model") setImg(view);
        if (choice === "color") setImgColor(view);
    };

    return {
        update: update,
        clearValue: clearValue
    };
}();

exports.default = SummaryModule;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _car_config = __webpack_require__(2);

var _car_config2 = _interopRequireDefault(_car_config);

var _summary = __webpack_require__(0);

var _summary2 = _interopRequireDefault(_summary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppModule = function () {

    var offers = { //offers will contain array of possible parts for selected options
        model: [],
        engine: [],
        gearbox: [],
        color: []
    };

    var getCarData = function getCarData() {
        // Fetch data from JSON file and same to "offers"
        fetch('./car_data.json').then(function (response) {
            return response.json();
        }).then(function (data) {
            offers.model = data.cars;
            offers.color = data.color;
            _car_config2.default.createConfigElements(offers.model, _car_config2.default.model, "model");
        });
    };

    var setChosenPart = function setChosenPart(e, section) {
        // Search correct Data Object for future and call SummatyModule to set chosen values
        var selectedOption = e.target.value;
        var result = offers[section].filter(function (part) {
            return part.id === selectedOption;
        }); // Search correct Data Object for choice
        result = result[0];

        _summary2.default.update(result.id, result.price, result.view || null, section);

        return result;
    };

    var findCarParts = function findCarParts(e, choice, newParts) {
        // Search correct parts for previos choice and call ConfigModule to create buttons
        offers[newParts] = choice[newParts];
        _car_config2.default.createConfigElements(offers[newParts], _car_config2.default[newParts], newParts);
    };

    var findColors = function findColors(e) {
        // call ConfigModule to create color buttons
        var colorArr = offers.color;
        _car_config2.default.createConfigElements(colorArr, _car_config2.default.color, "color");
    };

    var events = function events() {
        _car_config2.default.model.addEventListener("click", function (e) {
            if (e.target.localName !== "button" || e.target.dataset.usage === "true") return;
            var choice = setChosenPart(e, "model");
            findCarParts(e, choice, "engine");
            _car_config2.default.setButtonUsage(e.target);
        });

        _car_config2.default.engine.addEventListener("click", function (e) {
            if (e.target.localName !== "button" || e.target.dataset.usage === "true") return;
            var choice = setChosenPart(e, "engine");
            findCarParts(e, choice, "gearbox");
            _car_config2.default.setButtonUsage(e.target);
        });

        _car_config2.default.gearbox.addEventListener("click", function (e) {
            if (e.target.localName !== "button" || e.target.dataset.usage === "true") return;
            var choice = setChosenPart(e, "gearbox");
            findColors(e);
            _car_config2.default.setButtonUsage(e.target);
        });

        _car_config2.default.color.addEventListener("click", function (e) {
            e.preventDefault();
            if (e.target.localName !== "input" || e.target.dataset.usage === "true") return;

            var selectedOption = e.target.value;
            var result = offers["color"].filter(function (part) {
                return part.value === selectedOption;
            });
            _summary2.default.update(result[0].id, result[0].price, result[0].value, "color");
            _car_config2.default.setButtonUsage(e.target);
        });
    };

    return {
        init: function init() {
            getCarData();
            events();
        }
    };
}();

AppModule.init();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _summary = __webpack_require__(0);

var _summary2 = _interopRequireDefault(_summary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConfigModule = function () {

    var configArea = {
        model: document.querySelector("#model"),
        engine: document.querySelector("#engine"),
        gearbox: document.querySelector("#gearbox"),
        color: document.querySelector("#color")
    };

    var createConfigElements = function createConfigElements(dataArr, element, text) {
        // Creates Buttons with correct options
        var section = document.createDocumentFragment();
        var header = createHeader(text);

        clearContainers(element);
        section.appendChild(header);

        dataArr.map(function (part) {
            var button = text === "color" ? createColorButton(part) : createButton(part);
            section.appendChild(button);
        });

        element.appendChild(section);
    };

    var createColorButton = function createColorButton(color) {
        var button = document.createElement("input");
        button.type = "color";
        button.value = color.value;
        button.classList.add("config__colors");
        return button;
    };

    var createButton = function createButton(part) {
        var button = document.createElement("button");
        button.value = part.id;
        button.textContent = part.id;
        button.classList.add("config__buttons");
        return button;
    };

    var createHeader = function createHeader(text) {
        var header = document.createElement("h2");
        header.classList.add("config__header");
        header.textContent = text;
        return header;
    };

    var clearContainers = function clearContainers(element) {
        // Clears containers for buttons
        element.innerHTML = "";
        _summary2.default.clearValue(element.id);

        var sibling = element.nextElementSibling;
        while (sibling) {
            // Clear next sibling containers in case of user would change previous choice
            sibling.innerHTML = "";
            _summary2.default.clearValue(sibling.id); // call SummaryModule to clear summary data, proper for cleared container
            sibling = sibling.nextElementSibling;
        }
    };

    var setButtonUsage = function setButtonUsage(element) {
        var parent = element.parentElement;
        var childs = Array.from(parent.childNodes);
        childs.forEach(function (child) {
            return child.dataset.usage = "false";
        });

        element.dataset.usage = "true";
    };

    var initClickEffects = function initClickEffects() {
        // Events for visual effects
        for (var element in configArea) {
            if (configArea.hasOwnProperty(element)) {

                configArea[element].addEventListener("click", function (e) {

                    if (e.target.localName === "button") {
                        var parent = e.target.parentElement;
                        var childs = Array.from(parent.childNodes);

                        childs.forEach(function (child) {
                            return child.classList.remove("config__buttons--selected");
                        });
                        e.target.classList.add("config__buttons--selected");
                    } else if (e.target.localName === "input") {
                        var _parent = e.target.parentElement;
                        var _childs = Array.from(_parent.childNodes);

                        _childs.forEach(function (child) {
                            return child.classList.remove("config__colors--selected");
                        });
                        e.target.classList.add("config__colors--selected");
                    }
                });
            }
        }
    };

    initClickEffects();
    return {
        model: configArea.model,
        engine: configArea.engine,
        gearbox: configArea.gearbox,
        color: configArea.color,
        createConfigElements: createConfigElements,
        setButtonUsage: setButtonUsage
    };
}();

exports.default = ConfigModule;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map