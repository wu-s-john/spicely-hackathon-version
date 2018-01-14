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


export default SeasonView;
