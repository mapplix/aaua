import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Linking,
  Platform,
  Alert,
} from "react-native";
import { MainCard, CardItem } from "../common";
import axios from "axios";
import md5 from "js-md5";
// import QRCode from 'react-native-qrcode-generator';
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
// import DeviceBrightness from "react-native-device-brightness";
import { WIDTH, RATIO, WIDTH_RATIO } from "../../styles/constants";
import QRcode from "react-native-qrcode-svg";
import { ButtonRoundet } from "../common";
import { SECRET_KEY, ACTIVATION_URL } from "../../Actions/constants";

class QRcodeComponent extends Component {
  state = {
    luminous: 0.5,
    sendRequest: false,
  };

  componentDidMount() {
    // DeviceBrightness.setBrightnessLevel(0.8);
  }

  componentWillUnmount() {
    // DeviceBrightness.setBrightnessLevel(this.state.luminous);
  }

  openUrl = (url) => {
    // let url = 'https://wog.ua/ua/registration/';
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  dialCall = () => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = "tel:0800300525";
    } else {
      phoneNumber = "telprompt:0800300525";
    }

    this.openUrl(phoneNumber);
  };

  activationRequest = () => {
    const data = JSON.stringify({
      token: this.props.token,
    });
    const signature = md5(SECRET_KEY + data);
    axios
      .post(ACTIVATION_URL, data, {
        headers: {
          Signature: signature,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        Alert.alert("", "Запрос успешно отправлен.");
        this.setState({ sendRequest: true });
      });
  };

  renderQr = () => {
    console.log("RENDER QR WIDTH", WIDTH);
    const { container, text } = styles;
    const { card, error } = this.props;
    const qrWidth = WIDTH < 350 ? WIDTH - 20 : 500;
    return (
      <MainCard
        style={[
          container,
          {
            paddingLeft: 10,
            paddingRight: 10,
          },
        ]}
      >
        <View
          style={{
            position: 'absolute',
            top: 70,
            left: 30,
            backgroundColor: "#FFF",
            height: 30,
            zIndex: 1000,
          }}
        >
          <TouchableOpacity onPress={Actions.select_azs}>
            <Text
              style={{
                fontSize: 30,
                color: "#1b1b1b",
              }}
            >
              X
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: 'orange',
          }}
        >
          <View
            style={{
              borderColor: "#ffc200",
              borderWidth: 5,
            }}
          >
            <QRcode
              value={card.qr.QRCode}
              size={WIDTH * 0.6}
              color="#000"
              backgroundColor="white"
            />
          </View>
        </View>
      </MainCard>
    );
  };

  renderError = () => {
    const { container, text } = styles;
    const { card, QrError } = this.props;
    const { sendRequest } = this.state;

    let errorMessage = "Неверный токен партнера";
    if (QrError == 2) {
      errorMessage = "Неверный код партнера";
    } else if (QrError == 3) {
      errorMessage = "Неизвестная карта";
    } else if (QrError == 12) {
      errorMessage = "У карты другой номер телефона";
    } else if (QrError == 59) {
      errorMessage = "Карту нельзя использовать в приложении";
    }
    return (
      <MainCard style={container}>
        <CardItem
          style={{
            backgroundColor: "#FFF",
            height: 50,
            padding: 20,
          }}
        >
          <TouchableOpacity onPress={Actions.select_azs}>
            <Text
              style={{
                fontSize: 30,
                color: "#1b1b1b",
              }}
            >
              X
            </Text>
          </TouchableOpacity>
        </CardItem>
        <View
          style={{
            flex: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardItem
            style={{
              backgroundColor: "#FFF",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flex: 0,
              paddingBottom: 50,
            }}
          >
            <Text
              style={[
                text,
                {
                  fontSize: 20,
                  color: "#db1924",
                  marginHorizontal: 15,
                },
              ]}
            >
              {errorMessage}
            </Text>
            <Text style={[text, { marginTop: 15, marginHorizontal: 15 }]}>
              Если у Вас не работает QR-код или трудности с регистрацией,
              оставьте заявку и менеджер Вам поможет.
            </Text>
          </CardItem>
          <CardItem
            style={{
              backgroundColor: "#fff",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flex: 0,
              height: 22,
            }}
          >
            <Text style={[text, { fontSize: 22 }]}>{card.card}</Text>
          </CardItem>
          <View
            style={{
              paddingTop: 30,
              // backgroundColor: '#158',
              width: WIDTH * 0.8,
            }}
          >
            <Text
              style={[
                text,
                {
                  fontSize: 16,
                },
              ]}
            >
              Это Ваша виртуальная карта. Для активации виртуальной карты и
              установки пин-кода безопасности необходимо зарегистрировать карту
              на сайте{" "}
              <Text
                style={{ color: "blue" }}
                onPress={() => this.openUrl("https://wog.ua/ua/registration/")}
              >
                https://wog.ua/ua/registration/{" "}
              </Text>
              или по номеру{" "}
              <Text style={{ color: "blue" }} onPress={this.dialCall}>
                0800 300 525
              </Text>
            </Text>

            <View style={styles.buttonContainer}>
              {sendRequest === false ? (
                <ButtonRoundet
                  style={styles.buttonStyle}
                  textStyle={{ color: "#fff" }}
                  onPress={() => {
                    this.activationRequest();
                  }}
                >
                  Заявка на активацию
                </ButtonRoundet>
              ) : (
                <Text style={styles.text}>Заявка на активацию отправлена</Text>
              )}
            </View>
          </View>
        </View>
      </MainCard>
    );
  };

  render() {
    return this.props.card.qr == null || this.props.QrError !== null
      ? this.renderError()
      : this.renderQr();
  }
}

const mapStateToProps = ({ AAUA_Card, auth }) => {
  return {
    card: AAUA_Card.myCards,
    QrError: AAUA_Card.QrError,
    token: auth.user.token,
  };
};

export default connect(mapStateToProps)(QRcodeComponent);

const styles = {
  container: {
    backgroundColor: "#FFF",
    paddingLeft: 30,
    paddingRight: 30,
  },
  text: {
    // backgroundColor: '#294',
    color: "#1b1b1b",
    fontSize: 18,
    alignSelf: "center",
  },
  buttonContainer: {
    marginTop: 20,
    height: 53,
    paddingTop: 7,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  buttonStyle: {
    marginRight: 45 * WIDTH_RATIO,
    marginLeft: 45 * WIDTH_RATIO,
    height: 43,
    backgroundColor: "#423486",
    borderColor: "#423486",
  },
};
