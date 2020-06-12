import React from "react";
import Autocomplete from "./autocomplete";
import "../css/selection.css"
import VehicleOptions from "./vehicleOption"
import { TotalDestinations } from "../constants/constants.js"

export default function Falcon(props) {
    let planetDropdowns = [...Array(TotalDestinations).keys()].map((count) => {
        let vehicleOptions
        if (props.planetNames.includes(props.selectedPlanets[count])) {
            vehicleOptions = props.vehicles.map((vehicle, index) => {
                let disableButton = vehicle["total_no"] === 0 || props.selectedPlanets[count]["distance"] > vehicle["max_distance"]
                return (
                    <VehicleOptions key={index}
                        value={vehicle["name"]}
                        name={"vehicle" + count}
                        vehicleCount={vehicle["total_no"]}
                        onClick={(event) => props.onClick(event, index, count)}
                        disabled={disableButton} />
                )
            })
        }
        return (
            <div className='partition' key={count}>
                <Autocomplete
                    suggestions={props.nonSelectedPlanets} titleName={"Destination " + (count + 1)}
                    addSelection={(selection) => { props.addSelection(selection, count) }}
                    destinationIndex={count}
                    selectedPlanets={props.selectedPlanets}
                    planets={props.planetNames}
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
                    <span className='test'>Time taken: {props.time}</span>
                </div>
            </div>

        </div>
    );
}
