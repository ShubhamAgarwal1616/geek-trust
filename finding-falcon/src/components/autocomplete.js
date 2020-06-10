import React, { Component } from "react";
import PropTypes from "prop-types";
import "../css/autocomplete.css"

class Autocomplete extends Component {
    static propTypes = {
        suggestions: PropTypes.instanceOf(Array).isRequired
    };

    static defaultProps = {
        suggestions: []
    };

    constructor(props) {
        super(props);

        this.state = {
            showSuggestions: false,
            filteredSuggestions: [],
            userInput: ""
        };
    }

    onFocus = event => {
        this.setState({ filteredSuggestions: this.props.suggestions, showSuggestions: true })
    };

    onChange = event => {
        const suggestions = this.props.suggestions;
        const userInput = event.currentTarget.value;

        const filteredSuggestions = suggestions.filter(
            suggestion =>
                suggestion["name"].toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        this.setState({
            filteredSuggestions,
            showSuggestions: true,
            userInput: event.currentTarget.value
        });
        this.props.addSelection(event.currentTarget.value)
    };

    onClick = event => {
        this.setState({
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: event.currentTarget.innerText
        });
        this.props.addSelection(event.currentTarget.innerText)
    };

    onKeyDown = event => {
        const value = this.props.planets.some((planet) => {return planet["name"] === this.state.userInput}) ? this.state.userInput : ""
        if (event.keyCode === 13) {
            this.setState({
                showSuggestions: false,
                userInput: value
            });
        }
    };


    render() {
        const {
            onChange,
            onClick,
            onFocus,
            state: {
                showSuggestions,
                filteredSuggestions,
                userInput
            }
        } = this;

        let suggestionsListComponent;

        if (showSuggestions) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            return (
                                <li
                                    key={suggestion["name"]}
                                    onClick={onClick}
                                >
                                    {suggestion["name"]}
                                </li>
                            );
                        })}
                    </ul>
                );
            }
        }

        return (
            <div>
                <em className='dropdown-label'>{this.props.titleName}</em>
                <div className='dropdown'>
                    <input 
                        type="text"
                        onChange={onChange}
                        onFocus={onFocus}
                        onKeyDown={this.onKeyDown}
                        value={userInput}
                    />
                    {suggestionsListComponent}
                </div>
            </div>
        );
    }
}

export default Autocomplete;