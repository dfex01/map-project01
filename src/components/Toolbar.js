import React from 'react';

const Toolbar = (props) => {
    return (
        <div>
            <button 
                onClick={props.click}
                style={{zIndex:10000, position: 'fixed'}}>
                    Edit Active Marker
            </button>
        </div>
    );

}

export default Toolbar;