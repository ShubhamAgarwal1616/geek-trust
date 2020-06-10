import React from 'react'
import Falcon from './selection'
import '../css/home.css'
import Result from './result.js'

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
        vehicles: [{ name: "car1", total_no: 2 }, { name: "car2", total_no: 1 }, { name: "car3", total_no: 1 }, { name: "car4", total_no: 2 }],
        submission: false,
    }

    onSubmit = () => {
        this.setState({ submission: !this.state.submission })
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
                vehicles={this.state.vehicles}/>
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