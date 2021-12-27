import React, {Component} from 'react';
import {View, Picker, Text} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown-v2';

class DropDown extends Component {
  renderList() {
    const {inputStyle} = styles;
    const {selected, onValueChange, elements} = this.props;
    if (elements.length) {
      const value = selected != null ? selected : elements[0];
      return (
        <Dropdown
          containerStyle={{
            flex: 1,
            padding: 0,
            margin: 0,
            alignSelf: 'stretch',
          }}
          itemCount={this.props.itemCount || 4}
          fontSize={this.props.fontSize ? this.props.fontSize : 16}
          labelExtractor={label => label.title}
          valueExtractor={
            this.props.valueExtractor
              ? this.props.valueExtractor
              : value => value.value
          }
          onChangeText={onValueChange}
          value={value.title}
          data={elements}
        />
      );
    }
  }

  componentDidMount() {
    if (this.props.elements.length >= 1 && this.props.selected == null) {
      if (this.props.setDefaultValueToStore) {
        this.props.setDefaultValueToStore(this.props.elements[0]);
      }
    }
  }

  render() {
    const {containerStyle, labelStyle, pickerWrapper} = styles;
    return (
      <View style={containerStyle}>
        <Text style={labelStyle}>{this.props.label}</Text>
        <View style={pickerWrapper}>{this.renderList()}</View>
      </View>
    );
  }
}

const styles = {
  inputStyle: {
    color: '#111',
    flex: 1,
    alignSelf: 'stretch',
  },
  labelStyle: {
    marginLeft: 4,
    paddingTop: 2,
    height: 22,
    fontFamily: 'SFUIText-Medium',
    fontSize: 14,
    color: '#423486',
    alignSelf: 'stretch',
  },
  containerStyle: {
    height: 90,
    marginLeft: 45,
    marginRight: 45,
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  pickerWrapper: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    minHeight: 40,
    height: 40,
    alignItems: 'center',
    // borderBottomColor: '#050505',
    // borderBottomWidth: 1,
  },
};
export {DropDown};
