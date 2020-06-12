import axios from 'axios'

export default class FalconModel {
    constructor() {
        this.destinedPlanet = undefined;
        this.token = null
    }

    calculateTime(selectedPlanets, selectedVehicles) {
        let time = 0;
        selectedVehicles.forEach((vehicle, index) => {
            if (vehicle && Object.keys(vehicle).length !== 0) {
                time += (selectedPlanets[index]["distance"] / vehicle["speed"])
            }
        });
        return time;
    }

    getToken() {
        return axios
            .get("https://findfalcone.herokuapp.com/token")
            .then(response => {
                this.token = response.data["token"];
            });
    }

    findFalcon(selectedPlanets, selectedVehicles) {
        const planets = selectedPlanets.map((planets) => planets["name"])
        const vehicles = selectedPlanets.map((vehicle) => vehicle["name"])
    }
}