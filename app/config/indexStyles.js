
import colors from "./colors";

//widely used styles
export const centering = {
    alignItems: "center",
    justifyContent: "center",
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

export const textGrey = {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "dimgray",
    flexWrap: "wrap",
};

// styles used in the login, signup and forgot password screens
export const textWhite = {
    color: "white",
    textAlign: "center",
    fontSize: 15
};

export const textButton = {
    color: colors.darkBorder,
    marginTop: 25,
    textAlign: "center"
};

export const darkButton = {
    width: 300,
    backgroundColor: colors.darkBorder,
    alignSelf: "center",
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 50,
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

export const errorMessage = {
    fontSize: 15,
    textAlign: "center",
    color: "red",
    flexWrap: "wrap"
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

