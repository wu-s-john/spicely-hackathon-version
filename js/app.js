class SeasonView {
    constructor(name) {
        this.name = name;
    }

    render() {
        return `
<div class="row">
    <div class="input-field col s6 center-align">
        <select id=${this.name}>
            <option value="0" selected>Choose your option (0 tsp)</option>
            <option value="1">1 / 4 tsp</option>
            <option value="2">1 / 2 tsp</option>
            <option value="3">3 / 4 tsp</option>
            <option value="4">1 tsp</option>
            <option value="5">5 / 4 tsp</option>
            <option value="6">3 / 2 tsp</option>
            <option value="7">7 / 4 tsp</option>
            <option value="8">2 tsps</option>
        </select>
        <label>${this.name}</label>
    </div>
</div>
`;
    }
}

const SALT = 'Salt';
const GARLIC = 'Garlic';
const SUGAR = 'Sugar';
const CINNAMON = 'Cinnamon';

const seasonNames = [SALT, GARLIC, SUGAR, CINNAMON];
const seasons = seasonNames.map(name => new SeasonView(name));

const servingsFactory = function servingsFactory(Salt, Garlic, Sugar, Cinnamon) {
    return {
        Salt,
        Garlic,
        Sugar,
        Cinnamon
    }
};

function setClickAction(seasonToServingsMap, season) {
    const serving = seasonToServingsMap[season];
    const selector = $(`#${season}`);
    selector.find(`option[value="${serving}"]`).prop('selected', true);
    selector.material_select();
}

class RecipeView {
    constructor(name, seasonToServingsMap) {
        this.name = name;
        this.seasonToServingsMap = seasonToServingsMap;
        console.log(this.seasonToServingsMap)
    }

    computeId() {
        return this.name.replace(/\s/g, '');
    }

    render() {
        return `<a class="collection-item" id="${this.computeId()}">
                    <h5 class="black-text" data-bind="text: name">${this.name}</h5></a>`
    }

    onClick() {
        Object.keys(this.seasonToServingsMap).forEach(season => setClickAction(this.seasonToServingsMap, season));
    }
}

const recipes = [
    new RecipeView('Bruin Bear Special', servingsFactory(2, 4, 6, 4)),
    new RecipeView('Salty Engineer', servingsFactory(8, 1, 1, 1)),
    new RecipeView('SpiceX', servingsFactory(4, 4, 4, 4)),
    new RecipeView('Gene Block Rub', servingsFactory(8, 2, 4, 5)),
    new RecipeView('Bplate', servingsFactory(0, 0, 0, 0))
];


recipes.forEach(recipe => {
    $('.collection').append(recipe.render());
    $(`#${recipe.computeId()}`).click(recipe.onClick.bind(recipe))
});

$('.forms').append(seasons.map(season => season.render()).join(`<br>`));

// $('.send-arduino').click();

$('#Salt').click(event => {
    console.log(event);
});


$('.send-arduino').click(() => {
    console.log('Sending data to Arduino');
    const arduinoInputValues = seasonNames.map(name => $(`#${name}`).val());
    console.log(arduinoInputValues);
    $.post('/arduino/input', {i: arduinoInputValues});
});


function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

