import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {MainCard, CardItem, Header} from '../common';
import {BASE_URL} from '../../actions/constants';

class MarkerInfo extends Component {
  renderServices() {
    const {priceText, serviceText, serviceContainer} = styles;
    if (this.props.services) {
      return this.props.services.map(service => {
        return (
          <View style={serviceContainer} key={service.name}>
            <Text style={serviceText}>{service.name}</Text>
            <Text style={priceText}>{service.price}</Text>
          </View>
        );
      });
    }
  }

  render() {
    const {
      contactsContainer,
      servicesWrapper,
      contactRow,
      iconWrapper,
      contactsText,
    } = styles;
    const {title, img, rezhim, website, address, phones} = this.props;
    console.log('--rendr ',this.props);
    return (
      <MainCard>
        <Header back>{title || ''}</Header>
        <CardItem
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
            //   justifyContent: 'center',
            //   alignItems: 'center',
            //   maxWidth: '75%',
            }}>
            <Image
            //   resizeMethod="scale"
            //   resizeMode="stretch"
              style={{
                width: null,
                height: '100%',
                resizeMode: 'contain'
              }}
              source={{uri: BASE_URL + img}}
            />
          </View>
        </CardItem>
        <CardItem>
          <View style={contactsContainer}>
            <View style={contactRow}>
              <View style={iconWrapper}>
                <Image
                  style={{
                    width: 21,
                    height: 21,
                  }}
                  source={require('../../images/icons/markerPhone.png')}
                />
              </View>
              <Text style={contactsText}>{phones}</Text>
            </View>
            <View style={contactRow}>
              <View style={iconWrapper}>
                <Image
                  style={{
                    width: 15,
                    height: 21,
                  }}
                  source={require('../../images/icons/markerAddress.png')}
                />
              </View>
              <Text style={contactsText}>{address}</Text>
            </View>

            <View style={contactRow}>
              <View style={iconWrapper}>
                <Image
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  source={require('../../images/icons/webSite.png')}
                />
              </View>
              <Text style={contactsText}>{website}</Text>
            </View>
            <View style={contactRow}>
              <View style={iconWrapper}>
                <Image
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  source={require('../../images/icons/rezhim.png')}
                />
              </View>
              <Text style={contactsText}>{rezhim}</Text>
            </View>
          </View>
        </CardItem>
        <CardItem>
          <View style={servicesWrapper}>{this.renderServices()}</View>
        </CardItem>
      </MainCard>
    );
  }
}

const styles = {
  cardStyle: {
    marginRight: 30,
    marginLeft: 30,
  },
  servicesWrapper: {
    flex: 1,
    // backgroundColor: '#288',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingRight: 15,
    paddingLeft: 15,
  },
  serviceContainer: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#adada4',
    borderWidth: 1,
    borderRadius: 8,
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 8,
    backgroundColor: 'rgb(233, 233, 233)',
  },
  priceText: {
    fontFamily: 'SFUIText-Bold',
    fontSize: 21,
    color: '#423486',
  },
  serviceText: {
    fontSize: 16,
    color: '#1b1b1b',
    fontWeight: '500',
  },
  contactsContainer: {
    flex: 1,
    paddingBottom: 25,
    paddingTop: 27,
    paddingLeft: 15,
    paddingRight: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  contactRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingRight: 15,
    minHeight: 30,
  },
  iconWrapper: {
    marginRight: 23,
  },
  contactsText: {
    fontFamily: 'SFUIText-Regular',
    fontSize: 16,
    color: '#1b1b1b',
  },
};

export default MarkerInfo;
