import axios from 'axios'

export default class PlanetModel {
    constructor() {
        this.planetsList = []
    }

    fetchPlanets() {
        return axios
            .get("https://findfalcone.herokuapp.com/planets")
            .then(response => {
                this.planetsList = response.data;
            });
    }
}