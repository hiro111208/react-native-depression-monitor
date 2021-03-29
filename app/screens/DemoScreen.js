import React from "react";
import {
  Image,
  StyleSheet
} from "react-native";

import Onboarding from 'react-native-onboarding-swiper';
import colors from "../config/colors";

function DemoScreen({ navigation, route }){

  const params= route.params

  const navigate=()=>{
    if (params && params.user.categoryDropped == "NONE") {
      navigation.navigate("CategoryDrop", {user: user})
    }
    else{
      navigation.navigate("PatientDashboard")
    }
  }

return(
  <Onboarding
    onDone= {()=>navigate()}
    onSkip= {()=>navigate()}

    imageContainerStyles={{height: "70%", paddingBottom:0, justifyContent: "center"}}
    titleStyles={{ padding:0, paddingTop:20}}
    subTitleStyles={{ paddingBottom:0, padding:0}}
    containerStyles={{bottom:"10%", justifyContent: "center"}}
    pages={[
      {
        backgroundColor: '#fff',
        image: <Image resizeMode={'contain'} style={styles.image, {height:"90%"}} source={require('../assets/demo/CategoryDrop.png')} />,
        title: 'Drop a category',
        subtitle: 'Select the category you are least interested in to be dropped from the therapy questions',
        imageContainerStyles:{padding:30},
      },
      {
        backgroundColor: '#fff',
        image: <Image resizeMode={'contain'} style={styles.image} source={require('../assets/demo/Scheduler.png')} />,
        title: 'Schedule your therapy sessions',
        subtitle: 'Select a date and time for your therapy sessions to be reminded using notifications',
      },
      {
        backgroundColor: '#fff',
        image: <Image resizeMode={'contain'} style={styles.image} source={require('../assets/demo/TherapyScreen.png')} />,
        title: 'Therapy session',
        subtitle: 'Read the scenarios and answer the questions. Click the text to speech button to read the scenario aloud.',
      },
      {
        backgroundColor: '#fff',
        image: <Image resizeMode={'contain'} style={styles.image} source={require('../assets/demo/PauseScreen.png')} />,
        title: 'Take a break',
        subtitle: 'You can take a break in between your therapy questions by clicking the "Take a break" button at the top of your therapy screen.',
      },
      {
        backgroundColor: '#fff',
        image: <Image resizeMode={'contain'} style={styles.image} source={require('../assets/demo/PlantScreen.png')} />,
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
    //resizeMode: 'contain',
  }
})