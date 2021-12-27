import React, {useState} from 'react';
import {View, Text, Image, TouchableHighlight} from 'react-native';
import {SvgXml} from 'react-native-svg';

import styles from './styles';

const CheckBox = props => {
  const {
    onChange,
    checked,
    label,
    disabled,
    checkedImage,
    uncheckedImage,
    underlayColor,
    containerStyle,
    checkboxStyle,
    labelStyle,
    customLabel,
    labelLines,
  } = props;

  const [internalChecked, setInternalChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(disabled);

  const handleChange = () => {
    if (onChange && typeof checked === 'boolean') {
      onChange(checked);
    } else {
      //   let internalChecked = internalChecked;
      let newState = !internalChecked;

      if (onChange) {
        onChange(newState);
      }
      setInternalChecked(newState);
    }
  };
  //   componentWillMount() {
  //     this.setState(this.baseState);
  //   }

  let source;

  if (typeof checked === 'boolean') {
    source = checked ? checkedImage : uncheckedImage;
  } else {
    source = internalChecked ? checkedImage : uncheckedImage;
  }

  return (
    <TouchableHighlight
      onPress={handleChange}
      underlayColor={underlayColor}
      style={styles.flexContainer}
      disabled={isDisabled}>
      <View style={[styles.container, containerStyle]}>
        <SvgXml xml={source} width={20} height={20} />
        {/* <Image style={[styles.checkbox, checkboxStyle]} source={source} /> */}
        <View style={styles.labelContainer}>
          {customLabel ? (
            <View style={styles.labelContainer}>{customLabel}</View>
          ) : (
            <View style={styles.labelContainer}>
              <Text
                numberOfLines={labelLines}
                style={[styles.label, labelStyle]}>
                {label}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableHighlight>
  );
};

CheckBox.defaultProps = {
  labelLines: 1,
  labelBefore: false,
  checked: null,
  underlayColor: 'transparent',
};

export {CheckBox};
