import React, {Component} from 'react';
import {View, Text, TextInput, ListView, TouchableOpacity} from 'react-native';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
let listHeight = 0;

class Autocomplete extends Component {

    constructor(props) {
        super(props);

        this.state = {
            query: '',
            searchedItems: []
        };
    };

    searchedItems = (searchedText) => {
        var searchedItems = this.props.data.filter(function(item) {
            return item.title.toLowerCase().indexOf(searchedText.toLowerCase()) == 0;
        });
        if (searchedText.length <= 0) {
            listHeight = 0;
            searchedItems = []
        }
        if (searchedItems.length > 0 ) {
            listHeight = searchedItems.length * 20;
        }
        this.setState({searchedItems: searchedItems.slice(0, 30)});
        this.props.onChangeText(searchedText)
    };

    renderItem = (item) => {
        return (
            <View>
                <TouchableOpacity
                    onPress={
                        () => {
                            this.props.onSelect(item)
                            // containerHeight = 65;
                            this.setState({searchedItems: []});
                        }
                    }
                >
                    <Text>{item.id}, {item.title}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    renderList() {
        console.log(listHeight);
        if (this.state.searchedItems.length >= 1) {
            return (
                <View style={{
                    height: listHeight,
                    maxHeight: 200
                }}>
                    <ListView
                        style={{
                            height: listHeight
                        }}
                        enableEmptySections
                        dataSource={ds.cloneWithRows(this.state.searchedItems)}
                        renderRow={this.renderItem}/>
                </View>
            )
        }
    }

    render() {

        const {inputStyle, labelStyle, containerStyle} = styles;
        const {label, placeholder, value} = this.props;
        return (
            <View style={[containerStyle]}>
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
                {
                    this.renderList()
                }
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        marginLeft: 45,
        marginRight: 45,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        // position: 'absolute',
        zIndex: 999
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