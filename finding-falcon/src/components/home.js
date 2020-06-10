import React from 'react'
import Falcon from './selection'
import '../css/home.css'
import Result from './result.js'
import FalconModel from '../models/falcon.js'
import VehicleModel from '../models/vehicles.js'
import PlanetModel from '../models/planets.js'

export default class Home extends React.Component {
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
        nonSelectedPlanets: [
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
        vehicles: [],
        submission: false,
    }

    onSubmit = () => {
        this.setState({ submission: !this.state.submission })
    }

    componentDidMount() {
        let vehicleModel = new VehicleModel();
        let planetModel = new PlanetModel();
        planetModel.fetchPlanets().then(() => {
            vehicleModel.fetchVehicles().then(() => {
                this.setState({ vehicles: vehicleModel.vehiclesList })
            })
        })
    }

    render() {
        let component
        let submitButtonText
        if (this.state.submission) {
            submitButtonText = "Start Again";
            component = <Result />
        }
        else {
            submitButtonText = "Find Falcone!";
            component = <Falcon planetNames={this.state.planetNames}
                vehicles={this.state.vehicles} 
                nonSelectedPlanets={this.state.nonSelectedPlanets}
                filterPlanets={(planets) => {this.setState({nonSelectedPlanets: planets})}}/>
        }
        return (
            <div>
                <h1>Finding Falcone!</h1>
                {component}
                <div>
                    <button className='submit' onClick={this.onSubmit}>{submitButtonText}</button>
                </div>
            </div>
        )
    }
}