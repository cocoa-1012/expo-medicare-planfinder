import React, { Component } from 'react';
import { Dimensions, AsyncStorage, Platform, ScrollView } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { DrawerActions } from 'react-navigation';
import HeaderComponent from './menu/header';
import Notifications from "./cloudMesagesSetup"
import analytics from '@react-native-firebase/analytics';
import { NavigationEvents } from 'react-navigation';
import moment from 'moment';
import _ from 'lodash';

import messaging from "@react-native-firebase/messaging";
import { Container, View, Text, Button } from 'native-base';
import { Formik } from 'formik';
import { formFields, formInfo, entryPost } from '../src/services';
import fieldRenderer from '../src/utils/fieldRenderer';
import CustomStepIndicator from './ui/CustomStepIndicator';
import LottieView from 'lottie-react-native';
import { createYupSchema } from '../src/utils/yupSchemaCreator';
import { fonts } from '../src/utils/styles';
import { withNextInputAutoFocusForm } from "react-native-formik";
const Form = withNextInputAutoFocusForm(ScrollView);


const { height, width } = Dimensions.get('screen');

//=========ADDED BY ============================================//
import NotifService from './notification';
import database from "@react-native-firebase/database"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomModal from './ui/CustomModal';

//=================schedule notifications to save on remote database ================//
const scheduledNotificationArray = [
  {
    message: "Rate this App or write a review",
    id: 1,
    interval: 34,
    fireDate: new Date(Date.now() + 604800 * 1000),
    repeatTime: 7,
    repeatType: "day",
    type: "week"
  },
  {
    message: "Medicare Beneficiaries new to Medicare receive a $15 Darden gift card after completing the Medicare FactFinder®. consultation.",
    id: 2,
    interval: 34,
    fireDate: new Date(Date.now() + 8 * 1000),
    //fireDate:new Date(Date.now() + 86400 * 1000),
    repeatTime: 1,
    repeatType: "day",
    type: "day"
  },
  {
    message: "Medicare Beneficiaries new to Medicare receive a $15 Darden gift card after completing the Medicare FactFinder®. consultation.",
    id: 7,
    interval: 34,
    //fireDate:new Date(Date.now() + 8 * 1000),
    fireDate: new Date(Date.now() + 86400 * 1000),
    repeatTime: 1,
    repeatType: "day",
    type: "day"
  },
  {
    message: "Complete the Medicare FactFinder®. for help selecting your most suitable Medicare plan during Annual Enrollment Period.",
    id: 3,
    interval: 34,
    fireDate: new Date(Date.now() + 604800 * 1000),
    repeatTime: 1,
    repeatType: "week",
    type: "week"
  },
  {
    message: "Medicare Eligible family and friends will thank you for helping them download the Medicare PlanFinder®. Mobile App.",
    id: 4,
    interval: 34,
    fireDate: new Date(Date.now() + 3600 * 1000),
    repeatTime: 1,
    repeatType: "month",
    type: "hour"
  },
  {
    message: "Have questions about rolling over your 401(k) or 403(b) retirement account? Complete the Financial FactFinder.",
    id: 5,
    interval: 34,
    fireDate: new Date(Date.now() + 2 * 86400 * 1000),
    repeatTime: 1,
    repeatType: "day",
    type: "day"
  },

];
export default class FactFinder extends Component {

