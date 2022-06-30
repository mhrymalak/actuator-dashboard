import React from 'react';
import Button from '@material-ui/core/Button';
import {  withStyles } from '@material-ui/core/styles';

const NavbarButton = withStyles({
  root: {
    color:"white",
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 18,
    fontWeight:"bold",
    padding: '6px 12px',
    border: '3px solid',
    borderColor:'white',
    lineHeight: 0.9,
    backgroundColor: '#0063cc',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
    },
    '&:active': {
    },
    '&:focus': {
      backgroundColor: "#00447c",
    },
  },
})(Button);

const EnvButton = withStyles({
  root: {
    borderRadius: "5px",
    boxShadow: 'none',
    color:"white",
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 16,
    fontWeight:"bold",
    textTransform: 'none',
    '&:hover': {
    },
    '&:active': {
      backgroundColor: "#00447c",
    },
    '&:focus': {
      backgroundColor: "#00447c",
    },
  }
})(Button);
export default class ButtonOption extends React.Component{
    
    constructor (props) {
        super(props);   
        this.state = {
        };
        this.NavbarButton = React.createRef();
        this.EnvButton = React.createRef();
    }

  render(){
    const {buttonType, value, variant, isLoading, handleClick} = this.props;

 switch (buttonType) {
          case "NavbarButton":
              return (
                <NavbarButton ref={this.NavbarButton} value={value} variant={variant} onClick={handleClick} disabled={isLoading} >{value}</NavbarButton>
                  )
          case "EnvButton":
              return (
                <EnvButton ref={this.EnvButton} variant={variant} onClick={handleClick} disabled={isLoading}>{value}</EnvButton>
                  )
          default: 
                  return ""
      }
  }
}
