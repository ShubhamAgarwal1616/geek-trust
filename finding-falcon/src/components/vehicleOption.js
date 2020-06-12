import React from 'react'
import '../css/vehicleOption.css'

export default function VehicleOption(props) {
    return (
        <div className='vehicle'>
            <input className='vehicle-type'
                name={props.name}
                type="radio"
                value={props.value}
                onClick={props.onClick}
                disabled={props.disabled} />
            <label>{props.value} ({props.vehicleCount})</label>
        </div>
    )
}