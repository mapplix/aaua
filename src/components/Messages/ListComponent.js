import React, {Component} from 'react';
import {View, Text, ScrollView, FlatList, ListView, Platform, BackHandler} from 'react-native';
import {
    MainCard,
    Spiner,
    CardItem,
    Header} from '../common';
import ListItem from './ListItem';
import {connect} from 'react-redux';
import {loadMessages} from '../../actions/MessagesActions'
import {Actions} from 'react-native-router-flux';

let listener = null

class ListComponent extends Component {

    state = {
        seed: 1,
        page: 1,
        messages: [],
        isLoading: false,
        isRefreshing: false,
    };

    timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + '.' + month + '.' + year + ' ' + hour + ':' + min;
        return time;
    }

    // componentWillMount() {
    //     this.props.loadMessages(this.props.token);
    // }

    handleRefresh() {
console.log('handleRefresh')
        this.setState({
            seed: this.state.seed + 1,
            isRefreshing: true,
        }, () => {
            this.props.loadMessages(this.props.token, 5);
        });
    };

    componentDidMount() {
        this.props.loadMessages(this.props.token);
        if (Platform.OS == "android" && listener == null) {
            listener = BackHandler.addEventListener("hardwareBackPress", () => {

                if (Actions.currentScene == 'messagesList') {
                    Actions.mainScreen();
                    return true;
                }
            })
        }
    };

    componentWillUnmount() {
        listener = null;
    }

    renderRow(item) {
console.log(item);
        return (
            <ListItem
                key={item.item.id}
                phone={''}
                date={
                    this.timeConverter(item.item.title.created_at)
                }
                viewed = {item.item.title.viewed}
                id = {item.item.title.id}
            >
                {
                    item.item.title.text
                }
            </ListItem>
        );
    }

    renderFlatList() {
        const { isRefreshing } = this.state;
        return (
            <CardItem>
                <FlatList
                    style={{
                        marginTop: 15
                    }}
                    initialNumToRender={6}
                    data={this.props.messages}
                    keyExtractor={(item, index) => item.id}
                    renderItem={this.renderRow.bind(this)}
                    onEndThreshold={0}
                />
            </CardItem>
        )
    }

    renderContent() {
console.log('renderContent', this.props);
        if (!this.props.loading) {
           return this.renderFlatList()
        }
        return (
            <Spiner />
        )
    }

    render() {
        return (
            <MainCard>
                <Header burger>
                    уведомления
                </Header>
                {
                    this.renderContent()
                }
            </MainCard>
        )
    }
}

const mapStateToProps = ({auth, messages}) => {
console.log(messages);
    return {
        token: auth.user.token,
        messages: messages.messages,
        loading: messages.loading,
        error: messages.error
    }
}

export default connect(mapStateToProps, {loadMessages})(ListComponent);