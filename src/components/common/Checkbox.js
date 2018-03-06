import React, {Component} from 'react';
import {View, Text, Image, TouchableHighlight} from 'react-native';

class CheckBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            internalChecked: false,
            isDisabled : props.disabled
        };
        this.baseState = this.state;
        this.onChange = this.onChange.bind(this);
    }

    onChange() {
        if (this.props.onChange &&  typeof this.props.checked === 'boolean') {
            this.props.onChange(this.props.checked);
        } else {
            let internalChecked = this.state.internalChecked;
            let newState = !internalChecked;

            if(this.props.onChange){
                this.props.onChange(newState);
            }
            this.setState({
                internalChecked: newState
            });
        }
    }
    componentWillMount() {
        this.setState(this.baseState)
    }

    render() {

        let source;

        if(typeof this.props.checked === 'boolean') {
            source = this.props.checked ? this.props.checkedImage : this.props.uncheckedImage;
        } else {
            source = this.state.internalChecked ? this.props.checkedImage : this.props.uncheckedImage;
        }

        return (
            <TouchableHighlight
                onPress={this.onChange}
                underlayColor={this.props.underlayColor}
                style={styles.flexContainer}
                disabled = {this.state.isDisabled}
            >
                <View style={[styles.container, this.props.containerStyle]}>
                    <Image
                        style={[styles.checkbox, this.props.checkboxStyle]}
                        source={source}/>
                    <View style={styles.labelContainer}>
                        { (this.props.customLabel ? (
                            <View style={styles.labelContainer}>
                                {this.props.customLabel}
                            </View>
                        ) : <View style={styles.labelContainer}>
                                <Text numberOfLines={this.props.labelLines} style={[styles.label, this.props.labelStyle]}>{this.props.label}</Text>
                            </View>)
                        }
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

var styles = {
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    checkbox: {
        width: 26,
        height: 26
    },
    labelContainer: {
        marginLeft: 10,
        marginRight: 10,
    },
    label: {
        fontSize: 15,
        color: 'grey'
    }
};

CheckBox.defaultProps = {
    labelLines: 1,
    labelBefore: false,
    checked: null,
    underlayColor: 'transparent'
};

export {CheckBox};