  //======================Constructor =====================================//
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      selected: "key0",
      firstName: '',
      lastName: '',
      birthDate: '',
      phoneNumber: '',
      factFinderFields: null,
      factFinderFormInfo: null,
      factFinderFieldsValue: [],
      currentFactFinderFields: null,
      currentPagePosition: 0,
      isVisibleModalToContinue: false,
      baseFormikFields: null,
      progress: false,
      successModal: false,
    };
    //======================== configure notifcation service =================//
    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );
    this.onValueChange = this.onValueChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.turnBack = this.turnBack.bind(this);
    this.buttonsRender = this.buttonsRender.bind(this);
  }
  //===================On Registering device to apns /fcm ==========================//
  onRegister(token) {
    global.token = token.token;
    const detail = { registerToken: token.token, fcmRegistered: true, platform: Platform.OS }
    this.saveTheDevice(token.token, detail);
    this.setState({ registerToken: token.token, fcmRegistered: true });
  }
  //========================Saving device to database ===========================//
  saveTheDevice = (registerToken, detail) => {
    let rootRef = database().ref();
    rootRef
      .child('devices')
      .orderByChild('registerToken')
      .equalTo(registerToken)
      .once('value')
      .then(snapshot => {
        console.log("snapshotarray", snapshot)
        if (snapshot.exists()) {

        } else {
          database().ref("/devices").push(detail, data => {

          });
        }
      });
  };
  //==================================getting notifictions list =================//
  getNotificationsListToScheduleNotifications() {
    let rootRef = database().ref();
    rootRef
      .child('notifications')
      .once('value')
      .then(snapshot => {
        console.log("Snapshot", snapshot._snapshot.value);
        const dataArray = snapshot._snapshot.value;
        if (dataArray && dataArray.length > 0) {
          this.notif.scheduleNotification(dataArray);
        }
      });
  }
  //=================Saving the all pre defined notifications in database ===========//
  saveTheNotificationsAndGetNotifications = (registerToken, detail) => {
    database().ref("/notifications").set(detail);

  };
  //======================On notification Handler ================================//
  onNotif(notif) {
    analytics().logEvent('On_Notification', {
      date_time: dte.toString()
    });
  }

  //===================Component Did mount =========================///////////
  async componentDidMount() {
    this.getNotificationsListToScheduleNotifications();
    analytics().setCurrentScreen("Form", "Form");
    let dte = new Date();
    analytics().logEvent('MFF_opened', {
      date_time: dte.toString()
    });
    const userId = await AsyncStorage.getItem('@Medicare:userId');
    this.setState({ userId: userId });
    this.saveTheNotificationsAndGetNotifications("is", scheduledNotificationArray);
    Dimensions.addEventListener('change', (e) => {
      console.log('CHANNGED DIMENSIONS');
      const { width, height } = e.window;
      this.setState({ width, height });
    });
    const factFinderFieldsResponse = await formFields('q1rw94aa0uekyn6');
    const findForm = await formInfo('q1rw94aa0uekyn6');
    const factFinderFieldsValue1 = factFinderFieldsResponse?.slice(0, parseInt(factFinderFieldsResponse.length / 3));
    const factFinderFieldsValue2 = factFinderFieldsResponse?.slice(parseInt(factFinderFieldsResponse.length / 3), parseInt(factFinderFieldsResponse.length / 1.5));
    const factFinderFieldsValue3 = factFinderFieldsResponse?.slice(parseInt(factFinderFieldsResponse.length / 1.5), factFinderFieldsResponse.length);
    let formBottomText = '';
    database().ref()
      .child('formBottomText')
      .once('value')
      .then(snapshot => {
        this.state.formBottomText = snapshot.val();
      });
    const { formikFields } = createYupSchema(factFinderFieldsResponse);
    const schemaJson1 = createYupSchema(factFinderFieldsValue1)?.schemaJson;
    const schemaJson2 = createYupSchema(factFinderFieldsValue2)?.schemaJson;
    const schemaJson3 = createYupSchema(factFinderFieldsValue3)?.schemaJson;
    this.setState({
      factFinderFields: factFinderFieldsResponse,
      currentFactFinderFields: factFinderFieldsValue1,
      factFinderFieldsValue: [[], factFinderFieldsValue1, factFinderFieldsValue2, factFinderFieldsValue3],
      factFinderFormInfo: findForm,
      yupValidations: [{}, schemaJson1, schemaJson2, schemaJson3],
      currentSchemaJson: {},
      baseFormikFields: Object.assign({}, formikFields),
      formikFields,
    });
  }

  continueToForm(answer) {
    const currentPagePosition = 1;
    const currentFactFinderFields = this.state.factFinderFieldsValue[1];
    const currentSchemaJson = this.state.yupValidations[1];
    if (answer) {
      const mergedFormikFields = Object.assign(this.state.formikFields, this.state.uncompletedForms);
      this.setState({
        formikFields: mergedFormikFields,
      });
    } else {
      this.setState({
        formikFields: this.state.baseFormikFields,
      });
    }
    this.setState({
      currentSchemaJson,
      currentPagePosition,
      currentFactFinderFields,
    });
  }

  openDrawer = () => {
    analytics().logEvent('1st_menu_view', {
    }).then(data => {
      console.log("data", data)
    }).catch(err => {
      console.log("err", err);
    });
    analytics().logEvent('display_menu', {
    });
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  };

  async updateReviewDate() {
    let rootRef = database().ref();
    const token = await messaging().getToken();
    await rootRef
      .child(`showReviewDevices/${DeviceInfo.getUniqueId()}`)
      .set({
        token,
        lastUpdateTime: moment().format('DD/MM/YYYY hh:mm'),
      })
      .then(() => {
        console.log('UPDATED!!!');
      })
  }
  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  async submitForm(values) {
    // console.log(values);
    // this.keyboardAwareRef?.scrollToPosition(0)
    if (this.state.currentPagePosition < 3 && this.state.currentPagePosition !== 0) {
      const currentPagePosition = this.state.currentPagePosition + 1;
      const currentFactFinderFields = this.state.factFinderFieldsValue[this.state.currentPagePosition + 1];
      const currentSchemaJson = this.state.yupValidations[this.state.currentPagePosition + 1];
      this.setState({
        currentSchemaJson,
        currentPagePosition,
        currentFactFinderFields,
        formikFields: values
      });
    } else if (this.state.currentPagePosition === 0) {
      this.setState({ progress: true });
      database()
        .ref('/uncompletedForms/' + DeviceInfo.getUniqueId())
        .once('value')
        .then(snapshot => {
          if (snapshot?.val() && Object.keys(snapshot?.val())?.length >= 1) {
            this.setState({
              progress: false,
              uncompletedForms: snapshot.val(),
            });
            this.continueToForm(true)
          } else {
            this.setState({ progress: false });
            this.continueToForm(false)
          }
        });

    } else {
      this.updateReviewDate();
      let key = '';
      for (key in values) {
        if (key.indexOf('Obj') >= 0) {
          delete values[key];
        }
        if (key.indexOf('temp') >= 0) {
          delete values[key];
        }
        if (key.indexOf('temp2') >= 0) {
          delete values[key];
        }
      }
      this.setState({ progress: true });
      const response = await entryPost('q1rw94aa0uekyn6', values);
      if (!_.isEmpty(response.data.FieldErrors)) {
        this.state.fieldErrors = JSON.stringify(response.data.FieldErrors);
      }
      this.setState({ progress: false, successModal: true });
      database()
        .ref('/uncompletedForms/' + DeviceInfo.getUniqueId())
        .remove();
    }
  }

  turnBack(values) {
    const currentPagePosition = this.state.currentPagePosition - 1;
    const currentFactFinderFields = this.state.factFinderFieldsValue[this.state.currentPagePosition - 1];
    const currentSchemaJson = this.state.yupValidations[this.state.currentPagePosition - 1];
    this.setState({
      currentPagePosition,
      currentFactFinderFields,
      currentSchemaJson,
      formikFields: { ...this.state.formikFields, ...values }
    });
  }

  submitButtonRender(title, handleSubmit, values) {
    return (
      <>
        <Button block style={{ height: 50, margin: 16, backgroundColor: title === 'Back' ? '#ff4646' : '#5eaaa8' }} onPress={ title === 'Back' ? () => handleSubmit(values) :handleSubmit}>
          <Text style={{ fontFamily: fonts.bold, fontSize: 18 }}>{title}</Text>
        </Button>
        {/* {JSON.stringify(errors) !== "{}" ?
          <Text style={{ fontFamily: fonts.bold, fontSize: 18, color: 'red' }}>{"You have to fill required fields! "}</Text>
          : null} */}

      </>
    );
  }

  saveAllAnswerToFirebase(values) {
    for (let fieldID in values) {
      const answer = values[fieldID];
      let json;
      if (typeof answer === 'string') {
        json = '{"' + fieldID + '":"' + answer.trim() + '"}';
      } else {
        json = '{"' + fieldID + '":' + JSON.stringify(answer) + '}';
      }
      database()
        .ref('/uncompletedForms/' + DeviceInfo.getUniqueId())
        .update(JSON.parse(json));
    }
    this.setState({ formikFields: values });
  }

  buttonsRender(handleSubmit, errors, values) {
    return (
      this.state.currentPagePosition === 3 ? (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            {this.submitButtonRender('Back', this.turnBack, values)}
          </View>
          <View style={{ flex: 1 }}>
            {this.submitButtonRender('Submit', handleSubmit, errors)}
          </View>
        </View>
      ) : (
          this.state.currentPagePosition === 0 ? (
            this.submitButtonRender('Let\'s Get Started', handleSubmit)
          ) : (
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  {this.submitButtonRender('Back', this.turnBack, values)}
                </View>
                <View style={{ flex: 1 }}>
                  {this.submitButtonRender('Next', handleSubmit, errors)}

                </View>
              </View>
            )
        )
    );
  }

  // getPositions() {
  //   UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
  //     console.log(pageX, pageY);
  //     return { x: pageX, y: originX };
  //   });
  // }

  handleScroll(event) {
    global.scrollViewCurrentPosition = event?.nativeEvent?.contentOffset.y;
  }

  formikFormRenderer({ formikFields, currentSchemaJson, currentFactFinderFields, currentPagePosition }) {
    return (
      <Formik
        enableReinitialize
        innerRef={p => (this.formik = p)}
        initialValues={formikFields}
        onSubmit={this.submitForm}
        dirty={true}
        // validate={v => this.keyboardAwareRef?.scrollToPosition(0)}
        validationSchema={currentSchemaJson}
        key={"formik-form" + currentPagePosition}
      >
        {({ handleChange, touched, handleSubmit, values, errors, setFieldValue }) => (
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            onScroll={this.handleScroll}
            enableAutomaticScroll
            keyboardOpeningTime={0}
            resetScrollToCoords={{ x: 0, y: global.scrollViewCurrentPosition }}
            ref={scroll => this.keyboardAwareRef = scroll}
            extraScrollHeight={Platform.OS === 'ios' ? 150 : 80}
          >
            {/* 
              <KeyboardAvoidingView
                behavior={'padding'}
                style={{ flex: 1 }}
                // enableOnAndroid={true}
                // ref={scroll => this.keyboardAwareRef = scroll}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 80}
              >
            */}
            <Form style={{ padding: 16 }} onScroll={this.handleScroll}>
              {currentFactFinderFields?.map(item => fieldRenderer(item, values, touched, errors, handleChange, setFieldValue, this))}
              {
                this.state.currentPagePosition === 3 && (
                  <View style={{ borderWidth: 1, borderColor: 'gray', padding: 8, borderRadius: 10, marginTop: 8 }}>
                    <Text style={{ fontFamily: fonts.medium, fontSize: 19, marginVertical: 3 }}>
                      {this.state.formBottomText}
                    </Text>
                  </View>)
              }
              <Button block style={{ height: 50, margin: 16, backgroundColor: '#5eaaa8' }} onPress={() => this.saveAllAnswerToFirebase(values)}>
                <Text style={{ fontFamily: fonts.bold, fontSize: 18 }}>{'SAVE'}</Text>
              </Button>
              {this.buttonsRender(handleSubmit, errors, values)}
            </Form>
          </KeyboardAwareScrollView>
        )}
      </Formik>
    );
  }
  render() {
    return (
      <Container>
        <View style={{ width: this.state.width, height: this.state.height }}>
          <NavigationEvents
            onDidBlur={payload => {
              analytics().logEvent('form_closed', {
                switched_to: payload.state.routeName
              });
            }}
          />
          <HeaderComponent
            navigation={this.props.navigation}
            title="Medicare FactFinder"
            useWebKit={false}
            scalesPageToFit={false}
            mixedContentMode="always"
            allowFileAccess={true}
          />
          <CustomModal
            source={require('../assets/success3.json')}
            modalText={this.state.fieldErrors ? this.state.fieldErrors : this.state.factFinderFormInfo?.RedirectMessage}
            confirmButtonText='Go-to educational videos!'
            style={{ flex: 5 }}
            confirmButtonAction={() => {
              this.setState({ currentPagePosition: 0, successModal: false });
              this.props.navigation.navigate("Videos", {
                userId: this.state.userId
              })
            }}
            visible={this.state.successModal}
          />
          {
            this.state.currentFactFinderFields ?
              <>
                <CustomStepIndicator currentPagePosition={this.state.currentPagePosition} />
                {
                  this.state.currentPagePosition === 0 ? (
                    <ScrollView contentContainerStyle={{ marginHorizontal: 12, marginBottom: 8, flex: 1, justifyContent: 'space-between' }}>
                      <View />
                      <View style={{ marginBottom: 8 }}>
                        <Text style={{ fontSize: 26, marginBottom: 12, textAlign: 'left', fontFamily: fonts.bold }}>
                          {this.state.factFinderFormInfo?.Name}
                        </Text>
                        <Text style={{ color: '#4d4d4d', textAlign: 'left', fontFamily: fonts.semiBold, fontSize: 19 }}>
                          {this.state.factFinderFormInfo?.Description}
                        </Text>
                      </View>
                      {
                        this.submitButtonRender('Let\'s Get Started', () => this.submitForm())
                      }
                    </ScrollView>
                  )
                    : this.formikFormRenderer({ formikFields: this.state.formikFields, currentSchemaJson: this.state.currentSchemaJson, currentFactFinderFields: this.state.currentFactFinderFields, currentPagePosition: this.state.currentPagePosition })
                }
                {
                  this.state.progress ?
                    <View
                      style={{
                        alignItems: 'center',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        zIndex: 1
                      }}
                    >
                      <LottieView
                        source={require('../assets/loadingAnimation.json')}
                        autoPlay
                        loop
                        style={{ width: 200, height: 200 }}
                      />
                    </View> : null
                }
              </>
              :
              <View
                style={{
                  alignItems: 'center',
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  zIndex: 1
                }}
              >
                <LottieView
                  source={require('../assets/loadingAnimation.json')}
                  autoPlay
                  loop
                  style={{ width: 200, height: 200 }}
                />
              </View>
          }

          {/* <WebView
                        onLoad={() => {
                            setTimeout(() => this.setState({ loading: false }), 1500);
                        }}
                        onNavigationStateChange={event => {
                            if (event.url === 'https://medicarefactfinder.net/submitted?id=null') {
                                this.updateReviewDate();
                            }
                        }}
                        startInLoadingState
                        source={{ uri: 'https://healthwealth.wufoo.com/forms/q1rw94aa0uekyn6/def/field4256=' + this.state.userId }}
                        style={{ width: this.state.width, height: this.state.height }}
                    /> */}
          <Notifications />
        </View>

      </Container>

    )
  }
}
