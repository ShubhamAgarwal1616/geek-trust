import React from "react";
import Autocomplete from "./autocomplete";
import "../css/home.css"
import {TotalDestinations} from "../constants/constants.js"

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
    }

    addSelection = (selection, count) => {
        let selectedPlanets = this.state.selectedPlanets.slice();
        selectedPlanets[count] = selection
        const filteredPlanets = this.state.planetNames.filter(planet => !selectedPlanets.includes(planet))
        this.setState({ filteredPlanets, selectedPlanets });
    }

    render() {
        let planetDropdowns = [...Array(TotalDestinations).keys()].map((count) => {
            return (
                <div className='partition' key={count}>
                    <Autocomplete
                        suggestions={this.state.filteredPlanets} titleName={"Destination " + (count + 1)} 
                        addSelection={(selection) => {this.addSelection(selection, count)}}
                        destinationIndex={count} 
                        selectedPlanets={this.state.selectedPlanets}
                        planets={this.state.planetNames}
                    />
                </div>
            );
        })
        console.log(this.state.selectedPlanets)
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
