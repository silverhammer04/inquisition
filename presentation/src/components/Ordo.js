import React from 'react';

const Ordo = ({ordo, deleteOrdos, refresh}) => {
    return(
        <li>
            Ordo {ordo.name}
            <button className="Del-Btn"
                onClick={() => deleteOrdos(ordo._id, refresh)} >
                EXTERMINATUS ?
            </button>
        </li>
    )
}
export default Ordo;