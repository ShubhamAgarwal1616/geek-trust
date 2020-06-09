import React from 'react'
import '../css/vehicleOption.css'

export default class VehicleOption extends React.Component{
    render() {
        return (
            <div className='vehicle'>
                <input className='vehicle-type' 
                name={this.props.name} 
                type="radio" 
                value={this.props.value} 
                onClick={this.props.onClick} 
                disabled={this.props.disabled}/>
                <label>{this.props.value} ({this.props.vehicleCount})</label>
            </div>
        )
    }
}