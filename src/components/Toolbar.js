import React from 'react';

import '../assets/styles/toolbar.css';

const Toolbar = (props) => {
    return (
        <div className="Toolbar">
            <ul className="NavList">
                <li onClick={props.addMarker}>
                    <button className="Button">
                    Add Marker
                    </button>
                </li>
                <li onClick={props.editMarker}>
                    <button className="Button">
                    Edit Marker
                    </button>
                </li>
                <li onClick={props.removeMarker}>
                    <button className="Button">
                    Remove Marker
                    </button>
                </li>
                <li onClick={props.saveMarker}>
                    <button className="Button">
                    Save
                    </button>
                </li>
            </ul>
        </div>
    );

}

export default Toolbar;