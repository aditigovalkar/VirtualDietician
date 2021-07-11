import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

// react components for routing our app without refresh
import { Link, withRouter } from "react-router-dom";

import ScrollToTop from "views/ScrollToTop/ScrollToTop.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/new.jpg";
import Slide from "@material-ui/core/Slide";
import Data from "components/Data/demo.json";
import DietChartList from "components/Data/dietlist.json";

const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";
function DoctorLandingPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <ScrollToTop />
      <Header
        absolute
        color="transparent"
        brand="Dietporium"
        // rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <p style={{ color: "#ffffff" }}>
            Hi Dr. <b />
            {props.location.state.detail.name}
          </p>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card
                className={classes[cardAnimaton]}
                style={{
                  padding: "20px",
                }}
              >
                <CardHeader color="warning" className={classes.cardHeader}>
                  <h4>Hello Dr.</h4> <h2>{props.location.state.detail.name}</h2>
                </CardHeader>
                <CardBody>
                  <p> Let's go to the Pending Diet Charts</p>
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  <Link
                    to={{
                      pathname: "/doctor-page",
                      state: { detail: props.location.state.detail },
                    }}
                    className={classes.link}
                  >
                    <Button simple color="primary" size="lg">
                      Go to DIET CHART PAGE
                    </Button>
                  </Link>
                  <Link
                    to={{
                      pathname: "/login-page",
                    }}
                    className={classes.link}
                  >
                    <Button simple color="primary" size="lg">
                      Log Out
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </GridItem>
            ]
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}

export default withRouter(DoctorLandingPage);
