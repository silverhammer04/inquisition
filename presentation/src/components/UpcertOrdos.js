import React from 'react';

export default class UpcertOrdo extends React.Component {
    state = {
        name: this.props.ordo.name,
        area_of_vigil: this.props.ordo.area_of_vigil,
        date: this.props.ordo.date,
    };
    handleSubmit = (event) => {
        event.preventDefault();
        const api_url = process.env.REACT_APP_API_URL;
        fetch(`${api_url}/ordos/${this.props.ordo._id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state) 
        }) .then(response => response.json())
            .then(data => console.log(data))
            .then(this.props.toggleForm)
            .then(this.props.refresh)            
    }
    handleChange = (event) => {
        this.setState({ [event.target.name] : event.target.value});
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                Ordo_
                <input name="name"
                    type="text"
                    placeholder="Change ordo?"
                    value={this.state.name}
                    onChange={this.handleChange} 
                    required/>
                <input name="area_of_vigil"
                    type="text"
                    placeholder="change area of vigil?"
                    value={this.state.area_of_vigil}
                    onChange={this.handleChange} />
                <input name="date"
                    type="text"
                    placeholder="Est M??"
                    value={this.state.date}
                    onChange={this.handleChange} />
                
                
                <input className= "Con-Chn"
                type="submit"
                    value="CONFIRM CHANGE"/>
            </form>           
        ) 
    }
}
