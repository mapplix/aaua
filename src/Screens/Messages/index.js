import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  ListView,
  Platform,
  BackHandler,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import {DEVICE_OS, iOS, Android} from '@aaua/actions/constants';
import {MainCard, Spiner, CardItem, Header} from '@aaua/components/common';
import ListItem from './ListItem';

import Messages from '@aaua/services/Messages';

import I18n from '@aaua/i18n';

import styles from './styles';

let listener = null;

const MessagesList = () => {
  const dispatch = useDispatch();

  const {
    auth: {
      user: {token},
    },
    // messages: {loading},
  } = useSelector(state => state);

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [seed, setSeed] = useState(1);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  const {emptyListContainer, emptyListText} = styles;

  const loadMessages = async () => {
    const response = await Messages.getMessages(token);
    
    setIsLoading(false);
    if (response.error) {
      setError(response.error);
    } else {
      setMessages(response);
    }
  };

  useEffect(() => {
    // dispatch(loadMessages(token));

    loadMessages();

    if (Platform.OS == 'android' && listener == null) {
      listener = BackHandler.addEventListener('hardwareBackPress', () => {
        if (Actions.currentScene == 'messagesList') {
          Actions.mainScreen();
          return true;
        }
      });
    }
    return () => {
      listener = null;
    };
  }, []);

  const timeConverter = UNIX_timestamp => {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + '.' + month + '.' + year + ' ' + hour + ':' + min;
    return time;
  };

  const handleRefresh = () => {
    console.log('handleRefresh messages');

    setSeed(seed + 1);
    setIsRefreshing(true);
    dispatch(loadMessages(token, 5));
  };

  const renderRow = item => {
    return (
      <ListItem
        key={item.item.id}
        phone={''}
        date={timeConverter(item.item.created_at)}
        viewed={item.item.viewed}
        id={item.item.id}>
        {item.item.text}
      </ListItem>
    );
  };

  const renderFlatList = () => {
    if (messages.length < 1) {
      return (
        <View style={emptyListContainer}>
          <Text style={emptyListText}>
            {I18n.t('messages_screen.empty_list')}
          </Text>
        </View>
      );
    }

    return (
      <CardItem>
        <FlatList
          style={{
            marginTop: 15,
          }}
          initialNumToRender={10}
          data={messages}
          keyExtractor={(item, index) => item.id}
          renderItem={renderRow}
          onEndThreshold={0}
        />
      </CardItem>
    );
  };

  return (
    <MainCard>
      <Header burger goToMain={DEVICE_OS == iOS ? true : false}>
        {I18n.t('messages_screen.header')}
      </Header>
      {isLoading ? <Spiner /> : renderFlatList()}
    </MainCard>
  );
};

export default MessagesList;
