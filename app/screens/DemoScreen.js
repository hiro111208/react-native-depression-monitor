import React from "react";
import {
  Image,
  StyleSheet
} from "react-native";

import Onboarding from 'react-native-onboarding-swiper';

//This is the demo screen where the user is taught how to interact with the app
function DemoScreen({ navigation, route }){

  const params= route.params

  //Navigate to either CategoryDrop or PatientDashboard 
  //depending on whether it is the user's first time using the app
  const navigate=()=>{
    if (params && params.user.categoryDropped == "NONE") {
      navigation.navigate("CategoryDrop", {user: params.user})
    }
    else{
      navigation.navigate("PatientDashboard")
    }
  }

  //Create the differnt pages for the demo
return(
  <Onboarding
    onDone= {()=>navigate()}
    onSkip= {()=>navigate()}

    imageContainerStyles={{height: "70%", paddingBottom:0, justifyContent: "center"}}
    titleStyles={{ padding:0, paddingTop:10}}
    subTitleStyles={{ paddingBottom:0, padding:0}}
    containerStyles={{bottom:60, justifyContent: "center", paddingTop:60}}
    pages={[
      {
        backgroundColor: '#fff',
        image: <Image resizeMode={'contain'} style={styles.image} source={require('../assets/demo/CategoryDropGif.gif')} />,
        title: 'Drop a category',
        subtitle: 'Select the category you are least interested in to be dropped from the therapy questions',
        imageContainerStyles:{padding:30},
      },
      {
        backgroundColor: '#fff',
        image: <Image resizeMode={'contain'} style={styles.image} source={require("../assets/demo/SchedulerGif.gif")} />,
        title: 'Schedule your therapy sessions',
        subtitle: 'Select a date and time for your therapy sessions to be reminded using notifications',
      },
      {
        backgroundColor: '#fff',
        image: <Image resizeMode={'contain'} style={styles.image} source={require('../assets/demo/TherapyScreenGif.gif')} />,
        title: 'Therapy session',
        subtitle: 'Read the scenarios and answer the questions. Click the text to speech button to read the scenario aloud.',
      },
      {
        backgroundColor: '#fff',
        image: <Image resizeMode={'contain'} style={styles.image} source={require('../assets/demo/PauseScreenGif.gif')} />,
        title: 'Take a break',
        subtitle: 'You can take a break in between your therapy questions by clicking the "Take a break" button at the top of your therapy screen.',
      },
      {
        backgroundColor: '#fff',
        image: <Image resizeMode={'contain'} style={styles.image} source={require('../assets/demo/PlantScreenGif.gif')} />,
        title: 'Water your plant and watch it grow!',
        subtitle: 'Water your plant with coins you have earned by logging your feelings and completing your therapy sessions. ',
      }
    ]}
  />
)}

export default DemoScreen;

const styles = StyleSheet.create({
  image:{
    width:"100%",
    height:"100%",
  }
})