import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import AddIcCallIcon from "@material-ui/icons/AddIcCall";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
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

// react components for routing our app without refresh
import ScrollToTop from "views/ScrollToTop/ScrollToTop.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import image from "assets/img/new.jpg";

//For server integration
import Data from "components/Data/user.json";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
const useStyles = makeStyles(styles);

//export default
const RegisterPage = (props) => {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [User, setUser] = useState(Data);

  let history = useHistory();

  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const saveUser = () => {
    let newUser = {
      name: name,
      occupation: occupation,
      mobile: mobile,
      email: email,
      password: password,
    };

    const newUserData = [...User, newUser];
    setUser(newUserData);
    saveJson(newUserData);
  };

  const saveJson = (user) => {
    const url = "http://localhost:5000/addUser";
    axios.post(url, user).then((response) => {
      console.log(response);
    });
  };

  const onRegisterHandler = (e) => {
    e.preventDefault();
    saveUser();
    history.push("/login-page");
  };

  const onChangeName = (e) => {
    const newName = e.target.value;
    setName(newName);
  };

  const onChangeOccupation = (e) => {
    const newOccupation = e.target.value;
    setOccupation(newOccupation);
  };

  const onChangeMobile = (e) => {
    const newMobile = e.target.value;
    setMobile(newMobile);
  };

  const onChangeEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };

  const onChangePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
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
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Register</h4>
                  </CardHeader>
                  <p className={classes.divider}>Your first step to be fit.</p>
                  <CardBody>
                    <CustomInput
                      labelText="Full Name"
                      id="name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => onChangeName(e),
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Patient/Doctor"
                      id="second"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => onChangeOccupation(e),
                        type: "text",
                      }}
                    />
                    <CustomInput
                      labelText="Mobile Number"
                      id="mobile"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => onChangeMobile(e),
                        type: "number",
                        endAdornment: (
                          <InputAdornment position="end">
                            <AddIcCallIcon
                              className={classes.inputIconsColor}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Email ID"
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
                    <Button
                      simple
                      color="primary"
                      size="lg"
                      type="submit"
                      onClick={(e) => onRegisterHandler(e)}
                    >
                      Register me
                    </Button>
                    <Link to={"/landing-page"} className={classes.link}>
                          <Button
                            
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
};
export default RegisterPage;