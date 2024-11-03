# Team Rocket Large Group Project

Software Name: `HUG - Helping U Grow`\
\
HUG is a mental health intervention app designed to deliver treatment for clinical depression and anxiety. HUG also provides content management features for registered administrators.

## Authors

- Dana Alsuwailem (K1897404)
- Alexander Armero Saura (K19017186)
- Crystal Chan (K19001568)
- Julianne Diaz (K19013932)
- Lugene El Mekabbaty (K1921917)
- Hiro Funatsuka (K1897500)
- Mathieu Gillin (K19020170)
- Shehzad Haleem (K19014449)
- Mordecai Sassoon (K1923079)

## Deployment

Please refer to the page 12 of Setup Instructions deliverable for more information.

### Online Simulators

An iOS Simulator for this app can be found at link: https://appetize.io/app/ngr2c0h37dv979n63auwt62pvg

### Important Notes

- Keep the iOS version at 14.1 in the simulator as this is the latest iOS version available.
- Do not use iPhone models older than the iPhone 6.
- The simulator can only be used for 60 minutes and only one user can use this simulator at a time.
- You will be unable to hear the text-to-speech feature from this simulator as speakers are unavailable.
- Some features such as the DateTimePicker appear buggy on older versions of iOS. It is recommended that the app is run on 14.4 for some features to appear flawlessly.

## Running on your local simulator

Please refer to page 11 of Setup Instructions deliverable for more information.

### Android

1. You must have `Android Studio` installed into your computer.
2. Click tools and choose `AVD manager`.
3. Create a new virtual device if there is none existing.
4. Load a device from the `Android Virtual Device`.
5. In the project folder on terminal, run `npm install` or `yarn install`.
6. Run `expo start` to start the project.
7. Press `a` or go to the `Metro Builder` and click the option `Run on Android device/emulator`.
8. The app should now open up.

### iOS

1. Have `Xcode` installed from the Mac App Store.
2. Open Xcode and choose `Preferences...` from the Xcode menu.
3. Go to the `Locations` panel and install the most recent tools by selecting from the `Commmand Line Tools dropdown`.
4. In the project folder on terminal, run `npm install` or `yarn install`.
5. Run `expo start` to start the project.
6. Press `i` or go to the `Metro Builder` and click the option `Run on iOS Simulator`.
7. The app should now open up.

## Installation

Please refer to the page 3 of Setup Instructions deliverable for this information.

## Access Credentials

### Admin Account

Username: `admin@hugapp.com`
Password: `AdminP4ssw0rd`

### Patient Account

To create a patient account, you must go to the `Sign Up page` and enter your `email` and `password`.\
\
A `verification link` will be sent to the email you specified and you must follow this link in order to verify your account.\
\
Once your account has been verified, proceed to the `Log In screen` and `enter your details` to begin your therapy.

## References

### Source Code

1. Firebase. 2021. Add data to Cloud Firestore | Firebase. [online] Available at: <https://firebase.google.com/docs/firestore/manage-data/add-data> [Accessed March 2021].  
   Locations: `../app/screens/LoginScreen.js` and `../app/screens/SignupScreen.js`
2. Firebase. 2021. Auth | JavaScript SDK | Firebase. [online] Available at: <https://firebase.google.com/docs/reference/js/firebase.auth.Auth> [Accessed March 2021].
   Locations: `../app/screens/TherapyScreen.js`, `../app/screens/SchedulingScreen.js`, `../app/screens/LoginScreen.js`, `../app/screens/LogFeelingScreen.js`, `../app/screens/CategoryDrop.js`, `../app/screens/HomeScreen.js` and `../app/screens/AccountScreen.js`
3. Firebase. 2021. Security Rules language | Firebase. [online] Available at: <https://firebase.google.com/docs/rules/rules-language> [Accessed April 2021].
4. GitHub. 2021. Mocking firebase.initializeApp() and firebase.auth() using JavaScript/Jest. [online] Available at: <https://github.com/mrbenhowl/mocking-firebase-initializeApp-and-firebase-auth-using-jest> [Accessed April 2021].
5. Ionic Framework. 2021. Icons. [online] Available at: <https://ionicframework.com/docs/v3/ionicons/> [Accessed March 2021].
   Locations: `../app/dashboards/AdminDashboard.js` and `../app/dashboards/PatientDashboard.js`
6. Reactnavigation.org. 2021. Tab navigation | React Navigation. [online] Available at: <https://reactnavigation.org/docs/tab-based-navigation/> [Accessed March 2021].
   Locations: `../app/dashboards/AdminDashboard.js` and `../app/dashboards/PatientDashboard.js`
7. Snack.expo.io. 2021. Dismiss the Keyboard in React Native from Anywhere - Snack. [online] Available at: <https://snack.expo.io/@spencercarli/dismiss-the-keyboard-in-react-native-from-anywhere> [Accessed April 2021].
   Locations: `../app/config/DismissKeyboard.js`, `../app/screens/ForgotPasswordScreen.js`, `../app/screens/LoginScreen.js`, `../app/screens/SignupScreen.js`, `../app/screens/TherapyQuestionDetailScreen.js` and `../app/screens/TherapyScreen.js`

### Images

1. Diaz, J. 2021. Plant Growth Animations [photograph] (HUG App Illustrations).
   Locations: `../app/dashboards/HomeScreen.js`, `../app/screens/PlantScreen.js` and `../app/screens/SchedulingScreen.js`
2. Gillin, M. 2021. HUG App Logo. [photograph] (HUG App Illustrations).
   Locations: `../app/screens/AccountScreen.js`, `../app/dashboards/AdminHomeScreen.js`, `../app/screens/ForgotPasswordScreen.js`, `../app/screens/LoginScreen.js` and `../app/screens/SignupScreen.js`
