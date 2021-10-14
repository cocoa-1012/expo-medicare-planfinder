import React from 'react';
import { View } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { fonts } from '../../src/utils/styles';

const labels = ["Page 1", "Page 2", "Page 3", "Page 4"];
const customStyles = {
  stepIndicatorSize: 36,
  currentStepIndicatorSize: 36,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 4,
  stepStrokeCurrentColor: '#f05454',
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: '#5eaaa8',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#5eaaa8',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#5eaaa8',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 14,
  currentStepIndicatorLabelFontSize: 14,
  stepIndicatorLabelCurrentColor: '#f05454',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 14,
  currentStepLabelColor: '#f05454',
}

export default class CustomStepIndicator extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ marginTop: 16, borderBottomWidth: 1.5, marginBottom: 4, paddingBottom: 8, borderColor: '#eeeeee' }}>
        <StepIndicator
          stepCount={4}
          customStyles={customStyles}
          currentPosition={this.props.currentPagePosition}
          labels={labels}
        />
      </View>
    );
  }
}