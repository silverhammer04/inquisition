import React, { useState} from 'react';
import UpcertOrdos from './UpcertOrdos';
import DelConBtn from './DelConBtn';

const Ordo = ({ordo, deleteOrdos, refresh}) => {
    const [update, setUpdate] = useState(false);
    const toggleForm = () => setUpdate(!update);
    return(
        <li>
            <button 
                onClick= {()=> toggleForm()}>Update
            </button>
            Ordo {ordo.name}
            <DelConBtn
                dialog={["HERESY ?", "EXTERMINATUS"]}
                action={() => deleteOrdos(ordo._id, refresh)} />
                
        {update ?
        <UpcertOrdos ordo={ordo}
            toggleForm={toggleForm}
            refresh={refresh} /> : '' }
        </li>
    )
}
export default Ordo;