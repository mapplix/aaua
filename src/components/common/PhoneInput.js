import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
import {DEVICE_OS, iOS} from '../../actions/constants';

class PhoneInput extends Component {
  state = {
    value: this.props.value,
  };

  handleChange(text) {
    if (text.length <= 1) {
      text = '+380' + text;
    }

    this.props.onChangeText(text);
  }

  handleOnFocus() {
    if (this.props.value == '') {
      this.props.onChangeText('+380');
    }
  }

  render() {
    const {inputStyle, labelStyle, containerStyle} = styles;
    const {label, placeholder, value, secureTextEntry} = this.props;

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
            onFocus={
              this.props.onFocus
                ? this.props.onFocus
                : this.handleOnFocus.bind(this)
            }
            placeholderTextColor="#b6b9bf"
            multiline={false}
            maxLength={13}
            keyboardType="phone-pad"
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
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
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  inputStyle: {
    // placeholderTextColor: '#b6b9bf',
    fontFamily: 'SFUIText-Regular',
    color: '#111',
    fontSize: 15,
    lineHeight: 18,
    flex: 1,
    paddingLeft: 0,
  },
  labelStyle: {
    // marginLeft: 4,
    marginBottom: 2,
    paddingTop: 0,
    height: 22,
    fontFamily: 'SFUIText-Medium',
    fontSize: 14,
    color: '#423486',
    alignSelf: 'stretch',
  },
};

export {PhoneInput};
