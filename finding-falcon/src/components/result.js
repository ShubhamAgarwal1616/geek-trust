import React from 'react'
import '../css/result.css'

export default function Result(props) {
    let message
    let planetFound
    if(props.destinedPlanet) {
        message = "Success! Congratulations On Finding Falcone. King Shan is mighty pleased."
        planetFound = "Planet found: " + props.destinedPlanet
    }
    else{
        message = "Failure! Falcone is not found. King Shan is mighty pleased."
    }
    return (
        <div>
            <p className='common message'> {message} </p>
            <p className='common time'> Time taken: {props.time} </p>
            <p className='common'> {planetFound} </p>
        </div>
    );
} 