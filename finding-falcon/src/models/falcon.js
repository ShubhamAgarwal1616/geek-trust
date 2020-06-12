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
            .post("https://findfalcone.herokuapp.com/token", "",{
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                console.log(response.data)
                this.token = response.data["token"];
            })
            .catch(error => {
                console.log(error)
            });
    }

    findFalcon(selectedPlanets, selectedVehicles) {
        const planets = selectedPlanets.map((planets) => planets["name"])
        const vehicles = selectedPlanets.map((vehicle) => vehicle["name"])
        return axios
            .post("https://findfalcone.herokuapp.com/find", {
                "token": this.token,
                "planet_names": planets,
                "vehicle_names": vehicles
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log(response.data)
                response.data["status"] === "success" ? this.destinedPlanet = response.data["planet_name"] : this.destinedPlanet = undefined
            });
    }
}