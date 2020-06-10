import React from "react";
import Autocomplete from "./autocomplete";
import "../css/selection.css"
import { TotalDestinations } from "../constants/constants.js"
import VehicleOptions from "./vehicleOption"

export default class Falcon extends React.Component {
    state = {
        filteredPlanets: [],
        selectedPlanets: Array(TotalDestinations).fill(""),
        selectedVehicles: Array(TotalDestinations).fill(""),
    }

    addSelection = (selection, count) => {
        let selectedPlanets = this.state.selectedPlanets.slice();
        selectedPlanets[count] = selection;
        const filteredPlanets = this.props.planetNames.filter(planet => !selectedPlanets.includes(planet));
        this.setState({ filteredPlanets, selectedPlanets });
    }

    increasePreviousSelectedVehicleCount = (vehicles, selectedVehicles, destinationIndex) => {
        let previousSelectedVehicleIndex = vehicles.findIndex((vehicle) => vehicle["name"] === selectedVehicles[destinationIndex]["name"]);
        if (previousSelectedVehicleIndex !== -1)
            vehicles[previousSelectedVehicleIndex]["total_no"] += 1;
    }

    decreaseSelectedVehicleCount = (event, vehicles, selectedVehicles, destinationIndex, vehicleIndex) => {
        let [selectedVehicle] = vehicles.filter((vehicle) => vehicle["name"] === event.currentTarget.value);
        selectedVehicle["total_no"] -= 1;
        vehicles[vehicleIndex] = selectedVehicle
        selectedVehicles[destinationIndex] = selectedVehicle
    }

    onClick = (event, vehicleIndex, destinationCount) => {
        let vehicles = this.props.vehicles.slice();
        let selectedVehicles = this.state.selectedVehicles.slice();
        this.increasePreviousSelectedVehicleCount(vehicles, selectedVehicles, destinationCount)
        this.decreaseSelectedVehicleCount(event, vehicles, selectedVehicles, destinationCount, vehicleIndex)
        this.setState({ vehicles, selectedVehicles })
    }

    componentDidMount() {
        this.setState({filteredPlanets: this.props.planetNames})
    }

    render() {
        let planetDropdowns = [...Array(TotalDestinations).keys()].map((count) => {
            let vehicleOptions
            if (this.props.planetNames.includes(this.state.selectedPlanets[count])) {
                vehicleOptions = this.props.vehicles.map((vehicle, index) => {
                    return (
                        <VehicleOptions key={index}
                            value={vehicle["name"]}
                            name={"vehicle" + count}
                            vehicleCount={vehicle["total_no"]}
                            onClick={(event) => this.onClick(event, index, count)}
                            disabled={vehicle["total_no"] === 0} />
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
                        planets={this.props.planetNames}
                    />
                    <div className='vehicle-options'>
                        {vehicleOptions}
                    </div>
                </div>
            );
        })

        return (
            <div>
                <p className='dropdown-title'>Select planets you want to search in:</p>
                <div className='select'>  
                    {planetDropdowns}
                    <div className='time-partition'>
                        <span className='test'>Time taken: 200</span>
                    </div>
                </div>

            </div>
        );
    }
}
