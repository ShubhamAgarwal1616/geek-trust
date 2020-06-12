import React from 'react'
import Falcon from './selection'
import '../css/home.css'
import Result from './result.js'
import FalconModel from '../models/falcon.js'
import VehicleModel from '../models/vehicles.js'
import PlanetModel from '../models/planets.js'
import { TotalDestinations } from "../constants/constants.js"

export default class Home extends React.Component {
    state = {
        planetNames: [],
        nonSelectedPlanets: [],
        vehicles: [],
        submission: false,
        model: null,
        time: 0,
        selectedPlanets: Array(TotalDestinations).fill(undefined),
        selectedVehicles: Array(TotalDestinations).fill({}),
        destinedPlanet: "undefined"

    }

    clearVehicleSelection = (count) => {
        let selectedVehicles = this.state.selectedVehicles.slice();
        let vehicles = this.state.vehicles.slice();
        selectedVehicles[count] = {};
        document.getElementsByName("vehicle" + count).forEach((element, index) => {
            if (element.checked) {
                element.checked = false;
                vehicles[index]["total_no"] += 1;
            }
        })
        this.setState({ vehicles, selectedVehicles });
    }

    addSelection = (selection, count) => {
        let selectedPlanets = this.state.selectedPlanets.slice();
        let [newSelection] = this.state.planetNames.filter(planet => planet["name"] === selection);
        selectedPlanets[count] = newSelection;
        let nonSelectedPlanets = this.state.planetNames.filter(planet => !selectedPlanets.includes(planet));
        this.setState({ selectedPlanets, nonSelectedPlanets });
        this.clearVehicleSelection(count)
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
        let vehicles = this.state.vehicles.slice();
        let selectedVehicles = this.state.selectedVehicles.slice();
        this.increasePreviousSelectedVehicleCount(vehicles, selectedVehicles, destinationCount)
        this.decreaseSelectedVehicleCount(event, vehicles, selectedVehicles, destinationCount, vehicleIndex)
        const time = this.state.model.calculateTime(this.state.selectedPlanets, selectedVehicles);
        this.setState({ vehicles, selectedVehicles, time })
    }

    resetState = () => {
        let vehicleModel = new VehicleModel();
        vehicleModel.fetchVehicles().then(() => {
            this.setState({
                submission: !this.state.submission,
                nonSelectedPlanets: this.state.planetNames,
                time: 0, selectedPlanets: Array(TotalDestinations).fill(undefined),
                selectedVehicles: Array(TotalDestinations).fill({}),
                vehicles: vehicleModel.vehiclesList
            });
        })
    }

    onSubmit = (text) => {
        if (text === "Find Falcone!") {
            this.state.model.getToken().then(() => {
                this.state.model.findFalcon(this.state.selectedPlanets, this.state.selectedVehicles).then(() => {
                    this.setState({
                        submission: !this.state.submission, destinedPlanet: this.state.model.destinedPlanet
                    })
                })
            })
        }
        else {
            this.resetState()
        }
    }

    componentDidMount() {
        let vehicleModel = new VehicleModel();
        let planetModel = new PlanetModel();
        let falconModel = new FalconModel();
        planetModel.fetchPlanets().then(() => {
            vehicleModel.fetchVehicles().then(() => {
                this.setState({
                    planetNames: planetModel.planetsList,
                    nonSelectedPlanets: planetModel.planetsList,
                    vehicles: vehicleModel.vehiclesList,
                    model: falconModel
                })
            })
        })
    }

    render() {
        let component
        let submitButtonText
        let disabledButton = this.state.selectedVehicles.some((vehicle) => Object.keys(vehicle).length === 0)
        if (this.state.submission) {
            submitButtonText = "Start Again";
            component = <Result time={this.state.time} destinedPlanet={this.state.destinedPlanet} />
        }
        else {
            submitButtonText = "Find Falcone!";
            component = <Falcon planetNames={this.state.planetNames}
                vehicles={this.state.vehicles}
                nonSelectedPlanets={this.state.nonSelectedPlanets}
                time={this.state.time}
                selectedPlanets={this.state.selectedPlanets}
                selectedVehicles={this.state.selectedVehicles}
                addSelection={this.addSelection}
                onClick={this.onClick} />
        }
        return (
            <div>
                <h1>Finding Falcone!</h1>
                {component}
                <div>
                    <button className='submit' onClick={() => this.onSubmit(submitButtonText)} disabled={disabledButton}>{submitButtonText}</button>
                </div>
            </div>
        )
    }
}