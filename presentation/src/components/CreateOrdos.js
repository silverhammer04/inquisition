import React from 'react';

export default class CreateOrdos extends React.Component {
    state = {
        name: "",
        area_of_vigil: "",
        date: "",
    }
    handleSubmit = (event) =>{
        event.preventDefault();
        const api_url = process.env.REACT_APP_API_URL;
        fetch(`${api_url}/ordos`, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(this.state)
        }) .then(response => response.json())
            .then(data => console.log(data))
            .then(() => {
                this.setState({
                    name: "",
                    area_of_vigil: "",
                    date: ""
                })
            })  .then(this.props.refresh)
    }
    handleChange = (event) => {
    this.setState({ [event.target.name] : event.target.value});
    }
    render() {
        return(
            <form  onSubmit={this.handleSubmit}>
                Ordo_
                <input name="name"
                    type="text"
                    placeholder="name of the ordo"
                    value={this.state.name}
                    onChange={this.handleChange} 
                    required/>
                <input name="area_of_vigil"
                    type="text"
                    placeholder="area of vigil"
                    value={this.state.area_of_vigil}
                    onChange={this.handleChange} />
                <input name="date"
                    type="text"
                    placeholder="Est M??"
                    value={this.state.date}
                    onChange={this.handleChange} />

                <input type="submit"
                    value="Add Ordo"/>
            </form>
        )
    }
}