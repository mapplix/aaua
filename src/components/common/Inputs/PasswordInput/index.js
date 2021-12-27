import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import I18n from '@aaua/i18n';

import TextInput from '@aaua/components/common/Inputs/TextInputWithLabel';

import styles from './styles';

const PasswordInput = props => {

  // const {t} = useTranslation();

  const [hidePass, setHidePass] = useState(true);

  const managePasswordVisibility = () => {
    setHidePass(!hidePass);
  };

  const {inputWrapper, wrapper, input, btnImage, visibilityBtn} = styles;
  const {label, placeholder, value, onChangeText} = props;
  return (
    <View style={wrapper}>
      <View style={inputWrapper}>
        <TextInput
          label={label || I18n.t('labels.password')}
          placeholderTextColor="#b6b9bf"
          placeholder={placeholder || I18n.t('placeholders.password')}
          secureTextEntry={hidePass}
          value={value}
          onChangeText={onChangeText}
          style={input}
        />
      </View>

      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={visibilityBtn}
          onPress={managePasswordVisibility}>
          <Image
            source={
              hidePass
                ? require('@aaua/images/hide.png')
                : require('@aaua/images/view.png')
            }
            style={btnImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordInput;
