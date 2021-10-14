import React from "react";
import { Button, Text, ScrollView, KeyboardAvoidingView } from "react-native";
import { Formik } from "formik";
import { compose } from "recompose";
import {
  handleTextInput,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput,
  withFormikControl
} from "react-native-formik";
import { TextField } from "react-native-material-textfield";
import { Input } from 'native-base';

import * as Yup from "yup";
import DatePicker from "./DatePicker";
import Switch from "./Switch";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(TextField);
const Form = withNextInputAutoFocusForm(ScrollView);
const FocusedDatePicker = compose(
  withFormikControl,
  withNextInputAutoFocusInput
)(DatePicker);

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email(),
  password: Yup.string()
    .required()
    .min(6, "Too short"),
  star: Yup.boolean()
    .required()
    .oneOf([true])
});

export default () => (
  <Formik
    onSubmit={values => alert(JSON.stringify(values, null, 2))}
    validationSchema={validationSchema}
    initialValues={{
      password: '',
      passwor: '',
      star: false,
      email: '',
      password: '',
      passwor: '',
      passwod: '',
      passwrd: '',
      passord: '',
      pasword: '',
      pasword: '',
      pssword: '',
      assword: '',
      ahmet: '',
      meneknds: '',
      ahme: '',
      meknds: '',
      star: '',
      birthday: ''
    }}
  >
    {props => {
      return (
        <KeyboardAwareScrollView>
          <Form style={{ padding: 10 }}>
            <MyInput label="Email" name="email" type="email" />
            <MyInput label="password" name="password" type="password" />
            <MyInput label="passwor" name="passwor" type="password" />
            <Switch
              label="If you like the repo, have you starred it 😁?"
              name="star"
            />
            <MyInput label="passwod" name="passwod" type="password" />
            <MyInput label="passwrd" name="passwrd" type="password" />
            <MyInput label="passord" name="passord" type="password" />
            <MyInput label="pasword" name="pasword" type="password" />
            <MyInput label="pssword" name="pssword" type="password" />
            <MyInput label="assword" name="assword" type="password" />
            <MyInput label="ahmet" name="ahmet" type="password" />
            <MyInput label="meneknds" name="meneknds" type="password" />
            <MyInput label="ahme" name="ahme" type="password" />
            <MyInput label="meknds" name="meknds" type="password" />
            <FocusedDatePicker label="Birthday" name="birthday" />

            <Button onPress={props.handleSubmit} title="SUBMIT" />
            <Text>{JSON.stringify(props, null, 2)}</Text>
          </Form>
        </KeyboardAwareScrollView>
      );
    }}
  </Formik>
);
