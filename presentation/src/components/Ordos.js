import React from 'react';
import Ordo from './Ordo';
import CreateOrdos from './CreateOrdos';

class Ordos extends React.Component {
    state = {
        ordos: [ ]
    }    
    getOrdos = () => {
        const api_url = process.env.REACT_APP_API_URL;
        fetch(`${api_url}/ordos`)
            .then(response => response.json())
            .then(data => this.setState({ordos:data}))
    }
    componentDidMount() {
        this.getOrdos();
    }

    deleteOrdos = (id, refresh) => {
        const api_url = process.env.REACT_APP_API_URL;
        fetch(`${api_url}/ordos/${id}`,{
            method: "DELETE"
        }) .then(response => response.json())
            .then(data => {
                console.log(data);
                refresh();
            })
    }

    render(){
        const displayOrdos = this.state.ordos.map(ordo =>
        <Ordo 
            key={ordo._id} 
            ordo={ordo} 
            deleteOrdos={this.deleteOrdos}
            refresh={this.getOrdos} />
            
        )
        return (
            <>
                <h2>Ordos of the Inquisition</h2>
                <ul>
                    {displayOrdos}
                </ul>
                <h4>New Ordo</h4>
                <CreateOrdos refresh={this.getOrdos}/>
            </>
        )
    }
}
export default Ordos;