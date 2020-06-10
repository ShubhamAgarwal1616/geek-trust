import axios from 'axios'

export default class VehicleModel {
    constructor(){
        this.vehiclesList = []
    }

    fetchVehicles() {
        return axios
            .get("https://findfalcone.herokuapp.com/vehicles")
            .then(response => {
                this.vehiclesList = response.data;
            });
    }
}