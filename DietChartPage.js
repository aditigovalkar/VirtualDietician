import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

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
import Notification from "views/DietChartPage/Notification.js";
import Data from "components/Data/data.json";
import PatientData from "components/Data/demo.json";
import DietList from "components/Data/dietlist.json";

//dialog
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";

//chcekbox
import classNames from "classnames";
// material-ui components
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
import stylesCheckbox from "assets/jss/material-kit-react/customCheckboxRadioSwitch.js";

// for backend
import axios from 'axios';

const useStyles = makeStyles(styles);
const useStylesChecbox = makeStyles(stylesCheckbox);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";


  function DietChartPage(props) {
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(Data);
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const [breakfastDiet, setBreakfastDiet] = useState([]);
  const [lunchDiet, setLunchDiet] = useState([]);
  const [dinnerDiet, setDinnerDiet] = useState([]);
  const [finalDietList, setFinalDietList] = useState(DietList);
  const [finalDietListModal, setfinalDietListModal] = useState(false);
  const [notification, setNotification] = useState(false);
  const [
    breakfastSaveButtonNotClicked,
    setBreakfastSaveButtonNotClicked,
  ] = useState(true);
  const [lunchSaveButtonNotClicked, setLunchSaveButtonNotClicked] = useState(
    true
  );
  const [dinnerSaveButtonNotClicked, setDinnerSaveButtonNotClicked] = useState(
    true
  );
  const [patientData, setPatientData] =useState(PatientData);

  let history = useHistory();

  const saveInfo=()=>{
    {
  
      let Dietlist = {
        "name": props.location.state.detail,
        "Breakfast": breakfastDiet,
        "Lunch": lunchDiet,
        "Dinner":dinnerDiet,
      }
  
      const newDietList = [...finalDietList, Dietlist];
      console.log("newPatientInfo,,,,,,,,,",newDietList);
      
      setFinalDietList(newDietList);
      saveJson(newDietList,patientData);
      
    }
  }
  //add info to json file
  
  const saveJson = (patientDietList,patientData)=>{
      const url1 = 'http://localhost:5000/addDietList';
      const url2 = 'http://localhost:5000/addInformation';
      axios.all([
        axios.post(url1,patientDietList).then(response=>{
          console.log(response);
          // if(response){
          //   CallThisFunction();
          // }
        }), 
        axios.post(url2,patientData).then(response=>{
          console.log(response);
          // if(response){
          //   CallThisFunction();
          // }
        })
      ])
      .then(axios.spread((data1, data2) => {
        // output of req.
        console.log('data1', data1, 'data2', data2)
      }));
    
      
      history.push({
        pathname: "/doctor-landing-page",
        state: { detail: props.location.state.doctorDetail },
      });
  }

  
  // const CallThisFunction=()=>{
  //   console.log("sdgfgdsgfdsgfgadjsgfdsgkfjgdsgfjdsghfgdsjfg");
  //   history.push({
  //     pathname: "/information-page",
  //   });
  // }

  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const classes = useStyles();
  const { ...rest } = props;


  const onSubmitHandler = () => {
    console.log("data", checked);
    const newObject = {...props.location.state.completeDetail, isDietChartCreated: true};
    const indexOfItemInArray = patientData.findIndex(data => data.name === props.location.state.detail);
    patientData.splice(indexOfItemInArray, 1, newObject);
console.log(patientData);
    // console.log(newJsonObject);
    setPatientData(patientData);
    setfinalDietListModal(true);
    setClicked(true);
  };

  const onCloseDietChartModal = () => {
    setfinalDietListModal(false);
    setNotification(!notification);
  };

  const onNotificationHandler = (e) => {
    setNotification(!notification);
    saveInfo();
    e.preventDefault();
  };

  //for checkbox
  const [checked, setChecked] = React.useState([]);
  const classesCheckbox = useStylesChecbox();
  const wrapperDiv = classNames(
    classesCheckbox.checkboxAndRadio,
    classesCheckbox.checkboxAndRadioHorizontal
  );
  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    console.log("gggg", currentIndex);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    console.log("aaaaaaaa", checked);
  };

  const onSaveHandler = (meal) => {
    let selectedDiet = checked;
    if (meal.name === "breakfast") {
      // let selectedDiet = checked;
      setBreakfastDiet(selectedDiet);
      setBreakfastSaveButtonNotClicked(false);
      setChecked([]);
    } else if (meal.name === "lunch") {
      setLunchDiet(selectedDiet);
      setLunchSaveButtonNotClicked(false);
      setChecked([]);
      console.log(lunchDiet);
    } else if (meal.name === "dinner") {
      setDinnerDiet(selectedDiet);
      setDinnerSaveButtonNotClicked(false);
      setChecked([]);
    }
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
        <p style={{color:"#ffffff"}}>Please set the diet chart for <b/>{props.location.state.detail}</p>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              {data.DietList.map((meal, index) => {
                return (
                  
                  <div>
                    {(index==0 && breakfastSaveButtonNotClicked)?
                    <span
                      style={{
                        background: "#ffffff",
                        color: "#ff0000",
                        display: "block",
                        width: "100%",
                      }}
                    >
                      <b />
                      <i />
                      "Please Save your Breakfast selection by clicking on save button"
                    </span>:null}
                    
                    {(index==1 && lunchSaveButtonNotClicked)?
                    <span
                      style={{
                        background: "#ffffff",
                        color: "#ff0000",
                        display: "block",
                        width: "100%",
                      }}
                    >
                      <b />
                      <i />
                      "Please Save your Lunch selection by clicking on save button"
                    </span>:null}
                    {(index==2 && dinnerSaveButtonNotClicked)?
                    <span
                      style={{
                        background: "#ffffff",
                        color: "#ff0000",
                        display: "block",
                        width: "100%",
                      }}
                    >
                      <b />
                      <i />
                      "Please Save your Dinner selection by clicking on save button"
                    </span>:null}

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
                        <h4>{meal.name.toUpperCase()}</h4>
                      </CardHeader>
                      <CardBody>
                        <div>
                          {meal.diet.map((values) => {
                            return (
                              <div className={wrapperDiv}>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      tabIndex={-1}
                                      onClick={() => handleToggle(values)}
                                      checkedIcon={
                                        <Check
                                          className={
                                            classesCheckbox.checkedIcon
                                          }
                                        />
                                      }
                                      icon={
                                        <Check
                                          className={
                                            classesCheckbox.uncheckedIcon
                                          }
                                        />
                                      }
                                      classes={{
                                        checked: classesCheckbox.checked,
                                      }}
                                    />
                                  }
                                  classes={{ label: classesCheckbox.label }}
                                  label={values}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </CardBody>
                      <CardFooter className={classes.cardFooter}>
                        <Button
                          simple
                          color="primary"
                          size="lg"
                          type="submit"
                          onClick={() => onSaveHandler(meal)}
                        >
                          Save
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                );
              })}

              <Button
                style={{ marginLeft: "121px" }}
                color="primary"
                round
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
                disabled={
                  breakfastSaveButtonNotClicked ||
                  lunchSaveButtonNotClicked ||
                  dinnerSaveButtonNotClicked
                }
                onClick={(e) => onSubmitHandler(e)}
              >
                Done
              </Button>
              {/* <Button
                style={{ margin: "20px" }}
                color="primary"
                round
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => onResetHandler(e)}
              >
                RESET
              </Button> */}
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
                open={finalDietListModal}
                TransitionComponent={Transition}
                keepMounted
                disableBackdropClick
                onClose={() => setfinalDietListModal(false)}
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
                    onClick={() => onCloseDietChartModal()}
                  >
                    <Close className={classes.modalClose} />
                  </IconButton>
                  {notification && <Notification />}
                  <h4 className={classes.modalTitle}>
                    Here is a personalised diet chart for Your Patient!!
                  </h4>
                </DialogTitle>
                <DialogContent
                  id="classic-modal-slide-description"
                  className={classes.modalBody}
                >
                  <h3>
                    <b />
                    Break Fast:{" "}
                  </h3>
                  {breakfastDiet.map((meal) => {
                    return (
                      <p>
                        {meal}
                        <br />
                      </p>
                    );
                  })}

                  <h3>
                    <b />
                    Lunch :{" "}
                  </h3>
                  {lunchDiet.map((meal) => {
                    return (
                      <p>
                        {meal}
                        <br />
                      </p>
                    );
                  })}
                  <h3>
                    <b />
                    Dinner :{" "}
                  </h3>
                  {dinnerDiet.map((meal) => {
                    return (
                      <p>
                        {meal}
                        <br />
                      </p>
                    );
                  })}
                </DialogContent>
                <DialogActions className={classes.modalFooter}>
                  <Button type="button" color="info" simple onClick={(e)=> onNotificationHandler(e)}>
                    Click here to send the diet plan
                  </Button>
                  <Link to={"/login-page"} className={classes.link}>
                    <Button
                      onClick={() => setfinalDietListModal(false)}
                      color="danger"
                      simple
                    >
                      Logout
                    </Button>
                  </Link>
                </DialogActions>
              </Dialog>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}

export default withRouter(DietChartPage);