import ConfigModule from "./car_config";
import SummaryModule from "./summary";

const AppModule = (function() {

    const offers = { //offers will contain array of possible parts for selected options
        model: [],
        engine: [],
        gearbox: [],
        color: []
    };
    
    const getCarData = function() {  // Fetch data from JSON file and same to "offers"
        fetch('../car_data.json')
            .then(response => response.json())
            .then(data => {
                offers.model = data.cars;
                offers.color = data.color;
                ConfigModule.createConfigElements(offers.model, ConfigModule.model, "model");
            });
    };

    const setChosenPart = function(e, section) { // Search correct Data Object for future and call SummatyModule to set chosen values
        const selectedOption = e.target.value;
        let result = offers[section].filter(part => part.id === selectedOption); // Search correct Data Object for choice
        result = result[0];

        SummaryModule.update(result.id, result.price, result.view || null, section);

        return result;
    }

    const findCarParts = function(e, choice, newParts) { // Search correct parts for previos choice and call ConfigModule to create buttons
        offers[newParts] = choice[newParts];
        ConfigModule.createConfigElements(offers[newParts], ConfigModule[newParts], newParts);
    };

    const findColors = function(e) { // call ConfigModule to create color buttons
        const colorArr = offers.color;
        ConfigModule.createConfigElements(colorArr, ConfigModule.color, "color");
    };


    const events = function(){
        ConfigModule.model.addEventListener("click", e => {
            if(e.target.localName !== "button") return;
            const choice = setChosenPart(e, "model");
            findCarParts(e, choice, "engine");
        });

        ConfigModule.engine.addEventListener("click", e => {
            if(e.target.localName !== "button") return;
            const choice = setChosenPart(e, "engine");
            findCarParts(e, choice, "gearbox");
        });

        ConfigModule.gearbox.addEventListener("click", e => {
            if(e.target.localName !== "button") return;
            const choice = setChosenPart(e, "gearbox");
            findColors(e);
        });

        ConfigModule.color.addEventListener("click", e => {
            e.preventDefault(); 
            if(e.target.localName !== "input") return;
   
            const selectedOption = e.target.value;
            const result = offers["color"].filter(part => part.value === selectedOption);
            SummaryModule.update(result[0].id, result[0].price, result[0].value, "color");
        });
    };

    return {
        init: function() {
            getCarData();
            events();
        }
    };
})();

AppModule.init();



