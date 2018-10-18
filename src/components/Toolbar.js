import React from 'react';

import '../assets/styles/toolbar.css';

const Toolbar = (props) => {
    return (
        <div className="Toolbar">
            <ul className="NavList">
                <li onClick={props.addMarker}>
                    <div className="Button">
                 Add    Marker
                    </div>
                </li>
                <li onClick={props.editMarker}>
                    <div className="Button">
                        Edit Marker
                    </div>
                </li>
                <li onClick={props.removeMarker}>
                    <div className="Button">
                        Remove Marker
                    </div>
                </li>
                <li onClick={props.saveMarker}>
                    <div className="Button">
                        Save
                    </div>
                </li>
            </ul>
        </div>
    );

}

export default Toolbar;