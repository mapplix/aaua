import React, {Component} from 'react';
import {View, Text, Image, ScrollView, Platform, BackHandler, TouchableOpacity, Linking} from 'react-native';
import {
    MainCard,
    CardItem,
    ButtonRoundet,
    Header,
    Spiner
} from '../common';
import {RATIO, WIDTH_RATIO} from '../../styles/constants';
import {connect} from 'react-redux';
import {getData, buySubscription} from '../../Actions/SubscriptionAction';
import {showAlert} from '../Modals';
import DetailsItem from './DetailsItem';
import {DEVICE_OS, iOS, Android} from '../../Actions/constants';
import {Actions} from "react-native-router-flux";
import CardComponent from "../AAUA_card/CardComponent";

const imgBanner = require('../../images/subscription_banner.png');

class DetailsComponent extends Component {

    render() {
        const {textStyle, textContainer, amountContainer, amountStyle, imageContainer, checkboxesContainer} = styles;
        return (
            <MainCard>
                <Header back goToMain={DEVICE_OS == iOS ? true : false}>
                    {"ПОДПИСКА AAUA"}
                </Header>
                <ScrollView>
                <CardItem style={imageContainer}>
                    <Image
                        resizeMode={'contain'}
                        style={{
                            width: 267,
                            height: 153,
                        }}
                        source={imgBanner}
                    />

                </CardItem>
                <CardItem>
                    <View style={
                        styles.textContainer
                    }>
                        <Text style={textStyle}>
                            Річна Підписка є пакетом опцій та послуг від асоціації, який допомагає економити під-час експлуатації автомобіля та надає цілодобовий захист в дорозі по всій території України.
                        </Text>
                    </View>
                </CardItem>
                <CardItem >
                    <View style={styles.textTitleConteinerStyle}>
                        <Text style={styles.textTitleStyle}>
                            Технічна допомога
                        </Text>
                    </View>
                </CardItem>
                    <CardItem>
                        <View style={
                            styles.textContainer
                        }>
                            <Text style={textStyle}>
{`Якщо внаслідок поломки, ДТП чи іншої події, автомобіль не здатен пересуватися, Ви можете безкоштовно скористатися 1 (один) раз будь-якою з перелічених послуг на вибір протягом терміну дії Підписки.

До послуг технічної допомоги відносяться:`}
                            </Text>
                        </View>
                    </CardItem>
                    <CardItem >
                        <View style={styles.textTitleConteinerStyle}>
                            <Text style={styles.textTitleStyle}>
                                Евакуація транспортного засобу
                            </Text>
                        </View>
                    </CardItem>
                    <CardItem>
                        <View style={
                            styles.textContainer
                        }>
                            <Text style={textStyle}>
{`Евакуація проводиться з місця настання Події до найближчої авторизованої профільної СТО відповідно до марки ТЗ Клієнта.

Альтернативна евакуація надається у разі бажання Клієнта транспортувати ТЗ не до найближчої авторизованої профільної СТО, а в будь-яке інше місце.

У разі, якщо Клієнт бажає евакуювати ТЗ до іншої авторизованої профільної СТО, що знаходиться на більш віддаленій відстані від місця Події, Клієнт сплачує за власні кошти різницю між відстанню до бажаної та відстанню до рекомендованої Компанією СТО.

У випадку перебільшення фінансових лімітів, Клієнт самостійно сплачує суму, на яку вартість послуги перевищує ліміт.

Послуги евакуації надаються в межах грошового ліміту: 1000 грн.
`}
                            </Text>
                        </View>
                    </CardItem>
                    <CardItem >
                        <View style={styles.textTitleConteinerStyle}>
                            <Text style={styles.textTitleStyle}>
                                Доставка палива
                            </Text>
                        </View>
                    </CardItem>
                    <CardItem>
                        <View style={
                            styles.textContainer
                        }>
                            <Text style={textStyle}>
{`У випадку непередбачуваної ситуації, коли пальне закінчилося раніше, ніж Клієнт зміг дістатися до АЗС, та в результаті чого настала зупинка двигуна:

- клієнту буде організовано доставка палива до місця зупинки транспортного засобу;

- компанія сплачує лише доставку, вартість та кількість палива Клієнт замовляє та сплачує самостійно.
`}
                            </Text>
                        </View>
                    </CardItem>
                    <CardItem >
                        <View style={styles.textTitleConteinerStyle}>
                            <Text style={styles.textTitleStyle}>
                                Запуск двигуна від стороннього джерела живлення (підзарядка АКБ)
                            </Text>
                        </View>
                    </CardItem>
                    <CardItem>
                        <View style={
                            styles.textContainer
                        }>
                            <Text style={textStyle}>
{`
У випадку непередбачуваної ситуації, коли АКБ Транспортного засобу втратила свій заряд та спроби самостійно запустити двигун Транспортного засобу не мають результату:

компанією буде організовано виїзд служби технічної допомоги, яка допоможе Клієнту запустити двигун від стороннього джерела живлення;

після вдалого запуску двигуна службою технічної допомоги, Клієнт повинен негайно звернутися до рекомендованої Компанією авторизованої профільної СТО для вирішення проблеми;

в разі невдалих спроб службою технічної допомоги запустити двигун, Клієнту буде запропонована послуга евакуації Транспортного засобу.
`}
                            </Text>
                        </View>
                    </CardItem>
                    <CardItem >
                        <View style={styles.textTitleConteinerStyle}>
                            <Text style={styles.textTitleStyle}>
                                Заміна пошкодженого колеса
                            </Text>
                        </View>
                    </CardItem>
                    <CardItem>
                        <View style={
                            styles.textContainer
                        }>
                            <Text style={textStyle}>
{`У випадку непередбачуваної ситуації, коли колесо Транспортного засобу пошкоджено та необхідна його заміна:

компанією буде організовано виїзд служби технічної допомоги, яка допоможе замінити колесо на запасне колесо Клієнта;

в разі пошкодження водночас двох або більше коліс, Клієнту буде запропонована послуга евакуації Транспортного засобу;

якщо Клієнт не має запасного колеса, Клієнту буде запропонована послуга евакуації Транспортного засобу.
`}
                            </Text>
                        </View>
                    </CardItem>
                    <CardItem >
                        <View style={styles.textTitleConteinerStyle}>
                            <Text style={styles.textTitleStyle}>
                                Аварійне відкриття дверей, відігрів замків
                            </Text>
                        </View>
                    </CardItem>
                    <CardItem>
                        <View style={
                            styles.textContainer
                        }>
                            <Text style={textStyle}>
{`У випадку непередбачуваної ситуації, коли двері Транспортного засобу неможливо відчинити через втрату чи поломку ключів, зачинення їх у салоні чи багажнику, через замерзання замків, внаслідок чого Клієнт не може потрапити в салон Транспортного засобу :

компанією буде організовано виїзд служби технічної допомоги, яка допоможе Клієнту відчинити двері Транспортного засобу;

в разі невдалих спроб службою технічної допомоги відчинити двері Транспортного засобу, Клієнту буде запропонована послуга евакуації Транспортного засобу.
`}
                            </Text>
                        </View>
                    </CardItem>


                    <CardItem >
                        <View style={styles.textTitleConteinerStyle}>
                            <Text style={styles.textTitleStyle}>
                                Юридична допомога
                            </Text>
                        </View>
                    </CardItem>
                    <CardItem style={{flexDirection: 'column'}}>
                        <View style={
                            styles.textContainer
                        }>
                            <Text style={styles.textTitleStyle}>
                                До складу пакету входять такі основні послуги:
                            </Text>
                        </View>
                        <View style={
                            styles.textContainer
                        }>
                            <Text style={textStyle}>
{`
консультації з питань взаємодії з представниками дорожньої поліції;

первинні консультації у випадку ДТП;

доступ до бази зразків документів;

консультації з питань взаємодії зі страховою компанією;

консультації щодо оскарження штрафів за порушення ПДР;

консультації з питань заповнення Європротоколу;

консультації з питань отримання виплати від страхової компанії.
`}
                            </Text>
                        </View>
                    </CardItem>
                    <CardItem style={{flexDirection: 'column'}}>
                        <View style={
                            styles.textContainer
                        }>
                            <Text style={styles.textTitleStyle}>
                                Примітки:
                            </Text>
                        </View>
                        <View style={
                            styles.textContainer
                        }>
                            <Text style={textStyle}>
                                {`
консультації надаються за допомогою телефонного зв’язку операторами call-center;

база зразків документів розміщена за посиланням;

підготовка позову можлива лише за умови надання всіх необхідних документів високої якості;

додаткові послуги автоюриста надаються на основі окремої угоди.

`}
                            </Text>
                        </View>
                    </CardItem>
                    <CardItem >
                        <View style={styles.textTitleConteinerStyle}>
                            <Text style={styles.textTitleStyle}>
                                Послуги інформаційної та консультативної підтримки
                            </Text>
                        </View>
                    </CardItem>
                    <CardItem style={{
                        paddingTop: 10,
                        flexDirection: 'column',
                    justifyContent: "flex-start"
                    }}>
                        <View style={
                            styles.textContainer
                        }>
                            <Text style={[textStyle, {fontSize: 18}]}>
                                Інформація про місцезнаходження, адресу та телефони:
                            </Text>
                        </View>
                        <View style={
                            styles.textContainer
                        }>
                            <Text style={textStyle}>
{`станцій технічного обслуговування;

автозаправних станцій;

послуг евакуатора;

аварійного комісара;

послуг таксі;

готелів;

державної автомобільної інспекції;

медичних установ;

страхових компаній та ін...
`}
                            </Text>
                        </View>
                    </CardItem>
                    <CardItem style={{
                        paddingTop: 10,
                        flexDirection: 'column',
                        justifyContent: "flex-start"
                    }}>
                        <View style={
                            styles.textContainer
                        }>
                            <Text style={[textStyle, {fontSize: 18}]}>
                                Консультації при поломці:
                            </Text>
                        </View>
                        <View style={
                            styles.textContainer
                        }>
                            <Text style={textStyle}>
{`технічна консультація щодо особливостей експлуатації т/з, порядку та строках проходження ТО;

передача термінового повідомлення від Клієнта (факс, SMS-повідомлення, e-mail);

пошук необхідної інформації в мережі Internet.
`}
                            </Text>
                        </View>
                    </CardItem>
                    <CardItem style={{
                        paddingTop: 10,
                        flexDirection: 'column',
                        justifyContent: "flex-start"
                    }}>
                        <View style={
                            styles.textContainer
                        }>
                            <Text style={[textStyle, {fontSize: 18}]}>
                                Консультації при ДТП:
                            </Text>
                        </View>
                        <View style={
                            styles.textContainer
                        }>
                            <Text style={textStyle}>
{`порядок дій на місці ДТП;

юридична підтримка;

загальний порядок звернень до страхової компанії;

порядок оформлення документів;

інформація про місцезнаходження та телефони екстрених служб;

консультації лікаря по телефону.
`}
                            </Text>
                        </View>
                    </CardItem>
                    <CardItem >
                        <View style={styles.textTitleConteinerStyle}>
                            <Text style={styles.textTitleStyle}>
                                Організаційні послуги
                            </Text>
                        </View>
                    </CardItem>
                    <CardItem style={{
                        paddingTop: 10,
                        flexDirection: 'column',
                        justifyContent: "flex-start"
                    }}>
                        <View style={
                            styles.textContainer
                        }>
                            <Text style={[textStyle, {fontSize: 18}]}>
                                Клієнт самостійно сплачує вартість послуг, організованих Компанією на його прохання:
                            </Text>
                        </View>
                        <View style={
                            styles.textContainer
                        }>
                            <Text style={textStyle}>
{`виклик ДАІ;

виклик служби порятунку;

виклик аварійного комісара;

організація автотоварознавчої експертизи;

виклик карети швидкої медичної допомоги;

організація стаціонарного лікування;

виклик таксі;

бронювання залізничних, автобусних, та авіа квитків;

організація прокатного автомобіля;

пошук та бронювання номеру в готелі;

виклик та залучення інших організацій за проханням Клієнта.
`}
                            </Text>
                        </View>
                    </CardItem>
                    <CardItem >
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitleStyle}>
                                Термін дії пакету:
                            </Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text> 1 рік.
                            </Text>
                        </View>
                    </CardItem>
                    <CardItem >
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitleStyle}>
                                Час надання послуг:
                            </Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text> цілодобово </Text>
                        </View>
                    </CardItem>
                    <CardItem >
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitleStyle}>
                                Територія покриття:
                            </Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text> вся Україна
                            </Text>
                        </View>
                    </CardItem>
                </ScrollView>
            </MainCard>
        )
    }
}

const styles = {
    amountContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    amountStyle: {
        fontFamily: 'SFUIText-Regular',
        fontSize: 35,
        color:'#1B1B1B'
    },
    textStyle: {
        fontFamily: 'SFUIText-Regular',
        alignSelf: 'stretch',
        fontSize: 13,
        fontWeight: '500',
        color:'#1B1B1B',
        paddingBottom: 15
    },
    textContainer: {
        top: 0,
        paddingRight: 27,
        paddingLeft: 32,
        // paddingBottom: 33
    },
    imageContainer: {
        flex:0,
        height: 171 * RATIO,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    textTitleConteinerStyle: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    textTitleStyle: {
        color: "#1f1f1f",
        fontSize: 20,
        fontWeight: "600"
    }
}

const mapStateToProps = ({subscription, auth, citiesBrands}) => {
    return {
        price: subscription.price,
        bought_at: subscription.bought_at,
        loading: subscription.loading,
        token: auth.user.token,
      images: citiesBrands.sliderImages,
    }
}

export default connect(mapStateToProps, {getData, buySubscription})(DetailsComponent);