import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Platform,
  BackHandler,
  TouchableOpacity,
  Linking,
  TextInput,
} from "react-native";
import { MainCard, CardItem, ButtonRoundet, Header, Spiner } from "../common";
import { RATIO, WIDTH_RATIO } from "../../styles/constants";
import { connect } from "react-redux";
import { getData, buySubscription } from "../../Actions/SubscriptionAction";
import { showAlert } from "../Modals";
import DetailsItem from "./DetailsItem";
import { DEVICE_OS, iOS, Android } from "../../Actions/constants";
import { Actions } from "react-native-router-flux";
import ModalAddAutoNumber from "../../components/Modals/AddAutoNumber";

const imgBanner = require("../../images/subscription_banner.png");

class SubscriptionComponent extends Component {
  constructor(props) {
    super(props);
    this.addToBalance = this.addToBalance.bind(this);
    this.state = {
      showModalNumber: false,
    };
  }

  showModalNumber = () => {
    if (this.props.bought_at != null) {
      showAlert("Ошибка", "У Вас уже есть активная подписка", "Закрыть");
    } else {
      this.setState({ showModalNumber: true });
    }
  };

  addToBalance(number) {
    if (number.length > 0) {
      this.props.buySubscription(this.props.token, false, number);
    }

    this.setState({ showModalNumber: false });
  }

  componentWillMount() {
    this.props.getData(this.props.token);
  }

  renderPrice() {
    const { amountContainer, amountStyle } = styles;
    if (this.props.loading == false) {
      return (
        <View style={amountContainer}>
          <Text style={amountStyle}>{this.props.price} грн/год</Text>
        </View>
      );
    }
    return (
      <View style={amountContainer}>
        <Spiner />
      </View>
    );
  }
  renderMonthPrice() {
    const { amountContainer, amountStyle } = styles;
    if (this.props.loading == false) {
      return (
        <View style={amountContainer}>
          <Text style={amountStyle}>{this.props.price_month} грн/месяц</Text>
        </View>
      );
    }
    return (
      <View style={amountContainer}>
        <Spiner />
      </View>
    );
  }

  render() {
    console.log("render toplivo - ", this.props);
    const { showModalNumber } = this.state;
    const { textStyle, imageContainer, checkboxesContainer } = styles;

    return (
      <MainCard>
        <ModalAddAutoNumber
          show={showModalNumber}
          callback={this.addToBalance}
        />
        <Header burger goToMain={DEVICE_OS == iOS ? true : false}>
          {"ПОДПИСКА AAUA"}
        </Header>
        <ScrollView>
          <CardItem style={imageContainer}>
            <Image
              resizeMode={"contain"}
              style={{
                width: 316,
                height: 193,
                resizeMode: 'contain',
              }}
              source={imgBanner}
            />
          </CardItem>
          <CardItem
            style={{
              flex: 0,
              height: 83 * RATIO,
              // backgroundColor: '#9f9f96',
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingBottom: 10,
            }}
          >
            {this.renderPrice()}
          </CardItem>
          <CardItem
            style={{
              flex: 0,
              height: 66 * RATIO,
            }}
          >
            <ButtonRoundet
              style={{
                marginRight: 45,
                marginLeft: 45,
                height: 45,
              }}
              onPress={() => this.showModalNumber()}
            >
              Купить
            </ButtonRoundet>
          </CardItem>
          {/* <CardItem style={{
                    flex: 0,
                    height: 83 * RATIO,
                    // backgroundColor: '#9f9f96',
                    flexDirection: 'column',
                    alignItems: 'center',
                      justifyContent: 'flex-end',
                      paddingBottom: 10
                  }}>
                    {this.renderMonthPrice()}
                  </CardItem> */}
          {/* <CardItem style={{
                    flex: 0,
                    height: 66 * RATIO,
                  }}>
                    <ButtonRoundet
                      style={{
                        marginRight: 45,
                        marginLeft: 45,
                        height: 45
                      }}
                      onPress={() => this.addToBalance(true)}
                    >
                      Купить
                    </ButtonRoundet>
                  </CardItem> */}
          <CardItem style={checkboxesContainer}>
            <Text style={textStyle}>В годовую подписку входит:</Text>
            <DetailsItem>
              Технический ассистанс по всей территории Украины: эвакуатор,
              подзарядка аккумулятора, аварийное открытие дверей, подвоз
              топлива. Услуга на выбор предоставляется бесплатно.
            </DetailsItem>
            <DetailsItem>
              Круглосуточная юридическая поддержка и консультации «Автоюриста»
            </DetailsItem>
            <DetailsItem>
              Услуги страхового адвоката. Адвокат поможет качественно,
              оперативно и своевременно оформит документы для выплаты по
              страховому случаю.
            </DetailsItem>
            <DetailsItem>Бонусная система AAUA.</DetailsItem>
            <DetailsItem>Консьерж-сервис 24/7</DetailsItem>
            {/*
                    <DetailsItem >
                        Первичные консультации в случае ДТП.
                    </DetailsItem>
                    <DetailsItem >
                        Доступ к базе образцов документов.
                    </DetailsItem>
                    <DetailsItem >
                        Консультации по вопросам выплат и взаимодействия со страховыми компаниями.
                    </DetailsItem>
                    <DetailsItem >
                        Консьерж-сервис 24/7
                    </DetailsItem>
                    */}
          </CardItem>
          <CardItem>
            <TouchableOpacity
              onPress={() => {
                Actions.SubscriptionDetailsComponent();
              }}
              style={{
                width: "100%",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#423486",
                  fontSize: 15,
                  fontWeight: "600",
                }}
              >
                Детальнее
              </Text>
            </TouchableOpacity>
          </CardItem>
          <CardItem>
            <TouchableOpacity
              onPress={Actions.PDFScreen}
              style={{
                width: "100%",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#423486",
                  fontSize: 15,
                }}
              >
                Публичный договор
              </Text>
            </TouchableOpacity>
          </CardItem>
        </ScrollView>
      </MainCard>
    );
  }
}

const styles = {
  amountContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "row",
  },
  amountStyle: {
    fontFamily: "SFUIText-Regular",
    fontSize: 35,
    color: "#1B1B1B",
  },
  textStyle: {
    fontFamily: "SFUIText-Regular",
    alignSelf: "stretch",
    fontSize: 13,
    fontWeight: "500",
    color: "#1B1B1B",
    paddingBottom: 15,
  },
  textContainer: {
    top: 0,
    paddingRight: 27,
    paddingLeft: 32,
    paddingBottom: 33,
  },
  imageContainer: {
    flex: 0,
    height: 171 * RATIO,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxesContainer: {
    flex: 47,
    paddingTop: 35,
    paddingRight: 70,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingLeft: 35 * WIDTH_RATIO,
  },
};

const mapStateToProps = ({ subscription, auth, citiesBrands }) => {
  return {
    price: subscription.price,
    price_month: subscription.price_month,
    bought_at: subscription.bought_at,
    loading: subscription.loading,
    token: auth.user.token,
    images: citiesBrands.sliderImages,
  };
};

export default connect(mapStateToProps, { getData, buySubscription })(
  SubscriptionComponent
);
