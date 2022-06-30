import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import '../Styles/Loader.css';

function Loader() {   
  const useStylesFacebook = makeStyles((theme) => ({
    root: {
      position: 'absolute',
      width: '50vw',    
      height: '39vw',
      backgroundColor:'#f1f1f1'  
    },
    bottom: {
      color: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 700],
      marginLeft: '23vw',
      marginTop: '18vw',
    },
    top: {
      color: '#1a90ff',
      animationDuration: '550ms',
      position: 'absolute',
      left: 0,
      marginLeft: '23vw',
      marginTop: '18vw',
    },
    circle: {
      strokeLinecap: 'round',
    },
  }));
  
  function FacebookCircularProgress(props) {
  
    return (
      <div className={classes.root}>
        <CircularProgress
          variant="determinate"
          className={classes.bottom}
          size={50}
          thickness={4}
          {...props}
          value={100}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          className={classes.top}
          classes={{
            circle: classes.circle,
          }}
          size={50}
          thickness={4}
          {...props}
        />
      </div>
    );
  }
  const classes = useStylesFacebook();

    return (
      <div className={classes.root}>
        <FacebookCircularProgress />
      </div>
    );
  }
  

export default Loader;