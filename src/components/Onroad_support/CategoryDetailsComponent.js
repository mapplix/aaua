import React,{Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {MainCard,
    CardItem,
    ButtonRoundet,
    Header,
    Spiner,
    PhoneInput,
    Icon} from '../common';
import DetailsItem from './DetailsItem';
import {Actions} from 'react-native-router-flux';
import {RATIO, WIDTH_RATIO} from '../../styles/constants'
import {showAlert} from '../Modals';
import {loadCategoryDetails, phoneChange, orderOnRoadSupport} from '../../Actions/OnRoadActions';
import {connect} from 'react-redux';

class CategoryDetailsComponent extends Component {

    onPhoneChange = (phone) => {
        this.props.phoneChange(phone);
    }

    onSubmit = () => {
        const {token, category, phone} = this.props;
        this.props.orderOnRoadSupport(token, category.id, phone)
    }

    componentWillMount() {
        this.props.loadCategoryDetails(this.props.category.id, this.props.token);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.orderSupportMessage != null) {
            showAlert(
                'Спасибо',
                nextProps.orderSupportMessage,
                'Закрыть',
                () => {Actions.reset('drawer');}
            )
        }
        if (nextProps.orderError != null) {
            showAlert(
                'Ошибка',
                nextProps.orderError,
                'OK'
            );
        }
    }

    renderContent() {
        if (!this.props.loading) {
            const {iconStyle, checkboxesContainer, buttonStyle} = styles;

            var imageUrl = require('../../images/icons/onroad1.png');

            if (this.props.category.id == '2') {
                imageUrl = require('../../images/icons/onroad3.png');
            }
            if (this.props.category.id == '3') {
                imageUrl = require('../../images/icons/onroad2.png');
            }
            if (this.props.category.id == '4') {
                imageUrl = require('../../images/icons/onroad4.png');
            }

            return (
                <MainCard>
                    <Header back>
                        {this.props.category.title}
                    </Header>
                    <CardItem style={iconStyle}>
                        <Icon
                            style={{
                                width: 79,
                                height: 79
                            }}
                            imageSrc={imageUrl}
                        />
                    </CardItem>
                    <CardItem style={checkboxesContainer}>
                        {
                            this.props.details.map((item) => {
                                return (
                                    <DetailsItem
                                        key={item.id}
                                    >
                                        {item.title}
                                    </DetailsItem>
                                )
                            })
                        }
                    </CardItem>
                    <CardItem style={{
                        flex: 10,
                        paddingTop: 15,
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start'
                    }}>
                        <ButtonRoundet
                            onPress={() => this.onSubmit()}
                            style={buttonStyle}
                        >
                            Заказать
                        </ButtonRoundet>
                    </CardItem>
                </MainCard>
            )
        }
        return (
            <Spiner />
        )
    }

    render() {
        return this.renderContent();
    }
}

const styles = {
    iconStyle: {
        flex: 19,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxesContainer: {
        flex: 63,
        paddingTop: 35,
        paddingRight: 70,
        // height: 280 * RATIO,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingLeft: 42 * WIDTH_RATIO
    },
    buttonStyle: {
        flex:0,
        height: 43,
        marginLeft: 45,
        marginRight: 45
    }
}

const mapStateToProps = ({onRoad, auth}) => {
console.log(auth);
    return {
        token: auth.user.token,
        loading: onRoad.loading,
        details: onRoad.details,
        phone: auth.user.profile.phone,
        orderError: onRoad.orderError,
        orderSupportMessage: onRoad.orderSupportMessage
    }
}

export default connect(mapStateToProps, {loadCategoryDetails, phoneChange, orderOnRoadSupport})(CategoryDetailsComponent);