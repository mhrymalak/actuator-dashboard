import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import '../Styles/Grid.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flexWrap: 'initial',
    justifyContent: 'space-between',
    color: 'none'
  },
  grid: {
    marginRight: theme.spacing(2),
  },
  paper: {
    border: '2px solid #DDEBF7',
    textAlign: 'center',
    marginBottom: theme.spacing(2),

  }
}));


export default function GridInfo({ appsResults, environments }) {
  const classes = useStyles();

  function Envlayout() {
    let layout = { title: "Application(s)" }

    Object.keys(environments).map((env) =>
      layout[environments[env]] = environments[env].toUpperCase()
    )
    return (
      <React.Fragment>
        {
          Object.keys(layout).map((appEnv) => {
            let paperClass = `${classes.paper} titleName`
            let gridClass = Object.keys(appsResults).length === 0 ? `${classes.grid} ` : ""

            appEnv === 'title' ? gridClass += 'appGrid ' : gridClass += 'envGrid '

            return (
              <Grid item className={gridClass}>
                <Paper className={paperClass}>{layout[appEnv]}</Paper>
              </Grid>
            )
          })
        }
      </React.Fragment>
    )
  }
  function Highlights(prod1, prod2, appEnv) {
    const NA = "N/A";
    let visual = {
      grid: `envGrid `,
      paper: `${classes.paper} `,
    }
    let pc1 = prod1?.ApplicationDetails?.version !== undefined ? prod1.ApplicationDetails.version.split('.') : NA
    let s3b = prod2?.ApplicationDetails?.version !== undefined ? prod2.ApplicationDetails.version.split('.') : NA
    let env = appEnv?.ApplicationDetails?.version !== undefined ? appEnv.ApplicationDetails.version.split('.') : NA
    if (s3b !== NA && pc1 !== NA && env !== NA) {
      var diference = CompareVersions(s3b, pc1)
      if (diference === 1) {
        diference = CompareVersions(s3b, env)
      }
      else {
        diference = CompareVersions(pc1, env)
      }
      if (diference === 1) {
        visual.paper += 'dangerousVersion';
      }
      else if (diference === -1) {
        visual.paper += 'warningVersion';
      }
    }

    return visual
  }

  function CompareVersions(v1, v2) {
    var result = 0;

    for (var i = 0; i < v1.length; ++i) {
      v1[i] = parseInt(v1[i]);
      v2[i] = parseInt(v2[i]);

      if (v1[i] === v2[i]) {
        continue;
      }
      else if (v1[i] > v2[i]) {
        result = 1;
      }
      else {
        result = -1;
      }
    }
    return result;
  }
  function CreateRow(app) {
    return (
      <React.Fragment>
        {
          Object.keys(app).map((appEnv) => {
            let paperContent = ""
            let visual = Highlights(app.pc1, app.s3b, app[appEnv])
            if (appEnv === 'title') {
              app.title.trim() !== "" ? paperContent = app[appEnv] : paperContent = "invalid title"
              visual.grid = 'appGrid '
              visual.paper += 'appName '
            }
            else if (Object.keys(app[appEnv]).length === 0) {
              paperContent = "JSON Empty";
            }
            else if (app[appEnv] === undefined || app[appEnv].error || app[appEnv].ApplicationDetails?.version === undefined) {
              paperContent = "Not Found";
            }
            else {
              paperContent = app[appEnv].ApplicationDetails.version
            }
            return (
              <Grid item className={visual.grid}>
                <Paper className={visual.paper}>{paperContent}</Paper>
              </Grid>)
          })}
      </React.Fragment>)
  }
  return (
    <div className={`${classes.root}`}>
      <Grid container>
        <Grid container className={`${classes.root} head`} data-testid="grid" >
          {Envlayout()}
        </Grid>

        {Object.keys(appsResults).map((app) => {
          if (app.toLowerCase().includes('messageBridge'.toLowerCase()))
            return "";
          let gridClass = `${classes.root} `;
          return <>
            <br />
            <br />
            <Grid container className={gridClass}>
              {CreateRow(appsResults[app])}
            </Grid>
          </>
        })
        }
      </Grid>
    </div>
  )

}