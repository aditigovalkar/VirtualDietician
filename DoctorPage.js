import React, { useState, useEffect, createContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
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
import Notification from "views/InformationPage/Notification.js";
import Data from "components/Data/demo.json";
import DietChartList from "components/Data/dietlist.json";

const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

let cards;

Transition.displayName = "Transition";
function DoctorPage(props) {
  const [data, setData] = useState(Data);
  const [dietChartLists, setDietChartList] = useState(DietChartList);
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const nameList = dietChartLists.map((dietChartlist) => {
    // setName(...name,dietChartlist.name)
    return dietChartlist.name;
  });
  console.log(nameList);

  const classes = useStyles();
  const { ...rest } = props;

  const onSubmitHandler = () => {
    console.log("clicked");
  };

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
              {data.map((personDetail, index) => {
                if (!personDetail.isDietChartCreated) {
                  cards = (
                    <Card
                      className={classes[cardAnimaton]}
                      style={{
                        padding: "20px",
                      }}
                    >
                      <CardHeader
                        color="warning"
                        className={classes.cardHeader}
                      >
                        <h4>Pending Diet Chart for</h4>{" "}
                        <h2>{personDetail.name}</h2>
                      </CardHeader>
                      <CardBody>
                        <table
                          cellPadding={5}
                          key={index}
                          style={{
                            paddingLeft: "32px",
                          }}
                        >
                          <thead>
                            <tr>
                              <td colSpan={2}>Patient Details</td>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.keys(personDetail).map(
                              (keyName, keyValue) => {
                                return (
                                  <tr key={keyValue}>
                                    <td>
                                      {keyName
                                        .toString()
                                        .charAt(0)
                                        .toUpperCase() +
                                        keyName.toString().slice(1)}
                                    </td>
                                    <td>
                                      {personDetail[keyName]
                                        .toString()
                                        .charAt(0)
                                        .toUpperCase() +
                                        personDetail[keyName]
                                          .toString()
                                          .slice(1)}
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </table>
                      </CardBody>
                      <CardFooter className={classes.cardFooter}>
                        <Link
                          to={{
                            pathname: "/dietchart-page",
                            state: {
                              detail: personDetail.name,
                              doctorDetail: props.location.state.detail,
                              completeDetail: personDetail,
                            },
                          }}
                          className={classes.link}
                        >
                          <Button
                            simple
                            color="primary"
                            size="lg"
                            onClick={(e) => onSubmitHandler(e)}
                          >
                            Create Diet Chart
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  );
                } else if (personDetail.isDietChartCreated) {
                  cards = (
                    <Card
                      className={classes[cardAnimaton]}
                      style={{
                        padding: "20px",
                      }}
                    >
                      <CardHeader
                        color="warning"
                        className={classes.cardHeader}
                      >
                        <h4>Diet Chart already created for</h4>{" "}
                        <h2>{personDetail.name}</h2>
                      </CardHeader>
                      <CardBody>
                        <p>
                          Sit back and relax, You have already created and sent
                          a Diet Chart for {personDetail.name}
                        </p>
                      </CardBody>
                      <CardFooter className={classes.cardFooter}>
                      <Link
                          to={{
                            pathname: "/doctor-landing-page",
                            state: {  
                              detail: props.location.state.detail,  
                            },
                          }}
                          className={classes.link}
                        >
                          <Button
                            simple
                            color="primary"
                            size="lg"
                          >
                            Home
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  );
                }
                return cards;
              })}
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}

export default withRouter(DoctorPage);
