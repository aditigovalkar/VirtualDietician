import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import ScrollToTop from "views/ScrollToTop/ScrollToTop.js"

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <ScrollToTop/>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Dietporium"
        // rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax filter image={require("assets/img/new.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Dietporium</h1> <br/> <h2>Your Health, Our Plan</h2>
              <h4>
                Let food be our medicine & medicine be our food.
              </h4>
              <br />
              {/* <Button
                color="danger"
                size="lg"
                href="https://www.youtube.com/watch?v=7tNPxY_ntEA&ab_channel=EmiwayBantai"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                Watch video
              </Button> */}
                        <Link to={"/login-page"} className={classes.link}>
            {/* <Button color="primary" size="lg" simple>
              View Login Page
            </Button> */}

            <Button
            style={{margin: '20px'}}
                color="primary"
                round
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >Log in</Button>
          </Link>
          <Link to={"/register-page"} className={classes.link}>
              <Button
                color="primary"
                round
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >Register</Button>
              </Link>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <TeamSection />
          <WorkSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
