import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
import {DEVICE_OS, iOS} from '../../actions/constants';

class CreditCardInput extends Component {
  state = {
    currentText: '',
  };

  handleChange(text) {
    const validNumber = text.replace(/\-/g, '');
    let string = text;
    if (
      validNumber.length == 5 ||
      validNumber.length == 9 ||
      validNumber.length == 13
    ) {
      let start = 0;
      let end = text.length - 1;
      let stringBegin = text.slice(start, end);
      string = stringBegin + '-' + text.slice(-1);
      if (stringBegin.slice(-1) == '-') {
        string = text.slice(start, end - 1) + '-' + text.slice(-1);
      }

      this.setState({currentText: string});
    }

    this.props.onChangeText(string);
  }

  render() {
    const {inputStyle, labelStyle, containerStyle} = styles;
    const {label, placeholder, value} = this.props;
    return (
      <View style={containerStyle}>
        <Text style={[labelStyle, this.props.labelStyle]}>{label}</Text>
        <View
          style={{
            minHeight: 43,
            height: 40,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextInput
            {...this.props}
            placeholderTextColor="#b6b9bf"
            multiline={false}
            maxLength={19}
            keyboardType="phone-pad"
            placeholder={placeholder}
            value={value}
            onChangeText={text => this.handleChange(text)}
            style={inputStyle}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    // backgroundColor: '#909087',
    height: 65,
    marginLeft: 45,
    marginRight: 45,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  inputStyle: {
    // placeholderTextColor: '#b6b9bf',
    fontFamily: 'SFUIText-Regular',
    color: '#111',
    fontSize: 15,
    // lineHeight: 20,
    // flex: 1,
    width: '100%',
    borderBottomWidth: DEVICE_OS == iOS ? 1 : 0,
    borderBottomColor: '#000',
    // backgroundColor: '#193',
  },
  labelStyle: {
    marginLeft: 4,
    marginBottom: 2,
    paddingTop: 0,
    height: 22,
    fontFamily: 'SFUIText-Regular',
    fontSize: 14,
    alignSelf: 'stretch',
    color: '#423486',
  },
};

export {CreditCardInput};
