import React from "react";
import EnvMenu from "../Components/EnvMenu";
import FilterGroups from "../Components/FilterGroups";
import FilterStatus from "../Components/FilterStatus";
import Loader from "../Components/Loader.js";
import MyAccordion from "../Components/MyAccordion";
import getFromAtuator from "../Data/Services/Actuator.js";
import { envAppData, environments } from "../Data/Models/AppData.js";
import "../Styles/Dashboard.css";
import "../Styles/menu.css";

export default class HealthCheckDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      environment: "",
      results: {},
      apps: {},
      filterGroups: [],
      filterStatus: [],
    };
  }

  updateAppData = (env) => {
    let appData = {};

    Object.keys(envAppData).forEach((appName) => {
      appData[appName] = { url: envAppData[appName][env] };
    });

    this.updateState({ environment: env, apps: appData }).then(() => {
      this.updateDashboard(this.state.apps);
    });
  };

  updateDashboard = (apps = {}) => {
    let promiseResults = [];
    let results = {};
    let filterGroups = this.state.filterGroups;
    this.props.setLoading(true);

    Object.keys(apps).forEach((appName) => {
      if (apps[appName] && filterGroups.length === 0) {
        promiseResults.push(
          getFromAtuator(apps[appName].url, "health")
            .then((res) => (results[appName] = res.body))
            .catch((err) => (results[appName] = err.body))
            .finally(() => (results[appName].title = envAppData[appName].title))
        );
      } else {
        if (apps[appName] && filterGroups.length > 0) {
          filterGroups.forEach((group) => {
            let reGroup = new RegExp(group.value, "i");

            if (reGroup.test(appName)) {
              promiseResults.push(
                getFromAtuator(apps[appName].url, "health")
                  .then((res) => (results[appName] = res.body))
                  .catch((err) => (results[appName] = err.body))
                  .finally(
                    () => (results[appName].title = envAppData[appName].title)
                  )
              );
            }
          });
        }
      }
    });

    Promise.all(promiseResults).then(() => {
      this.setState({ results: results });
      this.props.setLoading(false);
    });
  };

  updateState = async (obj) => {
    this.setState(obj);
  };

  getFilterSelection = (filterSelection) => {
    this.updateState({ filterGroups: filterSelection }).then(() => {
      this.updateDashboard(this.state.apps);
    });
  };

  getFilterStatusSelection = (filterStatusSelection) => {
    this.updateState({ filterStatus: filterStatusSelection }).then(() => {
      this.updateDashboard(this.state.apps);
    });
  };

  filterByStatus = (res, appName) => {
    let filterStatus = [];

    Object.keys(this.state.filterStatus).forEach((status) => {
      filterStatus.push(this.state.filterStatus[status].value);
    });

    if (res[appName].status === undefined && filterStatus.includes("ERROR")) {
      return false;
    }

    if (
      Object.keys(res).length === 0 ||
      filterStatus.length === 0 ||
      filterStatus.length >= 3
    ) {
      return false;
    }

    if (res[appName].status === "UP" && filterStatus.includes("UP")) {
      console.log("3");
      return false;
    }

    if (res[appName].status === "DOWN" && filterStatus.includes("DOWN")) {
      console.log("3");
      return false;
    }

    return true;
  };

  render() {
    const { results } = this.state;
    const isLoading = this.props.isLoading;

    return (
      <div className="dashboard">
        <EnvMenu
          isLoading={isLoading}
          updateAppData={this.updateAppData}
          key="envMenu"
          environments={environments}
        />

        {Object.keys(results).length !== 0 ? (
          <div className="basic-filters">
            <FilterGroups
              callFromDashboard={this.getFilterSelection.bind(this)}
            ></FilterGroups>
            <FilterStatus
              callFromDashboard={this.getFilterStatusSelection.bind(this)}
            ></FilterStatus>
          </div>
        ) : (
          <></>
        )}

        <div>
          {isLoading ? (
            <Loader />
          ) : (
            Object.keys(results).map((appName) =>
              this.filterByStatus(results, appName) ? (
                <></>
              ) : (
                <MyAccordion
                  app={results[appName]}
                  key={`${results[appName].title}-accordion`}
                />
              )
            )
          )}
        </div>
      </div>
    );
  }
}
