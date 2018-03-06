import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    LayoutAnimation,
    UIManager,
    Platform} from 'react-native';
import {connect} from 'react-redux';
import {openAnswear} from '../../Actions/AnQAction';

class Item  extends Component {

    constructor() {
        super();

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentWillUpdate() {
        // LayoutAnimation.linear();
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    renderDescription(){
        const {descriptionContainer, descriptionText} = styles;
        const {expanded} = this.props;
        if (expanded) {
            return (
                <View style={descriptionContainer}>
                    <Text style={descriptionText}>
                        {this.props.children}
                    </Text>
                </View>
            )
        } else {
            return (
                <View style={{height:0}}></View>
            )
        }
    }

    render() {
        const {title, openAnswear, id} = this.props;
        const {titleContainer, titleText, mainContainer} = styles;
        return (
            <TouchableWithoutFeedback
                onPress={() => openAnswear(id)}>
                <View
                style={[mainContainer, this.props.style]}>
                    <View style={titleContainer}>
                        <Text style={titleText}>
                            {title}
                        </Text>
                    </View>
                    {this.renderDescription()}
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = {
    mainContainer: {
        // backgroundColor: '#282',
        marginLeft: 14,
        marginRight: 14,
        borderWidth: 1,
        borderColor: '#e9e9e9',
        borderRadius: 4,
        marginBottom: 16
    },
    titleContainer: {
        height: 47,
        paddingLeft: 19,
        borderWidth: 1,
        borderColor: '#fafafa',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#e9e9e9',
        elevation:5,
    },
    titleText: {
        fontFamily: 'SFUIText-Medium',
        color: '#423486',
        fontSize: 14,
    },
    descriptionContainer: {
        paddingLeft: 19,
        paddingRight: 11,
        paddingTop: 21,
        paddingBottom: 15,
    },
    descriptionText: {
        fontFamily: 'SFUIText-Regular',
        color: '#1b1b1b',
        fontSize: 12,
    }
}

const mapStateToProps = (state , ownProps) => {
    const expanded = state.AnQ.selectedAnswear === ownProps.id;
    return {
        expanded: expanded
    }
}

export default connect(mapStateToProps, {openAnswear})(Item);