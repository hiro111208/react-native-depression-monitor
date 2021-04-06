import colors from "./colors";

export const centering = {
  alignItems: "center",
  justifyContent: "center",
};

export const containerOrange = {
  backgroundColor: colors.mainPanel,
  borderRadius: 50,
  borderWidth: 5,
  borderColor: colors.lightOutline,
};

export const containerWhite = {
  flex: 1,
  display: "flex",
  padding: 25,
  backgroundColor: "white",
};

export const cover = {
  height: "100%",
  width: "100%",
};

export const errorMessage = {
  fontSize: 15,
  textAlign: "center",
  color: "red",
  flexWrap: "wrap",
};

export const fontStyle = {
  fontWeight: "bold",
  color: "dimgray",
};

export const inputArea = {
  width: "100%",
  marginBottom: 15,
  marginTop: 15,
  paddingBottom: 20,
  alignSelf: "center",
  borderColor: "#ccc",
  borderBottomWidth: 1,
};

export const preloader = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  position: "absolute",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
};

export const roundButton = {
  height: "100%",
  width: "40%",
  borderRadius: 50,
  backgroundColor: colors.lightOutline,
  position: "absolute",
  bottom: 0,
};

export const shadowEffect = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  marginVertical: 5,
};

export const textButton = {
  color: colors.darkBorder,
  marginTop: 25,
  textAlign: "center",
};

export const textGrey = {
  fontSize: 20,
  fontWeight: "bold",
  textAlign: "center",
  color: "dimgray",
  flexWrap: "wrap",
};

export const textWhite = {
  color: "white",
  textAlign: "center",
  fontSize: 15,
};
