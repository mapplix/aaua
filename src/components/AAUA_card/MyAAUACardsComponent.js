import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Image, Text, TouchableOpacity, Alert} from 'react-native';

import {deleteCard, getMyCard} from '@aaua/actions/AAUA_CardAction';
import {MainCard, CardItem, Header, Spiner} from '@aaua/components/common';

const MyAAUACardsComponent = () => {
  const dispatch = useDispatch();

  const {
    AAUA_Card: {myCards, loading},
    auth: {
      user: {token, card},
    },
  } = useSelector(state => state);

  const onDeleteCard = id => {
    dispatch(deleteCard(id));
  };

  useEffect(() => {
    dispatch(getMyCard(token));
  }, []);
  //   componentWillMount() {
  //     this.props.getMyCard(this.props.token);
  //   }

  console.log(' MyAAUACard component render ---');
  const {textStyle, cardNumberStyle, cardNumberTextStyle, numberContainer} =
    styles;
  if (!loading) {
    return (
      <MainCard>
        <Header burger>{'КАРТА AAUA'}</Header>
        <CardItem
          style={{
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <View
            style={{
              alignSelf: 'stretch',
              marginTop: 45,
              flex: 1,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 17,
              }}>
              <Text style={textStyle}>ВАША КАРТА</Text>
            </View>
            <View style={numberContainer}>
              <View style={cardNumberStyle}>
                <Text style={cardNumberTextStyle}>{myCard}</Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 3,
                  marginLeft: 15,
                }}>
                <TouchableOpacity onPress={() => onDeleteCard(2)}>
                  <Text>X</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </CardItem>
      </MainCard>
    );
  } else {
    return <Spiner />;
  }
};

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: 'SFUIText-Bold',
    fontSize: 12,
    color: '#1b1b1b',
  },
  cardNumberTextStyle: {
    fontFamily: 'SFUIText-Bold',
    fontSize: 18,
    color: '#1b1b1b',
  },
  cardNumberStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 25,
  },
  numberContainer: {
    marginRight: 13,
    marginLeft: 13,
    flex: 1,
    borderWidth: 1,
    maxHeight: 47,
    backgroundColor: '#e9e9e9',
    borderColor: '#a8a89f',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
};


export default MyAAUACardsComponent;
