import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Alert, FlatList} from 'react-native';
import {
  MainCard,
  CardItem,
  Header,
  ModalCard,
  Spiner, ButtonRoundet
} from '../common';
import {Actions} from 'react-native-router-flux';
import {RATIO, WIDTH_RATIO} from '../../styles/constants'
import {getMyCard, orderCard, getAZSList} from '../../actions/AAUA_CardAction';
import {connect} from 'react-redux';
import {DEVICE_OS, iOS, BASE_URL} from '../../actions/constants';
import AZSComponent from "./AZSComponent";

class AZSListScreen extends Component {

    state = {
        isOpen: false,
      azs: [
        {
          id:"1",
          img:"/images/_placeholder.png",
          intro:"3 грн/л. - бензин, ДТ 0,7 грн/л. - газ",
          title:"WOG"
        },
      ]
    };

    componentDidMount() {
      let {token} = this.props;
      this.props.getAZSList(token)
    }

    render() {
      console.log("redner list", this.props.azs)
        const {modal, modalTextContainer, modalText} = styles;
        return (
            <MainCard>
                <Header burger goToMain={DEVICE_OS == iOS ? true : false}>
                    {"ТОПЛИВО"}
                </Header>
                <CardItem style={{
                    flex: 4,
                    paddingTop: 21 * RATIO,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start'
                }}>
                  <FlatList
                    horizontal={false}
                    numColumns={2}
                    columnWrapperStyle={{
                      flex: 1,
                      justifyContent: 'flex-start',
                    }}
                    keyExtractor={item => item.id}
                    data={this.props.azs.data}
                    renderItem={({item}) => {
                      return (
                        <AZSComponent
                          key={item.id+item.title}
                          onPress={Actions.AAUA_main}
                          imageSrc={{uri:`${BASE_URL}${item.img}`}}
                          intro={item.intro}
                        >
                          {
                            item.title
                          }
                        </AZSComponent>
                      )
                    }}
                  />
                </CardItem>
            </MainCard>
        )
    }
}

const styles = {
    modal: {
        height: 270,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    modalText: {
        fontFamily: 'SFUIText-Regular',
        fontSize: 19,
        color:'#423485'
    },
    modalTextContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    }
}

const mapStateToProps = ({auth, AAUA_Card}) => {
  return {
    token: auth.user.token,
    azs: AAUA_Card.azs
  }
}

export default connect(mapStateToProps, {getAZSList})(AZSListScreen);