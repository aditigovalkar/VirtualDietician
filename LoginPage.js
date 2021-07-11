import React, { useState, createContext } from "react";
import { useHistory } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
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
import CustomInput from "components/CustomInput/CustomInput.js";
import ScrollToTop from "views/ScrollToTop/ScrollToTop.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/new.jpg";
import Data from "components/Data/user.json";
import LoginErrorNotifications from "views/LoginPage/LoginErrorNotification";

const useStyles = makeStyles(styles);

const ErrorBool = createContext();

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState(Data);
  const [loginErrorNotifications, setLoginErrorNotifications] = useState(false);

  let history = useHistory();

  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const onLoginHandler = (e) => {
    e.preventDefault();

    data.map((person) => {
      if (
        person.email === userEmail &&
        person.password === userPassword &&
        person.occupation.toLowerCase() === "patient"
      ) {
        setLoginErrorNotifications(false);
        history.push({
          pathname: "/patient-landing-page",
          state: { detail: person },
        });
      } else if (
        person.email === userEmail &&
        person.password === userPassword &&
        person.occupation.toLowerCase() === "doctor"
      ) {
        setLoginErrorNotifications(false);
        history.push({
          pathname: "/doctor-landing-page",
          state: { detail: person },
        });
      } else {
        setError(true);
        console.log(error);
        console.log("open notification");
        setLoginErrorNotifications(!loginErrorNotifications);
      }
    });
  };

  const onChangeEmail = (e) => {
    const newUserEmail = e.target.value;
    setUserEmail(newUserEmail);
  };

  const onChangePassword = (e) => {
    const newUserPassword = e.target.value;
    setUserPassword(newUserPassword);
  };

  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <ScrollToTop />
      <Header absolute color="transparent" brand="Dietporium" {...rest} />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <ErrorBool.Provider value={loginErrorNotifications}>
            {loginErrorNotifications && <LoginErrorNotifications />}
          </ErrorBool.Provider>

          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Login</h4>
                   
                  </CardHeader>
                  {/* <p className={classes.divider}>Or Be Classical</p> */}
                  <CardBody>
                    <CustomInput
                      labelText="Registered Email ID"
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => onChangeEmail(e),
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => onChangePassword(e),
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    {
                      <Button
                        simple
                        color="primary"
                        size="lg"
                        onClick={(e) => onLoginHandler(e)}
                      >
                        Get Started
                      </Button>
                    }
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>

          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Have not Registered with us yet ??</h4>
                  </CardHeader>
                  <CardFooter className={classes.cardFooter}>
                    <Link to={"/register-page"} className={classes.link}>
                      <Button simple color="primary" size="lg">
                        REGISTER
                      </Button>
                    </Link>
                    <Link to={"/landing-page"} className={classes.link}>
                          <Button
                            //onClick={() => setBmiModal(false)}
                            color="danger"
                            simple
                          >
                            Home
                          </Button>
                        </Link>
                    
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}

export { ErrorBool };
