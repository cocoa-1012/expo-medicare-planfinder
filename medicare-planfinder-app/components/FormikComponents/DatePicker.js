import React from "react";
import { Dimensions, View } from 'react-native'
import DisableKeyboard from "react-native-formik/src/withPickerValues/DisableKeyboard";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';
import { OutlinedTextField as MaterialTextInput } from "react-native-material-textfield";
import { fonts } from "../../src/utils/styles";
import { Icon, Text } from "native-base";
class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerOpened: false,
    }
  }

  openPicker = () => this.setState({ pickerOpened: true });

  closePicker = () => this.setState({ pickerOpened: false });

  handleDatePicked = value => {
    const format = this.props?.format ? this.props.format : 'MM/DD/YYYY';
    const _value = moment(value).format(format)
    if (this.props.type === 'datetime') {
      this.props.setFieldValue(moment(_value, format).format('YYYYMMDD'));
    } else {
      this.props.setFieldValue(moment(_value, format).format(format));
    }
    this.mti.state.text = _value;
    this.closePicker();
  };

  render() {
    return (
      <React.Fragment>
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <DisableKeyboard onPress={this.openPicker}>
            <MaterialTextInput
              key={Math.random()}
              style={{ fontFamily: fonts.medium }}
              labelTextStyle={{ fontFamily: fonts.medium, alignSelf: 'center' }}
              ref={mti => this.mti = mti}
              value={this.props.value}
              placeholder={this.props.placeholder}
              inputContainerStyle={[this.props.validationError ? { borderRadius: 6, borderWidth: 2, borderColor: 'red' } : { borderWidth: 0 }, this.props.inputContainerStyle, { width: Dimensions.get('window').width - 64 }]}
            />
            {
              this.props.validationError && <Text style={{ marginLeft: 16, fontSize: 12, color: 'red' }}>{'This field is a required field!'}</Text>
            }
          </DisableKeyboard>
          <Icon onPress={this.openPicker} style={{ marginLeft: 8, color: this.props.validationError ? 'red' : 'black' }} name={this.props.mode === 'time' ? 'time' : 'calendar'} />
        </View>
        <DateTimePicker
          display={'spinner'}
          value={this.props.value}
          isVisible={this.state.pickerOpened}
          onConfirm={this.handleDatePicked}
          onCancel={this.closePicker}
          {...this.props}
        />
      </React.Fragment>
    );
  }
}

export default DatePicker;
