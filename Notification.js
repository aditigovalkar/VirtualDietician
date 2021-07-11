import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
import Warning from "@material-ui/icons/Warning";
// core components
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Clearfix from "components/Clearfix/Clearfix.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/notificationsStyles.js";

const useStyles = makeStyles(styles);

export default function Notifications(props) {
  const classes = useStyles();
  return (
    <div className={classes.section} id="notifications">
      {/* <div className={classes.container}> */}
        {/* <div className={classes.title}>
          <h3>Notifications</h3>
        </div> */}
      {/* </div> */}
      <SnackbarContent
        message={
          <span>
            <b>SUCCESS ALERT:</b> Your request has been sent to our registered dietician.
          </span>
        }
        color="success"
        icon={Check}
      />
      <Clearfix />
    </div>
  );
}
