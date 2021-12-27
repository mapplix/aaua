import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import ImageSlider from 'react-native-image-slider';
import {useSelector, useDispatch} from 'react-redux';

import I18n from '@aaua/i18n';

import {BottomMenuItem} from '@aaua/components/common/BottomMenuItem';
import {getSliderImages, getBonusesWog} from '@aaua/actions/CitiesBrands';
import {countMessages} from '@aaua/actions/MessagesActions';

import styles from './styles';

import {
  MainCard,
  CardItem,
  BottomMenu,
  Header,
  BottomMenuMessages,
} from '@aaua/components/common';

const HomeScreen = props => {
  const {width: windowWidth} = useWindowDimensions();

  const {auth, citiesBrands, messages} = useSelector(state => state);
  const user = auth.user;
  const bonus = auth.user ? citiesBrands.bonuses : 0;
  const bonus_wog = auth.user ? citiesBrands.bonuses_wog : 0;
  const images = citiesBrands.sliderImages;
  const messagesCounter = messages.messagesCounter;

  const {sliderImageWrapper, bottomButton, customSlide, customImage} = styles;

  const dispatch = useDispatch();

  useEffect(() => {
    if (user && images.length < 1) {
      let {token} = user;
      dispatch(getSliderImages(token));
      dispatch(countMessages(token));
      dispatch(getBonusesWog(token));
    }
  }, [user, images]);

  return (
    <MainCard>
      <Header burger>{'AAUA'}</Header>
      <View
        style={{
          flex: 1,
        }}>
        <ImageSlider
          images={images}
          autoPlayWithInterval={4000}
          customSlide={({index, item, style, width}) => {
            return (
              <TouchableWithoutFeedback
                onPress={item => {
                  Actions.imageContent({
                    images: images,
                    index: index,
                  });
                }}
                key={index}>
                <View style={[style, customSlide]}>
                  <Image source={{uri: item.url}} style={customImage} />
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
      </View>
      <View
        style={{
          height: 70,
          // backgroundColor: '#193'
        }}>
        <BottomMenu>
          <BottomMenuItem
            style={bottomButton}
            counter={bonus_wog}
            imageSrc={require('@aaua/images/icons/wog.png')}>
            {I18n.t('bottomMenu.bonus_wog')}
          </BottomMenuItem>
          <BottomMenuItem
            style={bottomButton}
            counter={bonus}
            imageSrc={require('@aaua/images/icons/aaua.png')}>
            {I18n.t('bottomMenu.bonus_aaua')}
          </BottomMenuItem>
          <BottomMenuMessages
            counter={messagesCounter}
            onPress={Actions.messages}
            imageSrc={require('@aaua/images/icons/mail.png')}>
            {I18n.t('bottomMenu.messages')}
          </BottomMenuMessages>
        </BottomMenu>
      </View>
    </MainCard>
  );
};

export default HomeScreen;
