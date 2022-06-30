import React from "react";
import Select from "react-select";
import "../Styles/Filter.css";

class FilterStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: [],
    };
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
    this.props.callFromDashboard(selectedOption);
  };

  render() {
    const { selectedOption } = this.state;
    const options = [
      { value: "UP", label: "Up" },
      { value: "DOWN", label: "Down" },
      { value: "ERROR", label: "Error" },
    ];

    return (
      <div className="select-container" data-testid="filter-status">
        <Select
          defaultValue="this.state.selected"
          onChange={this.handleChange}
          value={selectedOption}
          options={options}
          isMulti
          placeholder="Select Status.."
          className="basic-multi-select-status"
          classNamePrefix="select"
        />
      </div>
    );
  }
}

export default FilterStatus;
