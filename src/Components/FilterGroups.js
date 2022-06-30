import React from "react";
import Select from "react-select";
import "../Styles/Filter.css";

class FilterGroups extends React.Component {
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
      { value: "channel", label: "Channel" },
      { value: "Common", label: "Common" },
    ];

    return (
      <div className="select-container" data-testid="filter-groups">
        <Select
          defaultValue="this.state.selected"
          onChange={this.handleChange}
          value={selectedOption}
          options={options}
          placeholder="Select Groups.."
          isMulti
          className="basic-multi-select-groups"
          classNamePrefix="select"
        />
      </div>
    );
  }
}

export default FilterGroups;
