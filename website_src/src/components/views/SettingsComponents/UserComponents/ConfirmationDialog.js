

import {Button, Dialog} from "../../../../../node_modules/material-ui/index";
import * as React from "react";
import {
    DialogActions, DialogContent, DialogContentText,
    DialogTitle
} from "../../../../../node_modules/material-ui/Dialog/index";
const ConfirmationDialog = (props) => {
    return (
        <Dialog open={props.open} >
            <DialogTitle>{`Do you really want to change ${props.option}`}</DialogTitle>
            <DialogContent >
                <DialogContentText>
                    Are you sure that you want to change your {props.option}?
                </DialogContentText>
                <DialogContentText >
                    You won't be able to revert this change!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose.bind(this,false)} color="primary">
                    Disagree
                </Button>
                <Button onClick={props.handleClose.bind(this,true)}  color="primary">
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );

}

export default ConfirmationDialog