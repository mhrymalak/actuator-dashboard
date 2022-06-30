import React from 'react';
import Navbar from'./Components/Navbar.js';
import External from './Components/External.js';
import HealthCheckDashboard from './Layout/HealthCheckDashboard.js';
import InfoDashboard from './Layout/InfoDashboard.js';
import './App.css';



export default class App extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      route: "",
      isLoading:false
    }
    this.loadRoute = this.loadRoute.bind(this);  
    this.setLoading = this.setLoading.bind(this);  
    this.health = React.createRef();
    this.info = React.createRef();
  }
  
  loadRoute(newRoute){
    this.setState({route:newRoute});
  }
  setLoading(newBool){
    this.setState({isLoading:newBool})
  }

    render(){
      var route  = this.state.route;
      var isLoading  = this.state.isLoading;
      const routes = {
        Health: <HealthCheckDashboard key='health' ref={this.health} isLoading={isLoading} setLoading={this.setLoading}/>,
        Info: <InfoDashboard key='info' ref={this.info} isLoading={isLoading} setLoading={this.setLoading}/>
      }
        return (
          <External>
              <Navbar loadRoute={this.loadRoute} isLoading={isLoading}/>
              {routes[route]}
          </External>
        );
    } 
}