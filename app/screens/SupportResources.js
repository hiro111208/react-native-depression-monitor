import React from "react";
import {
  ImageBackground,
  ScrollView,
  View,
  StyleSheet,
  Text,
  Linking,
  Image,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const SupportResources = ({ navigation }) => {
  return (
    <View style={[styles.container, styles.centering]}>
      <View
        style={[
          styles.center,
          styles.shadowEffect,
          styles.centering,
          { height: "95%", width: "100%" },
        ]}
      >
        <View
          style={[
            {
              height: "10%",
            },
            styles.centering,
          ]}
        >
          <Text style={[styles.fontStyle, { fontSize: 22 }]}>
            Support Resources
          </Text>
        </View>

        <ScrollView
          style={{
            height: "81%",
          }}
        >
          <Text
            style={[
              styles.centering,
              {
                paddingLeft: 30,
                paddingRight: 30,
                paddingTop: 20,
                fontSize: 17,
                fontStyle: "italic",
                color: "dimgray",
              },
            ]}
          >
            Asking for help doesn't make you weak - it reveals strength even
            when you don't feel strong.
          </Text>
          <View style={{ height: "7%" }}></View>
          <View
            style={{
              height: "6%",
              width: "60%",
              backgroundColor: "white",
              borderTopRightRadius: 20,
            }}
          >
            <Text style={[styles.fontStyle, { fontSize: 18, padding: 5 }]}>
              Support Agencies
            </Text>
          </View>

          <View style={[{ backgroundColor: "#ffeed2" }, styles.centering]}>
            <ScrollView horizontal>
              <View
                style={[
                  { margin: 5 },
                  styles.boxSmall,
                  styles.boxMargin,
                  styles.shadowEffect,
                ]}
              >
                <View style={[styles.titleArea, styles.centering]}>
                  <Text style={styles.title}>NHS</Text>
                </View>

                <View style={[styles.infoArea, styles.centering]}>
                  <Text
                    style={styles.hyperlinkStyle}
                    onPress={() => {
                      Linking.openURL(
                        "https://www.nhs.uk/service-search/mental-health/find-an-urgent-mental-health-helpline"
                      );
                    }}
                  >
                    NHS Helplines
                  </Text>
                  <Text />
                  <Text style={{ fontSize: 14 }}>
                    Local NHS Urgent Mental Health Helplines
                  </Text>
                </View>
              </View>

              <View
                style={[
                  { margin: 5 },
                  styles.boxSmall,
                  styles.boxMargin,
                  styles.shadowEffect,
                ]}
              >
                <View style={[styles.titleArea, styles.centering]}>
                  <Text style={styles.title}>Bipolar UK</Text>
                </View>
                <View style={[styles.infoArea, styles.centering]}>
                  <Text
                    style={styles.hyperlinkStyle}
                    onPress={() => {
                      Linking.openURL("www.bipolaruk.org");
                    }}
                  >
                    www.bipolaruk.org
                  </Text>
                  <Text />
                  <Text style={{ fontSize: 12 }}>
                    Supply a range of information leaflets, books and tapes.
                    Network of self help groups for people with manic
                    depression, relatives and friends.
                  </Text>
                </View>
              </View>

              <View
                style={[
                  { margin: 5 },
                  styles.boxSmall,
                  styles.boxMargin,
                  styles.shadowEffect,
                ]}
              >
                <View style={[styles.titleArea, styles.centering]}>
                  <Text style={styles.title}>Calmzone</Text>
                </View>
                <View style={[styles.infoArea, styles.centering]}>
                  <Text
                    style={styles.hyperlinkStyle}
                    onPress={() => {
                      Linking.openURL("www.thecalmzone.net");
                    }}
                  >
                    www.thecalmzone.net
                  </Text>
                  <Text />
                  <Text style={{ fontSize: 13 }}>
                    Campaign Against Living Miserably. Help and support for
                    young men aged 15-35 on issues which include depression and
                    suicide.
                  </Text>
                </View>
              </View>

              <View
                style={[
                  { margin: 5 },
                  styles.boxSmall,
                  styles.boxMargin,
                  styles.shadowEffect,
                ]}
              >
                <View style={[styles.titleArea, styles.centering]}>
                  <Text style={styles.title}>Samaritans</Text>
                </View>
                <View style={[styles.infoArea, styles.centering]}>
                  <Text
                    style={styles.hyperlinkStyle}
                    onPress={() => {
                      Linking.openURL(
                        "https://www.samaritans.org/how-we-can-help/schools/deal/deal-resources/dealing-feelings/what-is-depression/?gclid=Cj0KCQiAnKeCBhDPARIsAFDTLTIkkHjz1hc7XNw6RtOqswMgB1zpQlKHWeRA5uEqnai06Qw63RGoqQsaAlbJEALw_wcB"
                      );
                    }}
                  >
                    Talk to a Samaritan
                  </Text>
                  <Text />
                  <Text style={{ fontSize: 13 }}>
                    Learn more about depression and how to detect it. Contact a
                    Samaritan to have a chat.
                  </Text>
                </View>
              </View>

              <View
                style={[
                  { margin: 5 },
                  styles.boxSmall,
                  styles.boxMargin,
                  styles.shadowEffect,
                ]}
              >
                <View style={[styles.titleArea, styles.centering]}>
                  <Text style={styles.title}>WLM</Text>
                </View>
                <View style={[styles.infoArea, styles.centering]}>
                  <Text
                    style={styles.hyperlinkStyle}
                    onPress={() => {
                      Linking.openURL("https://www.wlm.org.uk/");
                    }}
                  >
                    www.wlm.org.uk
                  </Text>
                  <Text />
                  <Text style={{ fontSize: 13 }}>
                    WLM Highbury Counselling Centre offers counselling and
                    psychotherapy service for adults, a space to speak with a
                    trained professional.
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>

          <View style={{ height: "3%" }}></View>

          <View style={styles.centering}>
            <Text style={[{ fontSize: 16, padding: 20, textAlign: "center" }]}>
              The research for this project was done by:
            </Text>
            <Text
              style={[
                styles.fontStyle,
                { fontSize: 15, textAlign: "center", fontStyle: "italic" },
              ]}
            >
              Jenny Yiend{"\n"}Jong-Sun Lee{"\n"}Sinem Tekes{"\n"}Louise Atkins
              {"\n"}Andrew Matthews{"\n"}Manouk Vintren{"\n"}Christian Ferragamo
              {"\n"}Sukhwinder Shergill
            </Text>
            <Text />
            <Text />
            <Text style={[{ fontSize: 16, padding: 5 }]}>
              In an academic paper entitled:
            </Text>
            <Text
              style={[
                styles.fontStyle,
                {
                  fontSize: 16,
                  padding: 10,
                  textAlign: "center",
                  fontStyle: "italic",
                },
              ]}
            >
              'Modifying Interpretation in a Clinically Depressed Sample Using
              'Cognitive Bias Modification-Errors': A Double Blind Randomised
              Controlled Trial'
            </Text>
          </View>
        </ScrollView>

        <View
          style={[
            { height: "9%", width: "40%" },
            styles.centering,
            styles.shadowEffect,
          ]}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[
              styles.optButton,
              styles.cover,
              styles.centering,
              { borderRadius: 50 },
            ]}
          >
            <Text style={[styles.fontStyle, { fontSize: 20 }]}>Return</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: "1%" }}></View>
      </View>
    </View>
  );
};

