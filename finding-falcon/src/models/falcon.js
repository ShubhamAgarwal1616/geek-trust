import axios from 'axios'

export default class FalconModel {
    constructor(){
        this.time = 0;
    }

    calculateTime(selectedPlanets, selectedVehicles) {
        let time = 0;
        selectedVehicles.forEach((vehicle, index) => {
            console.log(time)
            if (vehicle && Object.keys(vehicle).length !== 0) {
                time += (selectedPlanets[index]["distance"] / vehicle["speed"])
            }
        });
        return time;
    }
}