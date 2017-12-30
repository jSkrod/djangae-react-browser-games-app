import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react';
import TextField from "../../../../../node_modules/material-ui/TextField/TextField";
import {Button} from "material-ui";
import {FileUpload} from "material-ui-icons";
import {connect} from "react-redux";
import { CircularProgress } from 'material-ui/Progress';
import {gameSubmited, getUploadURL, unmountAddGameView} from "../../../../actions/DeveloperActions";
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input from 'material-ui/Input';
import { LinearProgress } from 'material-ui/Progress';

@connect((store) => { return {
    developerReducer: store.developerReducer
}
})
class AddGame extends Component{
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
        this.props.dispatch(getUploadURL());
    }

    componentWillUnmount() {
        this.props.dispatch(unmountAddGameView());
    }

    handleSubmitClick(){
        this.setState({
            choseFileName: "",
            choseImageName: ""
        });
        let fileUploadFormDom = ReactDOM.findDOMNode(this.refs.fileUploadForm);
        let data = new FormData(fileUploadFormDom);
        this.props.dispatch(gameSubmited(data, this.props.developerReducer.get('uploadURL')));
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
        let display = !this.props.developerReducer.get('addGameViewIsDisabled');
        if (display) {
            return (
                <form ref="fileUploadForm">
                    <TextField
                        label="Game name"
                        placeholder="Game name"
                        fullWidth
                        type="name"
                        name="game_name"
                        onChange={event => this.setState({name: event.target.value})}
                        error={this.props.developerReducer.get('isGameNameError')}
                        helperText={this.props.developerReducer.get('gameNameError')}
                    />

                    <TextField
                        label="Game title"
                        placeholder="Game title"
                        fullWidth
                        type="title"
                        name="title"
                        onChange={event => this.setState({name: event.target.value})}
                        error={this.props.developerReducer.get('isTitleError')}
                        helperText={this.props.developerReducer.get('titleError')}
                    />

                    <TextField
                        label="Game description"
                        placeholder="Game description"
                        fullWidth
                        type="description"
                        name="description"
                        onChange={event => this.setState({name: event.target.value})}
                    />

                    <Button label="Choose image" onClick={this.onSelectImageClick} style={{justifyContent: "left", paddingLeft: 0, paddingRight: 0}}>
                        <FileUpload style={{paddingRight: "5px"}}/>
                        <input name="image" type="file" style={{opacity: 0, pointerEvents: "none", width: 0}} ref="imageUpload" onChange={this.onImageInputChange}/>
                        <FormControl fullWidth>
                        {this.props.developerReducer.get('isImageError') && <FormHelperText style={{color: "red"}}>{this.props.developerReducer.get('imageError')}</FormHelperText>}
                            <Input
                                id="Chose image"
                                value={this.state.choseImageName}
                                disabled
                                fullWidth
                                error={this.props.developerReducer.get('isImageError')}
                            />
                            <FormHelperText>Choose image</FormHelperText>
                        </FormControl>
                    </Button>

                    <Button label="Choose file" onClick={this.onSelectFileClick} style={{justifyContent: "left", paddingLeft: 0, paddingRight: 0}}>
                        <FileUpload style={{paddingRight: "5px"}}/>
                        <input name="file" type="file" style={{opacity: 0, pointerEvents: "none", width: 0}} ref="fileUpload" onChange={this.onFileInputChange}/>
                        <FormControl fullWidth>
                            {this.props.developerReducer.get('isFileError') && <FormHelperText style={{color: "red"}}>{this.props.developerReducer.get('fileError')}</FormHelperText>}
                            <Input
                                id="weight"
                                value={this.state.choseFileName}
                                disabled
                                fullWidth
                                error={this.props.developerReducer.get('isFileError')}
                            />
                            <FormHelperText>Choose file</FormHelperText>
                        </FormControl>
                    </Button>
                    <Button raised onClick={this.handleSubmitClick} disabled={this.props.developerReducer.get('isSendingGame')}>
                        Add
                    </Button>
                    <LinearProgress hidden={!this.props.developerReducer.get('isSendingGame')}/>
                </form>

            )
        } else {
            return (
                <div>
                        <CircularProgress size={50} />
                </div>
            )
        }
    }

}

export default AddGame;