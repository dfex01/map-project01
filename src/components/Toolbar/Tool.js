import React from 'react';

import '../../assets/styles/toolbar.css';

const Tool = (props) => {
    return (
        <li onClick={props.click}>
            <div className="Button">
                {props.children}
            </div>
        </li>
    );
}

export default Tool;