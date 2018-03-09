import React, {Component} from 'react';
import {View, Text, TextInput, ListView, TouchableOpacity} from 'react-native';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
let listHeight = 65;

class Autocomplete extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchedItems: []
        };
    };

    searchedItems = (searchedText) => {
        var searchedItems = this.props.data.filter(function(item) {
            return item.title.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
        });
        listHeight = 265;
        if (searchedText.length <= 0) {
            listHeight = 65;
            searchedItems = []
        }
        this.setState({searchedItems: searchedItems});
        this.props.onChangeText(searchedText)
    };

    renderItem = (item) => {
        return (
            <View>
                <TouchableOpacity
                    onPress={
                        () => {
                            this.props.onSelect(item)
                            listHeight = 65;
                            this.setState({searchedItems: []});
                        }
                    }
                >
                    <Text>{item.id}, {item.title}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    render() {

        const {inputStyle, labelStyle, containerStyle} = styles;
        const {label, placeholder, value} = this.props;
        return (
            <View style={[containerStyle, {height: listHeight}]}>
                <Text style={[labelStyle, this.props.labelStyle]}>
                    {label}
                </Text>
                <View style={{
                    minHeight: 43,
                    height: 40,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                >
                    <TextInput
                        {...this.props}
                        placeholderTextColor='#b6b9bf'
                        multiline={false}
                        onSubmitEditing={() => {console.log('enter pressed')}}
                        placeholder={placeholder}
                        value={value}
                        onChangeText={this.searchedItems}
                        style={inputStyle}/>
                </View>
                <View style={{
                    position: 'absolute',
                    maxHeight: 200,
                    zIndex: 999,
                    top:65
                }}>
                <ListView

                    dataSource={ds.cloneWithRows(this.state.searchedItems)}
                    renderRow={this.renderItem} />
                </View>
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        height: 65,
        marginLeft: 45,
        marginRight: 45,
        // flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    inputStyle: {
        // placeholderTextColor: '#b6b9bf',
        fontFamily:'SFUIText-Regular',
        color: '#b6b9bf',
        fontSize: 15,
        lineHeight: 25,
        flex:1
    },
    labelStyle: {
        marginLeft: 4,
        marginBottom: 2,
        paddingTop:0,
        height: 20,
        fontFamily: 'SFUIText-Regular',
        fontSize: 14,
        alignSelf:'stretch',
        color: '#3d3e40',
    },

}

export {Autocomplete};