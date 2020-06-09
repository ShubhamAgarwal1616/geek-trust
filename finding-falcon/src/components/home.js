import React from "react";
import Autocomplete from "./autocomplete";
import "../css/home.css"
import { TotalDestinations } from "../constants/constants.js"
import VehicleOptions from "./vehicleOption"

export default class Falcon extends React.Component {
    state = {
        planetNames: [
            "Alligator",
            "Bask",
            "Crocodilian",
            "Death Roll",
            "Eggs",
            "Jaws",
            "Reptile",
            "Solitary",
            "Tail",
            "Wetlands"
        ],
        filteredPlanets: [
            "Alligator",
            "Bask",
            "Crocodilian",
            "Death Roll",
            "Eggs",
            "Jaws",
            "Reptile",
            "Solitary",
            "Tail",
            "Wetlands"
        ],
        selectedPlanets: Array(TotalDestinations).fill(""),
        selectedVehicles: Array(TotalDestinations).fill(""),
        vehicles: [{ name: "car1", total_no: 2 }, { name: "car2", total_no: 1 }, { name: "car3", total_no: 1 }, { name: "car4", total_no: 2 }]
    }

    addSelection = (selection, count) => {
        let selectedPlanets = this.state.selectedPlanets.slice();
        selectedPlanets[count] = selection;
        const filteredPlanets = this.state.planetNames.filter(planet => !selectedPlanets.includes(planet));
        this.setState({ filteredPlanets, selectedPlanets });
    }

    onClick = (event, index, count) => {
        let vehicles = this.state.vehicles.slice();
        let selectedVehicles = this.state.selectedVehicles.slice();
        let previousSelectedVehicleIndex = vehicles.findIndex((vehicle) => vehicle["name"] === selectedVehicles[count]);
        if (previousSelectedVehicleIndex !== -1)
            vehicles[previousSelectedVehicleIndex]["total_no"] += 1;
        let [selectedVehicle] = vehicles.filter((vehicle) => vehicle["name"] === event.currentTarget.value);
        selectedVehicle["total_no"] -= 1;
        vehicles[index] = selectedVehicle
        selectedVehicles[count] = event.currentTarget.value
        this.setState({vehicles, selectedVehicles})
    }

    render() {
        let planetDropdowns = [...Array(TotalDestinations).keys()].map((count) => {
            let vehicleOptions
            if (this.state.planetNames.includes(this.state.selectedPlanets[count])) {
                vehicleOptions = this.state.vehicles.map((vehicle, index) => {
                    return (
                        <VehicleOptions key={index} 
                        value={vehicle["name"]} 
                        name={"vehicle" + count}
                        vehicleCount={vehicle["total_no"]}
                        onClick={(event) => this.onClick(event, index, count)}
                        disabled={vehicle["total_no"] === 0}/>
                    )
                })
            }
            return (
                <div className='partition' key={count}>
                    <Autocomplete
                        suggestions={this.state.filteredPlanets} titleName={"Destination " + (count + 1)}
                        addSelection={(selection) => { this.addSelection(selection, count) }}
                        destinationIndex={count}
                        selectedPlanets={this.state.selectedPlanets}
                        planets={this.state.planetNames}
                    />
                    <div className='vehicle-options'>
                        {vehicleOptions}
                    </div>
                </div>
            );
        })

        return (
            <div>
                <h1>Finding Falcone!</h1>
                <p className='dropdown-title'>Select planets you want to search in:</p>
                {planetDropdowns}
                <div className='time-partition'>
                    <span className='test'>Time taken: 200</span>
                </div>
            </div>
        );
    }
}
