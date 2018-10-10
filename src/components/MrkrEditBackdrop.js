import React from 'react';
import '../assets/styles/mrkreditbackdrop.css'

const MrkrEditBackdrop = (props) => (
    props.show ? <div className='Backdrop' onClick={props.clicked}></div> : null
);

export default MrkrEditBackdrop;