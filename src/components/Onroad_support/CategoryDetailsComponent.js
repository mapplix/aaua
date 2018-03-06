import React,{Component} from 'react';
import {View, Text} from 'react-native';
import {MainCard,
    CardItem,
    ButtonRoundet,
    Header,
    Spiner,
    Icon} from '../common';
import DetailsItem from './DetailsItem';
import {Actions} from 'react-native-router-flux';
import {RATIO, WIDTH_RATIO} from '../../styles/constants'
import {showAlert} from '../Modals';
import {loadCategoryDetails} from '../../Actions/OnRoadActions';
import {connect} from 'react-redux';

class CategoryDetailsComponent extends Component {

    componentWillMount() {
        this.props.loadCategoryDetails(this.props.category.id, this.props.token);
    }

    renderContent() {
        if (!this.props.loading) {
            const {iconStyle, checkboxesContainer, buttonStyle} = styles;

            var imageUrl = require('../../images/icons/onroad1.png');

            if (this.props.category.id == '2') {
                imageUrl = require('../../images/icons/onroad2.png');
            }
            if (this.props.category.id == '3') {
                imageUrl = require('../../images/icons/onroad3.png');
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
                        flex: 20,
                        height: 90*RATIO,
                        paddingTop: 50,
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                    }}>
                        <ButtonRoundet
                            onPress={() => Actions.orderOnRoadSupport({category: this.props.category})}
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
        flex: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxesContainer: {
        flex: 60,
        paddingTop: 35,
        paddingRight: 70,
        // height: 280 * RATIO,
        flexDirection: 'column',
        justifyContent: 'flex-start',
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
    return {
        token: auth.user.token,
        loading: onRoad.loading,
        details: onRoad.details,
        orderError: onRoad.orderError
    }
}

export default connect(mapStateToProps, {loadCategoryDetails})(CategoryDetailsComponent);