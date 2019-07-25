import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const DropDown = (props) => {

    return (
        <Dropdown.Item onClick={props.onClick} value={props.cityObject.id} >{props.cityObject.name}</Dropdown.Item>
    );
}

export default DropDown;