{
  /* 
<View ststyle={styles.container}>
      <ScrollView style={styles.container}>
        <View style={[styles.boxLarge, styles.boxMargin]}>
          <ImageBackground
            style={[styles.boxLarge, styles.boxMargin]}
            source={require("../assets/mat.png")}
          >
            <AntDesign
              name="leftcircleo"
              size={24}
              color="black"
              onPress={() => navigation.goBack()}
            />
            <Text />
            <Text style={styles.main}> Support Ressources </Text>
            <Text />
            <Text />
            <Text style={styles.bigWhite}>
              {" "}
              𝘈𝘴𝘬𝘪𝘯𝘨 𝘧𝘰𝘳 𝘩𝘦𝘭𝘱 𝘥𝘰𝘦𝘴𝘯'𝘵 𝘮𝘢𝘬𝘦 𝘺𝘰𝘶 𝘸𝘦𝘢𝘬- 𝘪𝘵 𝘳𝘦𝘷𝘦𝘢𝘭𝘴 𝘴𝘵𝘳𝘦𝘯𝘨𝘵𝘩 𝘦𝘷𝘦𝘯
              𝘸𝘩𝘦𝘯 𝘺𝘰𝘶 𝘥𝘰𝘯'𝘵 𝘧𝘦𝘦𝘭 𝘴𝘵𝘳𝘰𝘯𝘨{" "}
            </Text>
            <Text />
            <Text />
            <Text />
            <Text />
            <Text />
            <Text style={styles.main}>
              Here is a list of agencies which offer support and information:
            </Text>
          </ImageBackground>
        </View>

        <ScrollView horizontal>
          <View style={[styles.boxSmall, styles.boxMargin]}>
            <Text style={styles.title}>NHS</Text>
            <Text
              style={styles.hyperlinkStyle}
              onPress={() => {
                Linking.openURL(
                  "https://www.nhs.uk/service-search/mental-health/find-an-urgent-mental-health-helpline"
                );
              }}
            >
              NHS Helplines website
            </Text>
            <Text>Local NHS urgent mental health helplines</Text>
            <Image
              style={styles.tinyLogo}
              source={{
                uri:
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/NHS-Logo.svg/1024px-NHS-Logo.svg.png",
              }}
            />
          </View>

          <View style={[styles.boxSmall, styles.boxMargin]}>
            <Text style={styles.title}>Bipolar UK:</Text>
            <Text
              style={styles.hyperlinkStyle}
              onPress={() => {
                Linking.openURL("www.bipolaruk.org");
              }}
            >
              www.bipolaruk.org
            </Text>
            <Text />
            <Text>
              Supply a range of information leaflets, books and tapes. Network
              of self help groups for people with manic depression, relatives
              and friends.
            </Text>
          </View>

          <View style={[styles.boxSmall, styles.boxMargin]}>
            <Text style={styles.title}>Calmzone:</Text>
            <Text
              style={styles.hyperlinkStyle}
              onPress={() => {
                Linking.openURL("www.thecalmzone.net");
              }}
            >
              www.thecalmzone.net
            </Text>
            <Text />
            <Text>
              Campaign Against Living Miserably. Help and support for young men
              aged 15-35 on issues which include depression and suicide.
            </Text>
          </View>

          <View style={[styles.boxSmall, styles.boxMargin]}>
            <Text style={styles.title}>Samaritans:</Text>
            <Text
              style={styles.hyperlinkStyle}
              onPress={() => {
                Linking.openURL(
                  "https://www.samaritans.org/how-we-can-help/schools/deal/deal-resources/dealing-feelings/what-is-depression/?gclid=Cj0KCQiAnKeCBhDPARIsAFDTLTIkkHjz1hc7XNw6RtOqswMgB1zpQlKHWeRA5uEqnai06Qw63RGoqQsaAlbJEALw_wcB"
                );
              }}
            >
              Talk to a Samaritan
            </Text>
            <Text></Text>
            <Text>
              Learn more about depression and how to detect it or contact a
              Samaritan to have a chat
            </Text>
          </View>

          <View style={[styles.boxSmall, styles.boxMargin]}>
            <Text style={styles.title}>WLM:</Text>
            <Text>highburycounselling@wlm.org.uk</Text>
            <Text>
              WLM Highbury Counselling Centre offers counselling and
              sychotherapy service for adults, a space to speak with a trained
              professional.
            </Text>
          </View>
        </ScrollView>
        <View style={[styles.boxLarge, styles.boxMargin]}>
          <Text style={styles.main}>
            The research for this project was done by:{" "}
          </Text>
          <Text />
          <Text style={styles.smallTitle}> -Jenny Yiend</Text>
          <Text style={styles.smallTitle}> -Jong-Sun Lee</Text>
          <Text style={styles.smallTitle}> -Sinem Tekes</Text>
          <Text style={styles.smallTitle}> -Louise Atkins</Text>
          <Text style={styles.smallTitle}> -Andrew Mathews</Text>
          <Text style={styles.smallTitle}> -Manouk Vrinten</Text>
          <Text style={styles.smallTitle}> -Christian Ferragamo</Text>
          <Text style={styles.smallTitle}> -Sukhwinder Shergill</Text>
          <Text style={styles.main}> In an academic paper entitled:</Text>
          <Text style={styles.smallTitle}>
            Modifying Interpretation in a ClinicallyDepressed Sample Using
            ‘Cognitive BiasModification-Errors’: A Double BlindRandomised
            Controlled Trial
          </Text>
        </View>
      </ScrollView>
    </View>
*/
}

