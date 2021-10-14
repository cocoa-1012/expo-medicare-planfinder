import React from 'react';
import { Dimensions, Picker, Platform } from 'react-native';
import { View, Icon, Textarea, Picker as NBPicker, ListItem, Left, Right, Text, Radio, CheckBox, } from 'native-base';
import _ from 'lodash';
import { OutlinedTextField } from "react-native-material-textfield";
import moment from 'moment';
import { fonts } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { compose } from "recompose";
import {
  handleTextInput,
  withFormikControl,
  withNextInputAutoFocusInput
} from "react-native-formik";
import DatePicker from "../../components/FormikComponents/DatePicker";
import rules from "../../src/utils/rules.json";

const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(OutlinedTextField);

export default function fieldRenderByType(field, values, touched, errors, handleChange, setFieldValue, _this) {
  let showComp = true;
  let compRule = rules[field?.ID];
  let keyboardType = !_.isEmpty(field?.ClassNames) ? JSON.parse(field?.ClassNames)?.keyboardType : null;
  if (compRule) {
    const responseList = _.map(compRule, rule => {
      if (rule.equals) {
        if (rule.equals === values[rule.dependCompId]) {
          return rule.show;
        }
        return !rule.show;
      } else {
        const itemValue = values[rule.dependCompId];
        const { lessThan, greaterThan } = rule;
        if (lessThan) {
          if (greaterThan) {
            if (itemValue > greaterThan && lessThan > itemValue) {
              return rule.show;
            }
            return !rule.show;
          } else {
            if (lessThan > itemValue) {
              return rule.show;
            }
            return !rule.show
          }
        } else {
          if (greaterThan < itemValue) {
            return rule.show;
          }
          return !rule.show;
        }
      }
    })
    if (!_.isEmpty(responseList)) {
      let _showComp = false;
      _.each(responseList, item => {
        _showComp = _showComp || item
      });
      showComp = _showComp;
    }
    if (_.isEmpty(String(values[field?.ID]).trim())) {
      if (!showComp && field.IsRequired === '1') {
        switch (field.Type) {
          case 'number':
            values[field?.ID] = 0;
            break;
          case 'text':
            values[field?.ID] = ' ';
            break;
          case 'date':
            values[field?.ID] = moment().format('YYYYMMDD');
            break;
          default:
            break;
        }
      } else {
        switch (field.Type) {
          case 'number':
            values[field?.ID] = 0;
            break;
          case 'text':
            values[field?.ID] = '';
            break;
          case 'date':
            values[field?.ID] = moment().format('YYYYMMDD');
            break;
          default:
            break;
        }
      }
    }
  }
  const fieldType = field?.Type;
  let titleRender = (title, isRequired) => {
    if (String(title).indexOf('     ') > 0) {
      const titleList = title.split('           ');
      return (
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 4, flex: 1 }}>
          <Text style={{ fontFamily: fonts.medium, textAlign: 'left' }}>
            {titleList[0].replace(/\s/g, '')}
          </Text>
          <Text style={{ textAlign: 'right' }}>
            <Text style={{ fontFamily: fonts.medium }}>
              {titleList[1].replace(/\s/g, '')}
            </Text>
            <Text style={{ fontFamily: fonts.bold, color: 'red' }}>
              {isRequired === '1' ? ' *' : ''}
            </Text>
          </Text>
        </View>
      );
    } else {
      return (
        <Text style={{ fontFamily: fonts.medium, marginBottom: 4 }}>
          <Text style={{ fontFamily: fonts.medium, marginBottom: 10 }}>
            {title}
          </Text>
          <Text style={{ fontFamily: fonts.bold, color: 'red' }}>
            {isRequired === '1' ? ' *' : ''}
          </Text>
        </Text>
      );
    }
  }

  const onErrorFieldColor = (field) => {
    if (touched[field] && errors[field]) {
      return 'rgba(255, 48, 48,0.2)'
    }
    return null;
  }

  const onErrorValidation = (field) => {
    if (touched[field] && errors[field]) {
      return true;
    }
    return false;
  }

  const validationErrorText = (fieldID, marginBottom = false) => {
    if (touched[fieldID] && errors[fieldID]) {
      return <Text style={{ marginLeft: 16, marginTop: marginBottom ? 8 : 0, fontSize: 12, color: 'red' }}>{'This field is a required field!'}</Text>
    }
    return null;
  }

  const onPressCheckbox = (_field, selectedItem) => {
    const changedItem = _.isEmpty(values[selectedItem?.ID]) ? selectedItem?.Label : '';
    setFieldValue(selectedItem.ID, changedItem);
    let checkboxObj = {
      ...values[_field.ID + 'Obj']
    };
    if (changedItem === '') {
      delete checkboxObj[selectedItem.ID];
    } else {
      checkboxObj[selectedItem.ID] = changedItem;
    }
    setFieldValue(_field.ID + 'Obj', _.isEmpty(checkboxObj) ? null : checkboxObj);
  }
  switch (fieldType) {
    case 'text':
      if (showComp) {
        return (
          <>
            {titleRender(field?.Title, field?.IsRequired)}
            <View style={{ flex: 1, width: '100%', flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <MyInput
                  error={Platform.OS === 'ios' ? false : ''}
                  name={field.ID}
                  key={field.ID + 'input'}
                  style={{ fontFamily: fonts.medium }}
                  inputContainerStyle={[{ backgroundColor: onErrorFieldColor(field.ID) }, onErrorValidation(field.ID) && { borderRadius: 6, borderWidth: 2, borderColor: 'red' }]}
                  value={values[field?.ID]}
                  onChangeText={handleChange(field?.ID)}
                  type="text"
                  returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                  keyboardType={keyboardType ? keyboardType : 'default'}
                />
                {validationErrorText(field.ID)}
              </View>
            </View>
            {divider()}
          </>
        );
      }
      return null;
    case 'shortname':
      if (showComp) {
        return (
          <>
            {titleRender(field?.Title, field?.IsRequired)}
            <View style={{ flex: 1, width: Dimensions.get('window').width - 32, borderWidth: 0.3, borderColor: 'gray', padding: 8, borderRadius: 10 }}>
              {
                field?.Instructions ? (
                  <View style={{ margin: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 8 }}>
                    <Text style={{ fontFamily: fonts.medium, textAlign: 'left' }}>{field?.Instructions}</Text>
                  </View>
                ) : null
              }
              <View style={{ flex: 1, width: '100%', flexDirection: 'row' }}>
                {
                  field?.SubFields?.map((item, index) => {
                    return (
                      <View style={{ flex: 1, marginRight: index === 0 ? 4 : null, marginLeft: index === 1 ? 4 : 0 }}>
                        <Text style={{ fontFamily: fonts.regular, fontSize: 14 }} placeholder={item?.DefaultVal}>
                          {item?.Label}
                        </Text>
                        <MyInput
                          error={Platform.OS === 'ios' ? false : ''}
                          name={item.ID}
                          key={item.ID + 'input'}
                          returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                          inputContainerStyle={[{ backgroundColor: onErrorFieldColor(item.ID) }, onErrorValidation(item.ID) && { borderRadius: 6, borderWidth: 2, borderColor: 'red' }]}
                          style={{ fontFamily: fonts.medium }}
                          placeholder={item?.Label}
                          value={values[item.ID]}
                          onChangeText={handleChange(item.ID)}
                        />
                        {validationErrorText(item.ID)}
                      </View>
                    );
                  }
                  )
                }
              </View>
            </View>
            {divider()}
          </>
        );
      }
      return null;
    case 'date':
      if (showComp) {
        return (
          <>
            {titleRender(field?.Title, field?.IsRequired)}
            {
              field?.Instructions ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 8 }}>
                  <Text style={{ fontFamily: fonts.medium, textAlign: 'left' }}>{field?.Instructions}</Text>
                </View>
              ) : null
            }
            <DatePicker
              validationError={onErrorValidation(field.ID)}
              format={'MM/DD/YYYY'}
              name={field.ID}
              key={field.ID + 'input'}
              placeholder="Select a date"
              style={{ borderColor: 'red', margin: 8, fontSize: 20, minWidth: Dimensions.get('window').width - 70 }}
              type="datetime"
              value={values[field.ID] ? moment(values[field.ID], 'YYYYMMDD').format('MM/DD/YYYY') : ''}
              setFieldValue={value => setFieldValue(field.ID, value)}
              headerTextIOS={field?.Title}
              inputContainerStyle={[{ backgroundColor: onErrorFieldColor(field.ID) }, onErrorValidation(field.ID) ? { borderRadius: 6, borderWidth: 2, borderColor: 'red' } : { borderWidth: 0 }]}
            />
            {divider()}
          </>
        );
      }
      return null;
    case 'phone':
      if (showComp) {
        return (
          <>
            {titleRender(field?.Title, field?.IsRequired)}
            {
              field?.Instructions ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 8 }}>
                  <Text style={{ fontFamily: fonts.medium, textAlign: 'left' }}>{field?.Instructions}</Text>
                </View>
              ) : null
            }
            <MyInput
              name={field.ID}
              key={field.ID}
              error={Platform.OS === 'ios' ? false : ''}
              inputContainerStyle={[{ backgroundColor: onErrorFieldColor(field.ID) }, onErrorValidation(field.ID) && { borderRadius: 6, borderWidth: 2, borderColor: 'red' }]}
              style={{ fontFamily: fonts.medium, marginRight: 12 }}
              placeholder={field?.Instructions}
              placeholderTextColor={'gray'}
              formatText={(text) => text.replace(/[^+\d]/g, '')}
              maxLength={15}
              value={values[field.ID]}
              onChangeText={value => setFieldValue(field.ID, value.replace(/^0+/, ''))}
              returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
              keyboardType='phone-pad'
            />
            {
              touched[field.ID] && errors[field.ID] && <Text style={{ marginLeft: 16, fontSize: 12, color: 'red' }}>{errors[field.ID] || 'This field is a required field!'}</Text>
            }
            {/* {validationErrorText(field.ID)} */}
            {divider()}
          </>
        );
      }
      return null;
    case 'select':
      if (showComp) {
        const itemList = field.ID === "Field4088" ? field?.Choices : field?.Choices?.slice(1, field?.Choices?.length);
        return (
          <>
            {titleRender(field?.Title, field?.IsRequired)}
            {
              field?.Instructions ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 8 }}>
                  <Text style={{ fontFamily: fonts.medium, textAlign: 'left' }}>{field?.Instructions}</Text>
                </View>
              ) : null
            }
            <View style={[Platform.OS === 'android' ? { borderWidth: 0.3, borderColor: 'gray', borderRadius: 10 } : {}, (touched[field.ID] && errors[field.ID]) ? { borderWidth: 2, borderColor: 'red', borderRadius: 10 } : {}]}>
              {
                Platform.OS === 'ios' ?
                  <NBPicker
                    key={field?.ID}
                    name={field?.ID}
                    mode="dropdown"
                    dropdownIconColor={'red'}
                    placeholderStyle={{ fontFamily: fonts.regular, fontSize: 14 }}
                    iosIcon={<Icon name="arrow-down" />}
                    headerStyle={{ backgroundColor: "#0ea2e2" }}
                    headerBackButtonTextStyle={{ color: "#ffffff" }}
                    headerTitleStyle={{ color: "#ffffff" }}
                    selectedValue={values[field.ID]}
                    onValueChange={(item) => setFieldValue(field.ID, field.ID === "Field4088" ? item?.slice(0, 26) : item)}
                    placeholder={String(field?.Title).length > 30 ? String(field?.Title).substring(0, 30).concat('...') : String(field?.Title)}
                    style={[{ width: Dimensions.get('window').width - 32, height: 54, backgroundColor: onErrorFieldColor(field.ID) }, touched[field.ID] && errors[field.ID] ? {} : { borderWidth: 0.3, borderColor: 'gray' }]}
                  >
                    {
                      itemList?.map((item, index) =>
                        <NBPicker.Item key={item?.Label + index} style={{ fontFamily: fonts.medium }} label={item?.Label} value={item?.Label} />
                      )
                    }
                  </NBPicker> :
                  <Picker
                    key={field?.ID}
                    name={field?.ID}
                    mode="dialog"
                    dropdownIconColor={'red'}
                    placeholderStyle={{ fontFamily: fonts.regular, fontSize: 14 }}
                    iosIcon={<Icon name="arrow-down" />}
                    headerStyle={{ backgroundColor: "#0ea2e2" }}
                    headerBackButtonTextStyle={{ color: "#ffffff" }}
                    headerTitleStyle={{ color: "#ffffff" }}
                    selectedValue={values[field.ID]}
                    onValueChange={(item) => setFieldValue(field.ID, field.ID === "Field4088" ? item?.slice(0, 26) : item)}
                    placeholder={String(field?.Title).length > 30 ? String(field?.Title).substring(0, 30).concat('...') : String(field?.Title)}
                    style={[{ width: Dimensions.get('window').width - 32, height: 54, backgroundColor: onErrorFieldColor(field.ID) }, touched[field.ID] && errors[field.ID] ? {} : { borderWidth: 0.3, borderColor: 'gray' }]}
                  >
                    <Picker.Item key={'placeholderPicker'} value='' style={{ fontFamily: fonts.regular }} label={String(field?.Title).length > 30 ? String(field?.Title).substring(0, 30).concat('...') : String(field?.Title)} />
                    {
                      itemList?.map((item, index) =>
                        <Picker.Item key={item?.Label + index} style={{ fontFamily: fonts.medium }} label={item?.Label} value={item?.Label} />
                      )
                    }
                  </Picker>
              }
            </View>
            {validationErrorText(field.ID, true)}
            {divider()}
          </>
        );
      }
      return null;
    case 'radio':
      if (showComp) {
        return (
          <>
            {titleRender(field?.Title, field?.IsRequired)}
            <View key={field.ID + 'View'} style={[{ backgroundColor: onErrorFieldColor(field.ID), fontFamily: fonts.medium, borderRadius: 10, }, touched[field.ID] && errors[field.ID] ? { borderWidth: 2, borderColor: 'red' } : { borderWidth: 0.4, borderColor: 'gray' }]}>
              {
                field?.Instructions ? (
                  <View style={{ margin: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 8 }}>
                    <Text style={{ fontFamily: fonts.medium, textAlign: 'left' }}>{field?.Instructions}</Text>
                  </View>
                ) : null
              }
              {
                field?.Choices?.map((item, index) => {
                  return (
                    <>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          setFieldValue(field.ID, item.Label);
                          setFieldValue(field.ID + "temp", item.Label);
                        }}
                      >
                        <ListItem>
                          <Left>
                            <Text style={{ fontFamily: fonts.medium }}>{item?.Label}</Text>
                          </Left>
                          <Right>
                            <Radio selectedColor={'#0ea2e2'} selected={values[field.ID + "temp"] === item.Label || values[field.ID] === item.Label} />
                          </Right>
                        </ListItem>
                      </TouchableOpacity>
                      {
                        field.HasOtherField && values[field.ID + "temp"] === field?.Choices?.[field?.Choices?.length - 1]?.Label && index === field?.Choices?.length - 1 ? (
                          <View style={{ margin: 12 }}>
                            <OutlinedTextField
                              error={Platform.OS === 'ios' ? false : ''}
                              name={String(field.ID).concat('temp2')}
                              key={String(field.ID).concat('temp2')}
                              style={{ fontFamily: fonts.medium }}
                              inputContainerStyle={[{ backgroundColor: onErrorFieldColor(field.ID + 'temp2') }, onErrorValidation(field.ID + 'temp2') && { borderRadius: 6, borderWidth: 2, borderColor: 'red' }]}
                              value={values[String(field.ID).concat('temp2')]}
                              onChangeText={text => {
                                handleChange(field?.ID, text);
                                handleChange(field?.ID + "temp2", text);
                                setFieldValue(field?.ID, text);
                                setFieldValue(field?.ID + "temp2", text);
                              }}
                              type="text"
                              maxLength={250}
                              returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                              keyboardType={keyboardType ? keyboardType : 'default'}
                              max
                            />
                            {validationErrorText(String(field.ID).concat('temp2'))}
                          </View>
                        ) : null
                      }
                    </>
                  )
                })
              }
            </View>
            {validationErrorText(field.ID, true)}
            {divider()}
          </>
        );
      }
      return null;
    case 'address':
      if (showComp) {
        return (
          <>
            {titleRender(field?.Title, field?.IsRequired)}
            <View style={{ flex: 1, width: '100%', borderWidth: 0.3, borderColor: 'gray', padding: 8, borderRadius: 10 }}>
              {
                field?.Instructions ? (
                  <View style={{ margin: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 8 }}>
                    <Text style={{ fontFamily: fonts.medium, textAlign: 'left' }}>{field?.Instructions}</Text>
                  </View>
                ) : null
              }
              {
                field?.SubFields?.map(item => {
                  return (
                    <View style={{ marginVertical: 4, flex: 1 }}>
                      <Text style={{ fontFamily: fonts.regular, fontSize: 14 }} placeholder={item?.DefaultVal}>
                        {item?.Label}
                      </Text>
                      <MyInput
                        name={item.ID}
                        key={item.ID + 'input'}
                        error={Platform.OS === 'ios' ? false : ''}
                        returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                        inputContainerStyle={[{ backgroundColor: onErrorFieldColor(item.ID) }, onErrorValidation(item.ID) && { borderRadius: 6, borderWidth: 2, borderColor: 'red' }]}
                        placeholderStyle={{ fontFamily: fonts.regular }}
                        placeholder={field?.Label}
                        style={{ fontFamily: fonts.medium }}
                        value={values[item.ID]}
                        onChangeText={handleChange(item.ID)}
                      />
                      {validationErrorText(item.ID)}
                    </View>
                  );
                })
              }
            </View>
            {divider()}
          </>
        );
      }
      return null;
    case 'email':
      if (showComp) {
        return (
          <>
            {titleRender(field?.Title, field?.IsRequired)}
            {
              field?.Instructions ? (
                <View style={{ margin: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 8 }}>
                  <Text style={{ fontFamily: fonts.medium, textAlign: 'left' }}>{field?.Instructions}</Text>
                </View>
              ) : null
            }
            <View style={{ flex: 1, width: '100%', flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <MyInput
                  name={field.ID}
                  key={field.ID + 'input'}
                  error={Platform.OS === 'ios' ? false : ''}
                  returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                  inputContainerStyle={[{ backgroundColor: onErrorFieldColor(field.ID) }, onErrorValidation(field.ID) && { borderRadius: 6, borderWidth: 2, borderColor: 'red' }]}
                  style={{ fontFamily: fonts.medium }}
                  placeholder={field?.Instructions}
                  value={values[field.ID]}
                  onChangeText={value => {
                    const _val = value.trim();
                    setFieldValue(field.ID, _val);
                  }}
                  keyboardType='email-address'
                />
                {validationErrorText(field.ID)}
              </View>
            </View>
            {divider()}
          </>
        );
      }
      return null;
    case 'time':
      if (showComp) {
        return (
          <>
            {titleRender(field?.Title, field?.IsRequired)}
            {
              field?.Instructions ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 8 }}>
                  <Text style={{ fontFamily: fonts.medium, textAlign: 'left' }}>{field?.Instructions}</Text>
                </View>
              ) : null
            }
            <View style={{ flex: 1, width: '100%', flexDirection: 'row' }}>
              <DatePicker
                validationError={onErrorValidation(field.ID)}
                name={field.ID}
                key={field.ID + 'input'}
                placeholder="Select a time"
                style={{ margin: 8, fontSize: 20, minWidth: Dimensions.get('window').width - 70 }}
                inputContainerStyle={{ backgroundColor: onErrorFieldColor(field.ID) }}
                format={'HH:mm:ss'}
                mode="time"
                value={values[field.ID] ? moment(values[field.ID], 'HH:mm:ss').format('HH:mm:ss') : ''}
                setFieldValue={value => setFieldValue(field?.ID, value)}
                headerTextIOS={field?.Title}
              />
              {validationErrorText(field.ID)}
            </View>
            {divider()}
          </>
        );
      }
      return null;
    case 'checkbox':
      if (showComp) {
        return (
          <>
            {titleRender(field?.Title, field?.IsRequired)}
            <View style={[{ backgroundColor: onErrorFieldColor(field?.ID + 'Obj'), fontFamily: fonts.medium, borderRadius: 10, }, touched[field.ID + 'Obj'] && errors[field.ID + 'Obj'] ? { borderWidth: 2, borderColor: 'red' } : { borderWidth: 0.4, borderColor: 'gray' }]}>
              {
                field?.Instructions ? (
                  <View style={{ margin: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 8 }}>
                    <Text style={{ fontFamily: fonts.medium, textAlign: 'left' }}>{field?.Instructions}</Text>
                  </View>
                ) : null
              }
              {
                field?.SubFields?.map(item => {
                  return (
                    <ListItem>
                      <View style={{ flexDirection: 'row', flex: 1 }}>
                        <CheckBox onPress={() => onPressCheckbox(field, item)} checked={values[item.ID] === item.Label} />
                        <Text style={{ fontFamily: fonts.medium, marginLeft: 16 }}>{item?.Label}</Text>
                      </View>
                    </ListItem>
                  );
                })
              }
            </View>
            {validationErrorText(field.ID + 'Obj', true)}
            {divider()}
          </>
        );
      }
      return null;
    case 'textarea':
      if (showComp) {
        return (
          <>
            {titleRender(field?.Title, field?.IsRequired)}
            {
              field?.Instructions ? (
                <View style={{ margin: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 8 }}>
                  <Text style={{ fontFamily: fonts.medium, textAlign: 'left' }}>{field?.Instructions}</Text>
                </View>
              ) : null
            }
            <Textarea
              name={field.ID}
              key={field.ID + 'input'}
              error={touched[field.ID] && errors[field.ID]}
              inputContainerStyle={{ backgroundColor: onErrorFieldColor(field.ID) }}
              rowSpan={4}
              bordered
              placeholder={field?.Instructions}
              value={values[field.ID]}
              onChangeText={value => setFieldValue(field.ID, value)}
            />
            {/* {validationErrorText(field.ID)} */}
            {divider()}
          </>
        );
      }
      return null;
    case 'number':
      if (showComp) {
        return (
          <>
            {titleRender(field?.Title, field?.IsRequired)}
            {
              field?.Instructions ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 8 }}>
                  <Text style={{ fontFamily: fonts.medium, textAlign: 'left' }}>{field?.Instructions}</Text>
                </View>
              ) : null
            }
            <View style={{ flex: 1, width: '100%', flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <MyInput
                  returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                  name={field.ID}
                  key={field.ID + 'input'}
                  error={Platform.OS === 'ios' ? false : ''}
                  inputContainerStyle={[{ backgroundColor: onErrorFieldColor(field.ID) }, onErrorValidation(field.ID) && { borderRadius: 6, borderWidth: 2, borderColor: 'red' }]}
                  style={{ fontFamily: fonts.medium }}
                  placeholder={field?.Instructions}
                  value={values[field.ID]}
                  onChangeText={handleChange(field.ID)}
                  keyboardType='number-pad'
                />
              </View>
            </View>
            {validationErrorText(field.ID)}
            {divider()}
          </>
        );
      }
      return null;
    default:
      return (
        <>
          <Text>\___/\___/\___/\___/\___/\___/\___/\___/\___/\___/</Text>
          {divider()}
        </>
      );
      break;
  }
}

function divider() {
  return (
    <View style={{ marginVertical: 6, backgroundColor: '#f0f0f0', width: '100%', height: 0 }} />
  );
}