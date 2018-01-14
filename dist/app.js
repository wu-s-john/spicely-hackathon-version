class SeasonView {
    constructor(name) {
        this.name = name;
    }

    render() {
        return `
<div class="row">
    <div class="input-field col s6 center-align">
        <select id=${this.name}>
            <option value="0" selected>Choose your option</option>
            <option value="1">1 / 4 tpsn</option>
            <option value="2">1 / 2 tpsn</option>
            <option value="3">3 / 4 tpsn</option>
            <option value="4">1 tpsn</option>
            <option value="5">5 / 4 tpsn</option>
            <option value="6">3 / 2 tpsn</option>
            <option value="7">7 / 4 tpsn</option>
            <option value="8">2 tpsns</option>
        </select>
        <label>${this.name}</label>
    </div>
</div>
`;
    }
}

const seasonNames = ['Salt', 'Cinnamon', 'Sugar', 'Parsley'];
const seasons = seasonNames.map(name => new SeasonView(name));

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

