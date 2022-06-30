import React from "react";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import HealthCheckStatus from "../Components/HealthCheckStatus.js";

const MyAccordion = ({ app }) => {
  const AccordionSummary = withStyles({
    root: {
      backgroundColor: "#f1f1f1",
      minHeight: 56,
      "&$expanded": {
        minHeight: 56,
      },
    },
    expanded: {},
  })(MuiAccordionSummary);

  const AccordionDetails = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
      display: "flex",
      justifyContent: "space-evenly",
      border: "1px solid #f1f1f1 ",
    },
    expanded: {},
  }))(MuiAccordionDetails);

  const Accordion = withStyles({
    MuiAccordion: {
      border: "1px solid rgba(0, 0, 0, .03)",
      borderTop: "1px solid rgba(0, 0, 0, .10)",
      boxShadow: "none",
      paddingTop: "2px",
      "&:before": {
        display: "none",
      },
      "&$expanded": {
        marginTop: "1px",
      },
      expanded: {},
    },
  })(MuiAccordion);

  return (
    <Accordion expanded square key={app.title} data-testid="accordion">
      <AccordionSummary aria-controls={`${app.title}-summary`}>
        <Typography> {app.title} </Typography>
      </AccordionSummary>
      <AccordionDetails key={`${app.title}-details`} className="accordion-D">
        <HealthCheckStatus content={app} />
      </AccordionDetails>
    </Accordion>
  );
};

export default MyAccordion;
