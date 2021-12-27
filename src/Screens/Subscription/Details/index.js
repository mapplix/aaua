import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Platform,
  BackHandler,
  TouchableOpacity,
  Linking,
} from 'react-native';

import I18n from '@aaua/i18n';

import {MainCard, CardItem, Header} from '@aaua/components/common';
import {RATIO, WIDTH_RATIO} from '@aaua/styles/constants';
import {connect} from 'react-redux';
import {getData, buySubscription} from '@aaua/actions/SubscriptionAction';
import {showAlert} from '@aaua/components/Modals';
import DetailsItem from '../DetailsItem';
import {DEVICE_OS, iOS, Android} from '@aaua/actions/constants';
import {Actions} from 'react-native-router-flux';
import CardComponent from '@aaua/components/AAUA_card/CardComponent';

import styles from './styles';

const imgBanner = require('@aaua/images/subscription_banner.png');

const DetailsComponent = () => {

  const {
    textStyle,
    textContainer,
    amountContainer,
    amountStyle,
    imageContainer,
    checkboxesContainer,
    bannerStyle,
  } = styles;
  return (
    <MainCard>
      <Header back goToMain={DEVICE_OS == iOS ? true : false}>
        {I18n.t('subscription_screen.screen_header')}
      </Header>
      <ScrollView>
        <CardItem style={imageContainer}>
          <Image
            resizeMode={'contain'}
            style={bannerStyle}
            source={imgBanner}
          />
        </CardItem>
        <CardItem>
          <View style={styles.textContainer}>
            <Text style={textStyle}>
              {I18n.t('subscription_screen.details.what_is_subscription')}
            </Text>
          </View>
        </CardItem>
        <CardItem>
          <View style={styles.textTitleConteinerStyle}>
            <Text style={styles.textTitleStyle}>
              {I18n.t('subscription_screen.details.tech_help')}
            </Text>
          </View>
        </CardItem>
        <CardItem>
          <View style={styles.textContainer}>
            <Text style={textStyle}>
              {I18n.t('subscription_screen.details.tech_help_description')}
            </Text>
          </View>
        </CardItem>
        <CardItem>
          <View style={styles.textTitleConteinerStyle}>
            <Text style={styles.textTitleStyle}>
              {I18n.t('subscription_screen.details.car_evacuation')}
            </Text>
          </View>
        </CardItem>
        <CardItem>
          <View style={styles.textContainer}>
            <Text style={textStyle}>
              {I18n.t('subscription_screen.details.car_evacuation_point_1')}
            </Text>
            <Text style={textStyle}>
              {I18n.t('subscription_screen.details.car_evacuation_point_2')}
            </Text>
            <Text style={textStyle}>
              {I18n.t('subscription_screen.details.car_evacuation_point_3')}
            </Text>
            <Text style={textStyle}>
              {I18n.t('subscription_screen.details.car_evacuation_point_4')}
            </Text>
            <Text style={textStyle}>
              {I18n.t('subscription_screen.details.car_evacuation_cost')}
            </Text>
          </View>
        </CardItem>
        <CardItem>
          <View style={styles.textTitleConteinerStyle}>
            <Text style={styles.textTitleStyle}>
              {I18n.t('subscription_screen.details.fuel_delivery')}
            </Text>
          </View>
        </CardItem>
        <CardItem>
          <View style={styles.textContainer}>
            <Text style={textStyle}>
              {` ${I18n.t('subscription_screen.details.fuel_delivery_description')}

- ${I18n.t('subscription_screen.details.fuel_delivery_description_point_1')}

- ${I18n.t('subscription_screen.details.fuel_delivery_description_point_2')}
`}
            </Text>
          </View>
        </CardItem>
        <CardItem>
          <View style={styles.textTitleConteinerStyle}>
            <Text style={styles.textTitleStyle}>
              {I18n.t('subscription_screen.details.start_engine.title')}
            </Text>
          </View>
        </CardItem>
        <CardItem>
          <View style={styles.textContainer}>
            <Text style={textStyle}>
              {`
${I18n.t('subscription_screen.details.start_engine.description')}

- ${I18n.t('subscription_screen.details.start_engine.point_1')}

- ${I18n.t('subscription_screen.details.start_engine.point_2')}

- ${I18n.t('subscription_screen.details.start_engine.point_3')}
`}
            </Text>
          </View>
        </CardItem>
        <CardItem>
          <View style={styles.textTitleConteinerStyle}>
            <Text style={styles.textTitleStyle}>
              {I18n.t('subscription_screen.details.wheel_change.title')}
            </Text>
          </View>
        </CardItem>
        <CardItem>
          <View style={styles.textContainer}>
            <Text style={textStyle}>
              {`${I18n.t('subscription_screen.details.wheel_change.description')}

- ${I18n.t('subscription_screen.details.wheel_change.point_1')}

- ${I18n.t('subscription_screen.details.wheel_change.point_2')}

- ${I18n.t('subscription_screen.details.wheel_change.point_3')}
`}
            </Text>
          </View>
        </CardItem>
        <CardItem>
          <View style={styles.textTitleConteinerStyle}>
            <Text style={styles.textTitleStyle}>
              {I18n.t('subscription_screen.details.emergancy_door_open.title')}
            </Text>
          </View>
        </CardItem>
        <CardItem>
          <View style={styles.textContainer}>
            <Text style={textStyle}>
              {`${I18n.t(
                'subscription_screen.details.emergancy_door_open.description',
              )}

- ${I18n.t('subscription_screen.details.emergancy_door_open.point_1')}

- ${I18n.t('subscription_screen.details.emergancy_door_open.point_2')}
`}
            </Text>
          </View>
        </CardItem>

        <CardItem>
          <View style={styles.textTitleConteinerStyle}>
            <Text style={styles.textTitleStyle}>
              {I18n.t('subscription_screen.details.legal_help.title')}
            </Text>
          </View>
        </CardItem>
        <CardItem style={{flexDirection: 'column'}}>
          <View style={styles.textContainer}>
            <Text style={textStyle}>
              {`${I18n.t('subscription_screen.details.legal_help.description')}

- ${I18n.t('subscription_screen.details.legal_help.point_1')}

- ${I18n.t('subscription_screen.details.legal_help.point_2')}

- ${I18n.t('subscription_screen.details.legal_help.point_3')}

- ${I18n.t('subscription_screen.details.legal_help.point_4')}

- ${I18n.t('subscription_screen.details.legal_help.point_5')}

- ${I18n.t('subscription_screen.details.legal_help.point_6')}

- ${I18n.t('subscription_screen.details.legal_help.point_7')}
`}
            </Text>
          </View>
        </CardItem>
        <CardItem style={{flexDirection: 'column'}}>
          <View style={styles.textContainer}>
            <Text style={styles.textTitleStyle}>
              {I18n.t('subscription_screen.details.legal_help.notice.title')}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={textStyle}>
              {`
- ${I18n.t('subscription_screen.details.legal_help.notice.point_1')}

- ${I18n.t('subscription_screen.details.legal_help.notice.point_2')}

- ${I18n.t('subscription_screen.details.legal_help.notice.point_3')}
`}
            </Text>
          </View>
        </CardItem>
        <CardItem>
          <View style={styles.textTitleConteinerStyle}>
            <Text style={styles.textTitleStyle}>
              {I18n.t('subscription_screen.details.consultation.title')}
            </Text>
          </View>
        </CardItem>
        <CardItem
          style={{
            paddingTop: 10,
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}>
          <View style={styles.textContainer}>
            <Text style={[textStyle, {fontSize: 18}]}>
              {I18n.t(
                'subscription_screen.details.consultation.location_information.title',
              )}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={textStyle}>
              {`-${I18n.t(
                'subscription_screen.details.consultation.location_information.point_1',
              )}

-${I18n.t('subscription_screen.details.consultation.location_information.point_2')}

-${I18n.t('subscription_screen.details.consultation.location_information.point_3')}

-${I18n.t('subscription_screen.details.consultation.location_information.point_4')}

-${I18n.t('subscription_screen.details.consultation.location_information.point_5')}

-${I18n.t('subscription_screen.details.consultation.location_information.point_6')}

-${I18n.t('subscription_screen.details.consultation.location_information.point_7')}

-${I18n.t('subscription_screen.details.consultation.location_information.point_8')}

-${I18n.t('subscription_screen.details.consultation.location_information.point_9')}
`}
            </Text>
          </View>
        </CardItem>
        <CardItem
          style={{
            paddingTop: 10,
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}>
          <View style={styles.textContainer}>
            <Text style={[textStyle, {fontSize: 18}]}>
            {I18n.t('subscription_screen.details.consultation.consultation.title')}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={textStyle}>
              {`-${I18n.t('subscription_screen.details.consultation.consultation.point_1')}

-${I18n.t('subscription_screen.details.consultation.consultation.point_2')}

-${I18n.t('subscription_screen.details.consultation.consultation.point_3')}
`}
            </Text>
          </View>
        </CardItem>
        <CardItem
          style={{
            paddingTop: 10,
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}>
          <View style={styles.textContainer}>
            <Text style={[textStyle, {fontSize: 18}]}>
            {I18n.t('subscription_screen.details.consultation.crash_consultation.title')}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={textStyle}>
              {`-${I18n.t('subscription_screen.details.consultation.crash_consultation.point_1')}

-${I18n.t('subscription_screen.details.consultation.crash_consultation.point_2')}

-${I18n.t('subscription_screen.details.consultation.crash_consultation.point_3')}

-${I18n.t('subscription_screen.details.consultation.crash_consultation.point_4')}

-${I18n.t('subscription_screen.details.consultation.crash_consultation.point_5')}

-${I18n.t('subscription_screen.details.consultation.crash_consultation.point_6')}
`}
            </Text>
          </View>
        </CardItem>
        <CardItem>
          <View style={styles.textTitleConteinerStyle}>
            <Text style={styles.textTitleStyle}>
            {I18n.t('subscription_screen.details.organization_services.title')}
            </Text>
          </View>
        </CardItem>
        <CardItem
          style={{
            paddingTop: 10,
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}>
          <View style={styles.textContainer}>
            <Text style={[textStyle, {fontSize: 18}]}>
            {I18n.t('subscription_screen.details.organization_services.description')}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={textStyle}>
              {`-${I18n.t('subscription_screen.details.organization_services.point_1')}

-${I18n.t('subscription_screen.details.organization_services.point_2')}

-${I18n.t('subscription_screen.details.organization_services.point_3')}

-${I18n.t('subscription_screen.details.organization_services.point_4')}

-${I18n.t('subscription_screen.details.organization_services.point_5')}

-${I18n.t('subscription_screen.details.organization_services.point_6')}

-${I18n.t('subscription_screen.details.organization_services.point_7')}

-${I18n.t('subscription_screen.details.organization_services.point_8')}

-${I18n.t('subscription_screen.details.organization_services.point_9')}

-${I18n.t('subscription_screen.details.organization_services.point_10')}

-${I18n.t('subscription_screen.details.organization_services.point_11')}
`}
            </Text>
          </View>
        </CardItem>
        <CardItem>
          <View style={styles.textContainer}>
            <Text style={styles.textTitleStyle}>Термін дії пакету:</Text>
          </View>
          <View style={styles.textContainer}>
            <Text> 1 рік.</Text>
          </View>
        </CardItem>
        <CardItem>
          <View style={styles.textContainer}>
            <Text style={styles.textTitleStyle}>Час надання послуг:</Text>
          </View>
          <View style={styles.textContainer}>
            <Text> цілодобово </Text>
          </View>
        </CardItem>
        <CardItem>
          <View style={styles.textContainer}>
            <Text style={styles.textTitleStyle}>Територія покриття:</Text>
          </View>
          <View style={styles.textContainer}>
            <Text> вся Україна</Text>
          </View>
        </CardItem>
      </ScrollView>
    </MainCard>
  );
};

// const styles = {
//   amountContainer: {
//     alignItems: 'flex-start',
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },
//   amountStyle: {
//     fontFamily: 'SFUIText-Regular',
//     fontSize: 35,
//     color: '#1B1B1B',
//   },
//   textStyle: {
//     fontFamily: 'SFUIText-Regular',
//     alignSelf: 'stretch',
//     fontSize: 13,
//     fontWeight: '500',
//     color: '#1B1B1B',
//     paddingBottom: 15,
//   },
//   textContainer: {
//     top: 0,
//     paddingRight: 27,
//     paddingLeft: 32,
//     // paddingBottom: 33
//   },
//   imageContainer: {
//     flex: 0,
//     height: 171 * RATIO,
//     flexDirection: 'column',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   textTitleConteinerStyle: {
//     width: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 50,
//   },
//   textTitleStyle: {
//     color: '#1f1f1f',
//     fontSize: 20,
//     fontWeight: '600',
//   },
//   bannerStyle: {
//     width: 267,
//     height: 153,
//   }
// };

const mapStateToProps = ({subscription, auth, citiesBrands}) => {
  return {
    price: subscription.price,
    bought_at: subscription.bought_at,
    loading: subscription.loading,
    token: auth.user.token,
    images: citiesBrands.sliderImages,
  };
};

export default connect(mapStateToProps, {getData, buySubscription})(
  DetailsComponent,
);
