import React from "react";
import Extenal from "./External.js";
import { ReactComponent as AppIcon } from "./Icons/app.svg";
import { ReactComponent as HDIcon } from "./Icons/hd.svg";
import { ReactComponent as IBMMQ } from "./Icons/ibmmq.svg";
import { ReactComponent as MongoDBIcon } from "./Icons/mongodb.svg";
import { ReactComponent as Neutral } from "./Icons/neutral.svg";
import { ReactComponent as OffIcon } from "./Icons/off.svg";
import { ReactComponent as OnIcon } from "./Icons/on.svg";
import { ReactComponent as Ping } from "./Icons/ping.svg";
import { ReactComponent as RabbitIcon } from "./Icons/rabbitmq.svg";
import { ReactComponent as Server } from "./Icons/server.svg";
import { ReactComponent as SFTPIcon } from "./Icons/sftp.svg";
import { ReactComponent as Scope } from "./Icons/scope.svg";
import { ReactComponent as ExclamationMarkIcon } from "./Icons/exclamation-mark.svg";

import { Tooltip } from "@material-ui/core";
import "../Styles/AccordionHC.css";

export default class HealthCheckStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const result = this.props.content;

    return Object.keys(result).map((key, index) => {
      switch (key) {
        case "MongoDBHealthContributor":
          return this.getMongoHealth(result[key], index);
        case "RabbitMQPublisherHealthContributor":
        case "RabbitMQSubscriberHealthContributor":
          var specification = key.includes("Publisher")
            ? "Publisher"
            : "Subscriber";
          return this.getRabbitHealth(result[key], specification);
        case "SFTPHealthContributor":
          return this.getSfmtHealth(result, index);
        case "diskSpace":
          return this.getDiskSpaceHealth(result[key]);
        case "components":
          return this.getComponents(result[key]);
        case "status":
          return this.getApiHealth(result, index);
        case "error":
          return this.getError(result, index);
        default:
          return "";
      }
    });
  }

  getMongoHealth(value, index) {
    return (
      <div key={index} className="status-div">
        <Tooltip ref={this.props.ref} title="MongoDB">
          <MongoDBIcon ref={this.props.ref} />
        </Tooltip>
        {this.getStatus(value.status)}
      </div>
    );
  }

  getRabbitHealth(value, specification) {
    return (
      <div>
        <Tooltip ref={this.props.ref} title="RabbitMQ">
          <RabbitIcon ref={this.props.ref} className={"rabbit-icon"} />
        </Tooltip>
        {this.getStatus(value.status)}
        {specification !== undefined ? (
          <div className={"specification"}>{specification}</div>
        ) : (
          ""
        )}
      </div>
    );
  }

  getSfmtHealth(value, index) {
    return (
      <div key={index} className="status-div">
        <Tooltip ref={this.props.ref} title="SFTP Server">
          <SFTPIcon ref={this.props.ref} />
        </Tooltip>
        {this.getStatus(value.status)}
      </div>
    );
  }

  getDiskSpaceHealth(value) {
    return (
      <div className="status-div">
        <Tooltip ref={this.props.ref} title="Space on Cloud">
          <HDIcon ref={this.props.ref} />
        </Tooltip>
        {this.getStatus(value.status)}
      </div>
    );
  }

  getApiHealth(value, index) {
    return (
      <div key={index} className="status-div">
        <Tooltip ref={this.props.ref} title="API Status">
          <AppIcon ref={this.props.ref} />
        </Tooltip>
        {this.getStatus(value.status)}
      </div>
    );
  }



getError(result, index) {
    return (
      <div key={index} className="status-div">
        <Tooltip title="Fetch Error">
          <ExclamationMarkIcon className="exclamation-mark-icon" />
        </Tooltip>
        {this.getStatus(result.originalError)}
      </div>
    );
  }

  getStatus(content, description) {
    let element;

    switch (content?.toString().toLowerCase()) {
      case "up":
        element = (
          <Tooltip title={description !== undefined ? description : "Up"}>
            <OnIcon className="onIcon" />
          </Tooltip>
        );
        break;
      case "unknown":
        element = (
          <Tooltip title={description !== undefined ? description : "Unknown"}>
            <Neutral />
          </Tooltip>
        );
        break;
      case "typeerror: failed to fetch":
        break;
      case "down":
      default:
        element = (
          <Tooltip title={description !== undefined ? description : "Down"}>
            <OffIcon className="offIcon" />
          </Tooltip>
        );
    }

    return <div className="status">{element}</div>;
  }

  getComponents(main) {
    return (
      <Extenal>
        {Object.keys(main).map((componentKey) => {
          switch (componentKey) {
            case "jms":
              return (
                <Extenal>
                  <div className="status-div">
                    <Tooltip ref={this.props.ref} title="IBM MQ ">
                      <IBMMQ ref={this.props.ref} className="feature-icon" />
                    </Tooltip>
                    {this.getStatus(main[componentKey].status)}
                  </div>
                </Extenal>
              );
            case "diskSpace":
              return this.getDiskSpaceHealth(main[componentKey]);
            case "discoveryComposite":
              return (
                <Extenal>
                  <div className="status-div">
                    <Tooltip ref={this.props.ref} title="Discovery Composite">
                      <Server ref={this.props.ref} className="feature-icon" />
                    </Tooltip>
                    {this.getStatus(
                      main[componentKey].status,
                      main[componentKey].description
                    )}
                  </div>
                  {this.getComponents(main[componentKey])}
                </Extenal>
              );
            case "rabbit":
              return this.getRabbitHealth(main[componentKey]);
            case "ping":
              return (
                <Extenal>
                  <div className="status-div">
                    <Tooltip ref={this.props.ref} title="Ping">
                      <Ping ref={this.props.ref} className="feature-icon" />
                    </Tooltip>
                    {this.getStatus(main[componentKey].status)}
                  </div>
                  {this.getComponents(main[componentKey])}
                </Extenal>
              );
            case "refreshScope":
              return (
                <Extenal>
                  <div className="status-div">
                    <Tooltip ref={this.props.ref} title="Refresh Scope">
                      <Scope ref={this.props.ref} className="feature-icon" />
                    </Tooltip>
                    {this.getStatus(main[componentKey].status)}
                  </div>
                  {this.getComponents(main[componentKey])}
                </Extenal>
              );
            case "components":
              return this.getComponents(main[componentKey]);
            default:
              break;
          }
          return "";
        })}
      </Extenal>
    );
  }
}
