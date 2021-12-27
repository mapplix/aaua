import React, {useEffect} from 'react';
import {Actions} from 'react-native-router-flux';
import {useSelector, useDispatch} from 'react-redux';

import I18n from '@aaua/i18n';

import {
  MainCard,
  CardItem,
  ButtonRoundet,
  Header,
  Spiner,
  PhoneInput,
  Icon,
} from '@aaua/components/common';
import DetailsItem from '@aaua/components/OnRoadSupport/DetailsItem';
import {RATIO, WIDTH_RATIO} from '@aaua/styles/constants';
import {showAlert} from '@aaua/components/Modals';
import {
  loadCategoryDetails,
  phoneChange,
  orderOnRoadSupport,
} from '@aaua/actions/OnRoadActions';

const CategoryDetails = ({category}) => {

  const {
    onRoad: {loading, details, orderSupportMessage, orderError},
    auth: {
      user: {
        token,
        profile: {phone},
      },
    },
  } = useSelector(state => state);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(loadCategoryDetails(category.id, token));
    }
  }, [token]);

  useEffect(() => {
    if (orderSupportMessage != null) {
      showAlert(
        I18n.t('on_road_support_screen.details.thanks'),
        orderSupportMessage,
        I18n.t('on_road_support_screen.details.close'),
        () => {
          Actions.reset('drawer');
        },
      );
    }
    if (orderError != null) {
      showAlert(I18n.t('on_road_support_screen.details.error'), orderError, 'OK');
    }
  }, [orderSupportMessage, orderError]);

  const onPhoneChange = phone => {
    phoneChange(phone);
  };

  const onSubmit = () => {
    dispatch(orderOnRoadSupport(token, category.id, phone));
  };

  const renderContent = () => {
    if (!loading) {
      const {iconStyle, checkboxesContainer, buttonStyle} = styles;

      var imageUrl = require('@aaua/images/icons/onroad1.png');

      if (category.id == '2') {
        imageUrl = require('@aaua/images/icons/onroad3.png');
      } else if (category.id == '3') {
        imageUrl = require('@aaua/images/icons/onroad2.png');
      } else if (category.id == '4') {
        imageUrl = require('@aaua/images/icons/onroad4.png');
      }

      return (
        <MainCard>
          <Header back>{category.title}</Header>
          <CardItem style={iconStyle}>
            <Icon
              style={{
                width: 79,
                height: 79,
              }}
              imageSrc={imageUrl}
            />
          </CardItem>
          <CardItem style={checkboxesContainer}>
            {details.map(item => {
              return <DetailsItem key={item.id}>{item.title}</DetailsItem>;
            })}
          </CardItem>
          <CardItem
            style={{
              flex: 18,
              paddingTop: 15,
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <ButtonRoundet onPress={onSubmit} style={buttonStyle}>
              {I18n.t('on_road_support_screen.details.order')}
            </ButtonRoundet>
          </CardItem>
        </MainCard>
      );
    }
    return <Spiner />;
  };

  return renderContent();
};

const styles = {
  iconStyle: {
    flex: 19,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxesContainer: {
    flex: 47,
    paddingTop: 15,
    paddingRight: 70,
    // height: 280 * RATIO,
    flexDirection: 'column',
    // justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: 42 * WIDTH_RATIO,
  },
  buttonStyle: {
    flex: 0,
    height: 45,
    marginLeft: 45,
    marginRight: 45,
  },
};

// const mapStateToProps = ({onRoad, auth}) => {
//   console.log(auth);
//   return {
//     token: auth.user.token,
//     loading: onRoad.loading,
//     details: onRoad.details,
//     phone: auth.user.profile.phone,
//     orderError: onRoad.orderError,
//     orderSupportMessage: onRoad.orderSupportMessage,
//   };
// };

// export default connect(mapStateToProps, {
//   loadCategoryDetails,
//   phoneChange,
//   orderOnRoadSupport,
// })(CategoryDetailsComponent);
export default CategoryDetails;
