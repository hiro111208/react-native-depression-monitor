import React, { Component, useState } from 'react'
import { ImageBackground, AppRegistry, ScrollView, View, StyleSheet, Text , Linking,Image} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import firebase from "../database/firebase";


const SupportRessources = ({ navigation, route }) => {
    return (
      <View ststyle={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.boxLarge}>
          <ImageBackground style={styles.boxLarge} source={require('./mat.png')}>
          <AntDesign name="leftcircleo" size={24} color="black" 
          onPress={() => navigation.goBack()}
          />
        <Text/>
        
        <Text style={styles.main}> Support Ressources </Text>
                <Text/>
        <Text/>
          <Text style={styles.bigWhite}> 𝘈𝘴𝘬𝘪𝘯𝘨 𝘧𝘰𝘳 𝘩𝘦𝘭𝘱 𝘥𝘰𝘦𝘴𝘯'𝘵 𝘮𝘢𝘬𝘦 𝘺𝘰𝘶 𝘸𝘦𝘢𝘬- 𝘪𝘵 𝘳𝘦𝘷𝘦𝘢𝘭𝘴 𝘴𝘵𝘳𝘦𝘯𝘨𝘵𝘩 𝘦𝘷𝘦𝘯 𝘸𝘩𝘦𝘯 𝘺𝘰𝘶 𝘥𝘰𝘯'𝘵 𝘧𝘦𝘦𝘭 𝘴𝘵𝘳𝘰𝘯𝘨 </Text> 


        <Text/>
        <Text/>
        <Text/>
        <Text/>
        <Text/>
        <Text style={styles.main} >Here is a list of agencies which offer support    and information:</Text>
        </ImageBackground>
        </View>
        

        <ScrollView horizontal>
          <View style={styles.boxSmall}>
           <Text style={styles.title} >NHS:</Text>
                <Text
            style={styles.hyperlinkStyle}
            onPress={() => {
              Linking.openURL('https://www.nhs.uk/service-search/mental-health/find-an-urgent-mental-health-helpline');
            }}>
            NHS Helplines website
            </Text>
            <Text>Local NHS urgent mental health helplines</Text>
                  <Image
        style={styles.tinyLogo}
        source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/NHS-Logo.svg/1024px-NHS-Logo.svg.png'}}
      />
          </View>
         
         
          <View style={styles.boxSmall}> 
        <Text  style={styles.title} >Bipolar UK:</Text>
        <Text
            style={styles.hyperlinkStyle}
            onPress={() => {
              Linking.openURL('www.bipolaruk.org');
            }}>
            www.bipolaruk.org
            </Text>
            <Text/>
        <Text> Supply a range of information leaflets, books and tapes. Network of self help groups for people with manic depression, relatives and friends. </Text>
          </View>
          
          
          <View style={styles.boxSmall}> 
 <Text  style={styles.title} >Calmzone:</Text>
        <Text
            style={styles.hyperlinkStyle}
            onPress={() => {
              Linking.openURL('www.thecalmzone.net');
            }}>
           www.thecalmzone.net
            </Text> 
            <Text/>
        <Text>Campaign Against Living Miserably. Help and support for young men aged 15-35 on issues which include depression and suicide.
</Text>
          </View>
          
          
          <View style={styles.boxSmall}> 
           <Text  style={styles.title} >Samaritans:</Text>
        <Text
            style={styles.hyperlinkStyle}
            onPress={() => {
              Linking.openURL('https://www.samaritans.org/how-we-can-help/schools/deal/deal-resources/dealing-feelings/what-is-depression/?gclid=Cj0KCQiAnKeCBhDPARIsAFDTLTIkkHjz1hc7XNw6RtOqswMgB1zpQlKHWeRA5uEqnai06Qw63RGoqQsaAlbJEALw_wcB');
            }}>
           Talk to a Samaritan
            </Text> 
        <Text></Text>
        <Text>Learn more about depression and how to detect it or contact a Samaritan to have a chat</Text>
          </View>
          
          
          <View style={styles.boxSmall}> 
          <Text  style={styles.title} >WLM:</Text>
          <Text>highburycounselling@wlm.org.uk</Text>
        <Text>WLM Highbury Counselling Centre offers counselling and sychotherapy service for adults, a space to speak with a trained professional.</Text>


          </View>

          
      </ScrollView>
        <View style={styles.boxLarge}>
         <Text style={styles.main}> The research for this project was done by: </Text>
         <Text/>
         <Text  style={styles.tit} >  -Jenny Yiend</Text>
         <Text  style={styles.tit} >  -Jong-Sun Lee</Text>
         <Text  style={styles.tit} >  -Sinem Tekes</Text>
         <Text  style={styles.tit} >  -Louise Atkins</Text>
         <Text  style={styles.tit} >  -Andrew Mathews</Text>
         <Text  style={styles.tit} >  -Manouk Vrinten</Text>
         <Text  style={styles.tit} >  -Christian Ferragamo</Text>
         <Text  style={styles.tit} >  -Sukhwinder Shergill</Text>

<Text/>
<Text/>
         <Text  style={styles.main} > In an academic paper entitled:</Text>
         <Text  style={styles.tit} >  Modifying Interpretation in a ClinicallyDepressed Sample Using ‘Cognitive BiasModification-Errors’: A Double BlindRandomised Controlled Trial</Text>
        </View>

      </ScrollView>
      </View>
    )
  }


const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  boxSmall: {
    width: 180,
    height: 180,
    marginBottom: 10,
    marginRight: 10,
    backgroundColor: 'skyblue',
  },
  boxLarge: {
    width: 380,
    height: 350,
    marginBottom: 10,
    marginRight: 10,
    backgroundColor: '#ffa351',
  },
  bigWhite: {
    margin: 15,
    fontSize: 25,
    fontWeight: 'bold',
    color:'white',
    fontFamily: 'sans-serif-condensed',

  },
  main:{
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
  },
    title: {
    color: 'white',
    fontSize: 20,
    textDecorationLine: 'underline',
  },
    hyperlinkStyle: {
    color: 'blue',
  },
  tinyLogo :{
    width: 160,
    height: 80,
    margin: 10,
  },

  logo :{
    width: 400,
    height: 100,
  },
  tit:{
   color: 'white',
    fontSize: 15, 
    margin: 2
  }

});

export default SupportRessources;