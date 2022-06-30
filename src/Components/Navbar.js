import React from "react";
import ButtonOption from "./ButtonOption.js";
import "../Styles/navbar.css";

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }
  handleClick = (event) => {
    var value = event.target;
    this.props.loadRoute(value.innerHTML);
    this.setState({ anchorEl: event.currentTarget });
  };
  render() {
    var active = this.state.active;
    var isLoading = this.props.isLoading;
    return (
      <div
        className={active ? "menu-item-active navbar" : "navbar menu-item"}
        data-testid="navbar"
      >
        <p>
          Actuator Dashboard -{"\t"}
          <ButtonOption
            buttonType="NavbarButton"
            isLoading={isLoading}
            value="Health"
            variant="outlined"
            handleClick={this.handleClick}
          />
          {"\t"}
          <ButtonOption
            buttonType="NavbarButton"
            isLoading={isLoading}
            value="Info"
            variant="outlined"
            handleClick={this.handleClick}
          />
        </p>
      </div>
    );
  }
}
