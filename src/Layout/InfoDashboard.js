import React from "react";
import getFromActuator from "../Data/Services/Actuator";
import { envAppData, environments } from "../Data/Models/AppData.js";
import Loader from "../Components/Loader.js";
import GridInfo from "../Components/GridInfo.js";
import "../Styles/navbar.css";
import "../Styles/Dashboard.css";

export default class InfoDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appsResults: {},
    };
  }

  componentDidMount() {
    let appsResults = JSON.parse(JSON.stringify(envAppData));
    let promiseResults = [];
    let find = async () =>
      Object.keys(envAppData).forEach((appName) => {
        if (appName.includes("messageBridge")) return;
        environments.forEach((env) => {
          let appUrl = envAppData[appName][env];
          promiseResults.push(
            getFromActuator(appUrl, "info")
              .then((res) => (appsResults[appName][env] = res.body))
              .catch((err) => (appsResults[appName][env] = err.body))
          );
        });
      });
    this.props.setLoading(true);
    find().then(
      Promise.all(promiseResults).then(() => {
        this.setState({ appsResults: appsResults });
        this.props.setLoading(false);
      })
    );
  }

  render() {
    let appsResults = this.state.appsResults;
    let isLoading = this.props.isLoading;
    console.log("RESULT ", appsResults);

    if (isLoading)
      return (
        <div className="dashboard">
          <Loader />
        </div>
      );
    else
      return (
        <div className="dashboardInfo">
          <GridInfo appsResults={appsResults} environments={environments} />
        </div>
      );
  }
}