const styles = StyleSheet.create({
  infoArea: {
    height: "70%",
    padding: 20,
  },
  bottomBorder: {
    height: "100%",
    width: "40%",
    borderRadius: 50,
    backgroundColor: "#ffeed2",
  },
  center: {
    backgroundColor: "#fed8b1",
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "#ffeed2",
  },
  centering: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    display: "flex",
    padding: 25,
    backgroundColor: "#fff",
  },
  cover: {
    height: "100%",
    width: "100%",
  },
  fontStyle: {
    fontWeight: "bold",
    color: "dimgray",
  },
  optButton: {
    backgroundColor: "#ffeed2",
  },
  scheduleText: {
    fontSize: 15,
  },
  selectButton: {
    backgroundColor: "#ffeed2",
  },
  shadowEffect: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 5,
  },
  textStyle: {
    fontSize: 18,
  },
  boxSmall: {
    marginRight: 5,
    width: 225,
    height: 180,
    backgroundColor: "white",
    borderRadius: 40,
    borderWidth: 5,
    borderColor: "#bcf5bc",
  },
  boxLarge: {
    width: 380,
    height: 350,
    backgroundColor: "#ffa351",
  },
  boxMargin: {
    marginRight: 10,
  },
  bigWhite: {
    margin: 15,
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  hyperlinkStyle: {
    color: "blue",
  },
  logo: {
    width: 400,
    height: 100,
  },
  main: {
    color: "white",
    textAlign: "center",
    fontSize: 17,
  },
  tinyLogo: {
    width: 160,
    height: 80,
    margin: 10,
  },
  title: {
    color: "dimgray",
    fontSize: 23,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  titleArea: {
    height: "30%",
    width: "100%",
    backgroundColor: "#bcf5bc",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  smallTitle: {
    color: "white",
    fontSize: 15,
    margin: 2,
  },
});

export default SupportResources;
