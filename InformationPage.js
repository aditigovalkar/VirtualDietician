import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";


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
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Badge from "components/Badge/Badge.js";

// react components for routing our app without refresh
import { Link, withRouter } from "react-router-dom";

import ScrollToTop from "views/ScrollToTop/ScrollToTop.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/new.jpg";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Notification from "views/InformationPage/Notification.js";

//For server integration
import Data from "components/Data/demo.json";
import DietChart from "components/Data/dietlist.json";
import axios from "axios";

const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

function InformationPage(props) {
  // const [data, setData] = useState(Data)
  const [newGenderValue, setNewGenderValue] = useState("Select Gender");
  const [newWorkoutValue, setNewWorkoutValue] = useState("Select");
  const [newAllergyValue, setNewAllergyValue] = useState("Select");
  const [Height, setHeight] = useState();
  const [Weight, setWeight] = useState();
  const [Age, setAge] = useState();
  const [Bmi, setBmi] = useState();
  const [bmiModal, setBmiModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [notification, setNotification] = useState(false);
  const [Status, setStatus] = useState("");
  const [BMR, setBMR] = useState();
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [patientInfo, setPatientInfo] = useState(Data);
  const [dietChart, setDietChart] = useState(DietChart);

  let history = useHistory();

  const saveInfo = () => {
    {
      let newInfo = {
        name: props.location.state.detail.name,
        gender: newGenderValue,
        height: Height,
        weight: Weight,
        Age: Age,
        workoutLevel: newWorkoutValue,
        allergy: newAllergyValue,
        bmi: Bmi,
        bmr: BMR,
        status: Status,
        isDietChartCreated: false,
      };

      const newPatientInfo = [...patientInfo, newInfo];
      console.log("newPatientInfo,,,,,,,,,", newPatientInfo);
      setPatientInfo(newPatientInfo);
      saveJson(newPatientInfo);
    }
  };
  //add info to json file

  const saveJson = (newPatientInformation) => {
    const url = "http://localhost:5000/addInformation";
    axios.post(url, newPatientInformation).then((response) => {
      console.log(response);
    });
    history.push({
      pathname: "/patient-landing-page",
      state: { detail: props.location.state.detail },
    });
  };

  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const calculateBmi = () => {
    if (Weight && Height && Height != 0 && Weight != 0) {
      let bmi = Weight / (0.0001 * Height * Height);
      setBmi(bmi);
      if (bmi < 18.5) {
        setStatus("UNDERWEIGHT");
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        console.log("BMI", bmi);
        setStatus("NORMAL");
      } else if (bmi >= 25 && bmi <= 29.9) {
        setStatus("OVERWEIGHT");
      } else if (bmi >= 30) {
        setStatus("OBESE");
      }
    }
  };

  const calculateBmr = () => {
    if (newGenderValue) {
      if (newGenderValue === "Male") {
        let bmr = 88.632 + 13.397 * Weight + 5.799 * Height - 5.677 * Age;

        if (newWorkoutValue === "Sedentary") {
          bmr = bmr * 1.2;
          setBMR(bmr);
        } else if (newWorkoutValue === "Lightly active") {
          bmr = bmr * 1.2;
          setBMR(bmr);
        } else if (newWorkoutValue === "Moderately active") {
          bmr = bmr * 1.2;
          setBMR(bmr);
        } else if (newWorkoutValue === "Very active") {
          bmr = bmr * 1.2;
          setBMR(bmr);
        } else if (newWorkoutValue === "Extra active") {
          bmr = bmr * 1.2;
          setBMR(bmr);
        }
      } else if (newGenderValue === "Female") {
        let bmr = 447.593 + 9.247 * Weight + 3.098 * Height - 4.33 * Age;

        if (newWorkoutValue === "Sedentary") {
          bmr = bmr * 1.2;
          setBMR(bmr);
        } else if (newWorkoutValue === "Lightly active") {
          bmr = bmr * 1.2;
          setBMR(bmr);
        } else if (newWorkoutValue === "Moderately active") {
          bmr = bmr * 1.2;
          setBMR(bmr);
        } else if (newWorkoutValue === "Very active") {
          bmr = bmr * 1.2;
          setBMR(bmr);
        } else if (newWorkoutValue === "Extra active") {
          bmr = bmr * 1.2;
          setBMR(bmr);
        }
      }
    }
  };
  const onChangeHeight = (e) => {
    const newHeight = e.target.value;
    setHeight(newHeight);
    console.log("....ht", newHeight);
  };

  const onChangeWeight = (e) => {
    const newWeight = e.target.value;
    setWeight(newWeight);
    console.log("....wt", newWeight);
  };

  const onGenderClick = (e) => {
    setNewGenderValue(e);
    console.log("newGenderValue =", { newGenderValue });
  };
  const onChangeAge = (e) => {
    const newAge = e.target.value;
    setAge(newAge);
    console.log("newAge = ", { newAge });
  };

  const onWorkoutClick = (e) => {
    setNewWorkoutValue(e);
    console.log("newWorkoutValue =", { newWorkoutValue });
  };

  const onChangeAllergy = (e) => {
    const newAllergy = e.target.value;
    setNewAllergyValue(newAllergy);
  };

  const onSubmitHandler = (e) => {
    console.log(e);
    calculateBmr();
    calculateBmi();
    //calculateStatus();

    console.log("bmiiiiiiiiiiiiiiiiiiiiii", Bmi);
    console.log("BMrrrrrrrr andStatus", BMR, Status);
    setBmiModal(true);
  };

  const onInfoButtonHandler = (e) => {
    setInfoModal(true);
  };

  const onNotificationHandler = () => {
    setNotification(!notification);
    console.log("bmiiiiiiiiiiiiiiiiiiiiii", Bmi);
    console.log("BMrrrrrrrr andStatus", BMR, Status);
    if (
      Bmi &&
      BMR &&
      Bmi != (undefined || null) &&
      BMR != (undefined || null) &&
      Status != ""
    ) {
      saveInfo();
    }
  };

  const onCloseBmiModel = () => {
    setBmiModal(false);
    setNotification(!notification);
  };

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
            Hello <b />
            {props.location.state.detail.name}
          </p>
          {dietChart.map((patientDietChart) => {
            if (patientDietChart.name === props.location.state.detail.name) {
              return (
                <div>
                  <p>Please find your already prepared diet plan:</p>
                  <br />

                  <p>
                    <b />
                    Breakfast:
                    {patientDietChart.Breakfast.map((breakfastMeal) => {
                      return (
                        <p>
                          {breakfastMeal}
                          <br />
                        </p>
                      );
                    })}
                  </p>
                  <p>
                    <b />
                    Lunch:
                    {patientDietChart.Lunch.map((lunchMeal) => {
                      return (
                        <p>
                          {lunchMeal}
                          <br />
                        </p>
                      );
                    })}
                  </p>
                  <p>
                    <b />
                    Dinner:
                    {patientDietChart.Dinner.map((dinnerMeal) => {
                      return (
                        <p>
                          {dinnerMeal}
                          <br />
                        </p>
                      );
                    })}
                  </p>
                </div>
              );
            } else {
              return null;
            }
          })}
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>We Want to know you</h4>
                    {/* <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={"fab fa-twitter"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={"fab fa-google-plus-g"} />
                      </Button>
                    </div> */}
                  </CardHeader>
                  <p className={classes.divider}>Your first step to be fit.</p>
                  <CardBody>
                    <CustomInput
                      labelText="Height (in cm)"
                      id="height"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => onChangeHeight(e),
                        type: "number",
                      }}
                    />
                    <CustomInput
                      labelText="Weight (in Kg)"
                      id="weight"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => onChangeWeight(e),
                        type: "number",
                      }}
                    />
                    <CustomInput
                      labelText="Age"
                      id="age"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => onChangeAge(e),
                        type: "number",
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "inline-flex", width: "40%" }}>
                        {" "}
                        <CustomInput
                          labelText="Gender"
                          id="gender"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "text",
                            disabled: true,
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: "inline-flex",
                          padding: "15px 0px 0px 0px",
                        }}
                      >
                        <CustomDropdown
                          buttonText={newGenderValue}
                          // dropdownHeader="Dropdown Header"

                          buttonProps={{
                            className: classes.navLink,
                            color: "transparent",
                          }}
                          dropdownList={["Male", "Female"]}
                          onClick={(e) => onGenderClick(e)}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "inline-flex", width: "40%" }}>
                        <CustomInput
                          labelText="Workout level"
                          id="workout"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "text",
                            disabled: true,
                            autoComplete: "off",
                          }}
                        />
                      </div>
                      <div style={{ display: "inline-flex" }}>
                        <Button
                          simple
                          color="primary"
                          size="sm"
                          onClick={(e) => onInfoButtonHandler(e)}
                        >
                          <Badge color="info">i</Badge>
                        </Button>{" "}
                        <Dialog
                          classes={{
                            root: classes.center,
                            paper: classes.modal,
                          }}
                          open={infoModal}
                          TransitionComponent={Transition}
                          keepMounted
                          // disableBackdropClick
                          onClose={() => setInfoModal(false)}
                          aria-labelledby="classic-modal-slide-title"
                          aria-describedby="classic-modal-slide-description"
                        >
                          <DialogTitle
                            id="classic-modal-slide-title"
                            disableTypography
                            className={classes.modalHeader}
                          >
                            <IconButton
                              className={classes.modalCloseButton}
                              key="close"
                              aria-label="Close"
                              color="inherit"
                              onClick={() => setInfoModal(false)}
                            >
                              <Close className={classes.modalClose} />
                            </IconButton>
                            <h4 className={classes.modalTitle}>Information</h4>
                          </DialogTitle>
                          <DialogContent
                            id="classic-modal-slide-description"
                            className={classes.modalBody}
                          >
                            <h4>
                              <b>Sedentary : Little or No Exercise</b>{" "}
                              <mark>"DeskJob"</mark>
                              <br />
                              <b>Lightly active : Light Exercise</b>{" "}
                              <mark>"Sports 1-3 days/week"</mark>
                              <br />
                              <b>Moderately active : Moderate Exercise</b>{" "}
                              <mark>"Sports 6-7 days/week"</mark>
                              <br />
                              <b>Very active : Hard Exercise every day</b>{" "}
                              <mark>"1-2 Hrs a day"</mark>
                              <br />
                              <b>
                                Extra active : Hard Exercise twice or more per
                                day{" "}
                              </b>
                              <mark>
                                " Training for marathon, or triathlon, etc."
                              </mark>
                              <br />
                            </h4>
                          </DialogContent>
                          <DialogActions className={classes.modalFooter}>
                            <Button
                              onClick={() => setInfoModal(false)}
                              color="danger"
                              simple
                            >
                              Close
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                      {/* <Badge color="info" >i</Badge> */}

                      <div
                        style={{
                          display: "inline-flex",
                          padding: "15px 0px 0px 0px",
                        }}
                      >
                        <CustomDropdown
                          buttonText={newWorkoutValue}
                          // dropdownHeader="Dropdown Header"

                          buttonProps={{
                            className: classes.navLink,
                            color: "transparent",
                          }}
                          dropdownList={[
                            "Sedentary",
                            "Lightly active",
                            "Moderately active",
                            "Very active",
                            "Extra active",
                          ]}
                          onClick={(e) => onWorkoutClick(e)}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <CustomInput
                        labelText="Allergy (If Any)"
                        id="allergy"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: (e) => onChangeAllergy(e),
                          type: "text",
                        }}
                      />
                    </div>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      simple
                      color="primary"
                      size="lg"
                      onClick={(e) => onSubmitHandler(e)}
                    >
                      Submit
                    </Button>
                    <Link to={"/login-page"} className={classes.link}>
                          <Button
                            onClick={() => setBmiModal(false)}
                            color="danger"
                            simple
                          >
                            Log Out
                          </Button>
                        </Link>
                    <Dialog
                      classes={{
                        root: classes.center,
                        paper: classes.modal,
                      }}
                      style={{
                        backgroundImage: "url(" + image + ")",
                        backgroundSize: "cover",
                        backgroundPosition: "top center",
                      }}
                      open={bmiModal}
                      TransitionComponent={Transition}
                      keepMounted
                      disableBackdropClick
                      onClose={() => setBmiModal(false)}
                      aria-labelledby="classic-modal-slide-title"
                      aria-describedby="classic-modal-slide-description"
                    >
                      <DialogTitle
                        id="classic-modal-slide-title"
                        disableTypography
                        className={classes.modalHeader}
                      >
                        <IconButton
                          className={classes.modalCloseButton}
                          key="close"
                          aria-label="Close"
                          color="inherit"
                          onClick={() => onCloseBmiModel()}
                        >
                          <Close className={classes.modalClose} />
                        </IconButton>
                        {notification && <Notification />}
                        <h4 className={classes.modalTitle}>
                          Here is what we have found out about You!!
                        </h4>
                      </DialogTitle>
                      <DialogContent
                        id="classic-modal-slide-description"
                        className={classes.modalBody}
                      >
                        <p>
                          <b>B.M.I :</b> {Bmi} Kg/m<sup>2</sup> <br />
                          <b>Weight Status :</b>
                          {Status}
                          <br />
                          <b>Calorie Required = </b> {BMR} Cal/day
                        </p>
                      </DialogContent>
                      <DialogActions className={classes.modalFooter}>
                        <Button
                          color="info"
                          simple
                          onClick={onNotificationHandler}
                        >
                          Click here for your personalised diet plan
                        </Button>
                        <Link to={"/login-page"} className={classes.link}>
                          <Button
                            onClick={() => setBmiModal(false)}
                            color="danger"
                            simple
                          >
                            Log Out
                          </Button>
                        </Link>
                      </DialogActions>
                    </Dialog>
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

export default withRouter(InformationPage);
