import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react';
import {Button} from "material-ui";
import {FileUpload} from "material-ui-icons";
import {connect} from "react-redux";
import { CircularProgress } from 'material-ui/Progress';
import {unmountReuploadGameView, reuploadGameSubmited, getUploadURL} from "../../../../actions/ReuploadGameActions";
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input from 'material-ui/Input';
import { LinearProgress } from 'material-ui/Progress';
import {Grid} from "../../../../../node_modules/material-ui/index";
import { withStyles } from 'material-ui/styles';
import TextField from "../../../../../node_modules/material-ui/TextField/TextField";

const styleSheet = ({
    container: {
        boxShadow: 'none',
        paddingTop: 80,
    }
});

@connect((store) => { return {
    reuploadReducer: store.reuploadReducer,
    routing: store.routing,
}
})

class ReuploadGame extends Component{
    constructor(props){
        super(props);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.handleFileInput = this.handleFileInput.bind(this);
        this.onSelectFileClick = this.onSelectFileClick.bind(this);
        this.onSelectImageClick = this.onSelectImageClick.bind(this);
        this.onImageInputChange = this.onImageInputChange.bind(this);
        this.onFileInputChange = this.onFileInputChange.bind(this);

        this.state = {
            choseFileName: "",
            choseImageName: ""
        }
    }


    componentDidMount() {
        this.props.dispatch(getUploadURL(this.props.match.params.gameName));
    }

    componentWillUnmount() {
        this.props.dispatch(unmountReuploadGameView());
    }

    handleSubmitClick(){
        let fileUploadFormDom = ReactDOM.findDOMNode(this.refs.fileUploadForm);
        let data = new FormData(fileUploadFormDom);
        this.props.dispatch(reuploadGameSubmited(data, this.props.reuploadReducer.get('uploadURL')));
    }
    handleFileInput(file){
        this.setState({file: file });
    }

    onSelectFileClick () {
        let fileUploadDom = ReactDOM.findDOMNode(this.refs.fileUpload);
        fileUploadDom.click();
    }

    onSelectImageClick () {
        let imageUploadDom = ReactDOM.findDOMNode(this.refs.imageUpload);
        imageUploadDom.click();
    }

    getFileName (fullPath) {
        if (fullPath) {
            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            var filename = fullPath.substring(startIndex);
            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                filename = filename.substring(1);
            }
            return filename;
        }
    }

    onImageInputChange (event) {
        this.setState({choseImageName: this.getFileName(event.target.value)});
    }

    onFileInputChange (event) {
        this.setState({choseFileName: this.getFileName(event.target.value)});
    }

    render(){
        let display = !this.props.reuploadReducer.get('reuploadGameViewIsDisabled');
        console.log(this.props);
        if (display) {
            return (
                <form ref="fileUploadForm">
                    <Grid container spacing={16} className={this.props.classes.container}>
                        <Grid item xs={12} >
                            <TextField
                                label="Game name"
                                placeholder="Game name"
                                fullWidth
                                type="name"
                                name="gameName"
                                value={this.props.match? this.props.match.params.gameName: ''}
                            />
                            <Button label="Choose image" onClick={this.onSelectImageClick} style={{justifyContent: "left", paddingLeft: 0, paddingRight: 0}}>
                                <FileUpload style={{paddingRight: "5px"}}/>
                                <input name="image" type="file" style={{opacity: 0, pointerEvents: "none", width: 0}} ref="imageUpload" onChange={this.onImageInputChange}/>
                                <FormControl fullWidth>
                                {this.props.reuploadReducer.get('isImageError') && <FormHelperText style={{color: "red"}}>{this.props.reuploadReducer.get('imageError')}</FormHelperText>}
                                    <Input
                                        id="Chose image"
                                        value={this.state.choseImageName}
                                        disabled
                                        fullWidth
                                        error={this.props.reuploadReducer.get('isImageError')}
                                    />
                                    <FormHelperText>Choose image</FormHelperText>
                                </FormControl>
                            </Button>
                            </Grid>
                            <Grid item xs={12} >
                            <Button label="Choose file" onClick={this.onSelectFileClick} style={{justifyContent: "left", paddingLeft: 0, paddingRight: 0}}>
                                <FileUpload style={{paddingRight: "5px"}}/>
                                <input name="file" type="file" style={{opacity: 0, pointerEvents: "none", width: 0}} ref="fileUpload" onChange={this.onFileInputChange}/>
                                <FormControl fullWidth>
                                    {this.props.reuploadReducer.get('isFileError') && <FormHelperText style={{color: "red"}}>{this.props.reuploadReducer.get('fileError')}</FormHelperText>}
                                    <Input
                                        id="weight"
                                        value={this.state.choseFileName}
                                        disabled
                                        fullWidth
                                        error={this.props.reuploadReducer.get('isFileError')}
                                    />
                                    <FormHelperText>Choose file</FormHelperText>
                                </FormControl>
                            </Button>
                        <Grid item xs={12} >
                        </Grid>
                            <Button raised onClick={this.handleSubmitClick} disabled={this.props.reuploadReducer.get('isSendingGame')}>
                                Add
                            </Button>
                            <LinearProgress hidden={!this.props.reuploadReducer.get('isSendingGame')}/>
                        </Grid>
                    </Grid>
                </form>


            )
        } else {
            return (
                <div>
                    <Grid container spacing={16} className={this.props.classes.container}>
                        <Grid item xs={12} >
                            <CircularProgress size={50} />
                        </Grid>
                    </Grid>
                </div>
            )
        }
    }

}

export default withStyles(styleSheet)(ReuploadGame);