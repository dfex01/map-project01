import React, { Component } from 'react';
import { Container, Col } from 'reactstrap';

import Tool from './Tool';
import '../../assets/styles/toolbar.css';
import rightArrow from '../../assets/images/arrow-right.svg'
import leftArrow from '../../assets/images/arrow-left.svg'


class Toolbar extends Component {

render() {
    const toolClass = this.props.show ? "Toolbar" : "HideToolbar";
    return (
        <Container className={toolClass} >
            {this.props.show ?
            <Col className="toggleButton"><img src={rightArrow} alt="arrow" onClick={this.props.toggle} /></Col>
            : 
            <Col className="toggleButton"><img src={leftArrow} alt="arrow" onClick={this.props.toggle} /></Col>}
            <Col>
                <ul className="NavList">
                    <Tool click={this.props.addMarker}>Add Marker</Tool>
                    <Tool click={this.props.editMarker}>Edit Marker</Tool> 
                    <Tool click={this.props.removeMarker}>Remove Marker</Tool> 
                    <Tool click={this.props.saveMarker}>Save Markers</Tool>
                </ul>
            </Col>
        </Container>
    );
}

}

export default Toolbar;