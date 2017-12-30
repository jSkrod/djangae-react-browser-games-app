import React from "react";
import logo from '../../public/images/logo.svg'
import Button from 'material-ui/Button'
const Logo = (props) => {
    return (
        <Button onClick={props.handleHome}>
        <img className={props.className} src={logo} width={props.width || ""} height={props.height || "64px"} alt="Logo"/>
        </Button>
    );
};

export default Logo