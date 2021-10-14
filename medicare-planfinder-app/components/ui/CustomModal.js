import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Modal, Dimensions, Platform } from 'react-native';
import LottieView from 'lottie-react-native';

import { fonts } from '../../src/utils/styles';


export default class CustomModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  showButtons() {
    if (this.props.closeButtonText && this.props.confirmButtonText) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#5eaaa8", flex: 1, height: 50, marginRight: 8 }}
            onPress={this.props.confirmButtonAction}
          >
            <Text style={styles.textStyle}>{this.props.confirmButtonText}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#ff4646", flex: 1, height: 50, marginLeft: 8 }}
            onPress={this.props.closeButtonAction}
          >
            <Text style={styles.textStyle}>{this.props.closeButtonText}</Text>
          </TouchableHighlight>
        </View>
      );
    } else {
      return (
        <View style={{ height: 50 }}>
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#5eaaa8", flex: 1, marginRight: 8 }}
            onPress={this.props.confirmButtonAction}
          >
            <Text style={styles.textStyle}>{this.props.confirmButtonText}</Text>
          </TouchableHighlight>
        </View>
      );
    }
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
      >
        <View style={styles.centeredView}>
          <View style={{ flex: 1 }} />
          <View style={[styles.modalView, this.props.style ? this.props.style : {}]}>
            <LottieView
              loop={false}
              source={this.props.source}
              autoPlay
              style={{ width: 120, height: 120 }}
            />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.modalText}>{this.props.modalText}</Text>
            </View>
            {this.showButtons()}
          </View>
          <View style={{ flex: 1 }} />
        </View>
      </Modal>
    );
  }
}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  modalView: {
    alignItems: "center",
    justifyContent: "space-between",
    width: Dimensions.get('window').width - 40,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F194FF",
    borderRadius: 8,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontSize: 17,
    fontFamily: fonts.semiBold,
    textAlign: "center"
  },
  modalText: {
    fontSize: Platform.OS === "android" ? 20 : 22,
    fontFamily: fonts.bold,
    textAlign: "center"
  }
});