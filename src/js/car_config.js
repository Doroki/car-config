import SummaryModule from "./summary";

const ConfigModule = (function () {

    const configArea = {
        model: document.querySelector("#model"),
        engine: document.querySelector("#engine"),
        gearbox: document.querySelector("#gearbox"),
        color: document.querySelector("#color")
    };

    const createConfigElements = function (dataArr, element, text) { // Creates Buttons with correct options
        const section = document.createDocumentFragment();
        const header = createHeader(text);

        clearContainers(element);
        section.appendChild(header);

        dataArr.map(part => {
            const button = (text === "color") ? createColorButton(part) : createButton(part);
            section.appendChild(button);
        });

        element.appendChild(section);
    };

    const createColorButton = function (color) {
        const button = document.createElement("input");
        button.type = "color";
        button.value = color.value;
        button.classList.add("config__colors")
        return button;
    };

    const createButton = function (part) {
        const button = document.createElement("button");
        button.value = part.id;
        button.textContent = part.id;
        button.classList.add("config__buttons")
        return button;
    };

    const createHeader = function (text) {
        const header = document.createElement("h2");
        header.classList.add("config__header");
        header.textContent = text;
        return header;
    };

    const clearContainers = function (element) { // Clears containers for buttons
        element.innerHTML = "";
        SummaryModule.clearValue(element.id);

        let sibling = element.nextElementSibling
        while (sibling) { // Clear next sibling containers in case of user would change previous choice
            sibling.innerHTML = "";
            SummaryModule.clearValue(sibling.id); // call SummaryModule to clear summary data, proper for cleared container
            sibling = sibling.nextElementSibling;
        }
    };

    const initClickEffects = function () { // Events for visual effects
        for (const element in configArea) {
            if (configArea.hasOwnProperty(element)) {

                configArea[element].addEventListener("click", e => {

                    if (e.target.localName === "button") {
                        const parent = e.target.parentElement;
                        const childs = Array.from(parent.childNodes);

                        childs.forEach(child => child.classList.remove("config__buttons--selected"));
                        e.target.classList.add("config__buttons--selected");
                    } 
                    else if (e.target.localName === "input") {
                        const parent = e.target.parentElement;
                        const childs = Array.from(parent.childNodes);

                        childs.forEach(child => child.classList.remove("config__colors--selected"));
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
        createConfigElements
    };
})();

export default ConfigModule;