import React from 'react';
import { withStyles } from 'material-ui/styles';
import {connect} from 'react-redux';
import Dialog, { DialogTitle, DialogContent, DialogContentText, DialogActions } from 'material-ui/Dialog';
import {closeRegisteredPopup} from "../../../actions/RegisterActions";
import Button from 'material-ui/Button';

const styles = {
};
  
@connect((store) => {
    return {
        register: store.registerReducer
    }
})
class RegisteredPopup extends React.Component {
    constructor(props) {
        super(props);

        this.closeRegisterPopup = this.closeRegisterPopup.bind(this);
    }

    closeRegisterPopup () {
        this.props.dispatch(closeRegisteredPopup());
    }
  
    render() {
      return (
        <Dialog onRequestClose={this.closeRegisterPopup} open={this.props.register.get('popupIsOpened')}>
          <DialogTitle>Registered account completed</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your account has been registered. Activation code has been sent to your email. After activation you can log in.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.closeRegisterPopup} color="primary">
            Close
          </Button>
        </DialogActions>
        </Dialog>
      );
    }
  }
  
  export default withStyles(styles)(RegisteredPopup)