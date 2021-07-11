import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import UpdateIcon from '@material-ui/icons/Update';
import StorageSharpIcon from '@material-ui/icons/StorageSharp';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Let{"'"}s talk about Dietporium</h2>
          <h5 className={classes.description}>
            Dietporium is a one stop solution to all your diet problems and your fitness related issues. It connects you and the dietician directly without anyone to interrupt in the middle. A doctor cancome into the picture in case of any expert advice. We at Dietporium want you to be fit.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Large Database"
              description="A large food database, consisting conventional and easy available, healthy food options creating a healthy balanced diet for every user."
              icon={StorageSharpIcon}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Verified Dieticians"
              description="We provide you with the opportunity to connect with verified and internationally acclaimed dieticians as well as doctors with just a click."
              icon={VerifiedUser}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Live Health Updates"
              description="We provide you with updates regarding your BMI and diet chart depending on the inputs you provide to us with our app."
              icon={UpdateIcon}
              iconColor="danger"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
