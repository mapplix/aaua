import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import RegisterReducer from './RegisterReducer';
import FeedbackReducer from './FeedbackReducer';
import AnQReducer from './AnQReducer'
import AAUA_CardQReducer from './AAUA_CardReducer'
import forgotPass from './ForgotPassReducer'
import InsuranceReducer from './InsuranceReducer'
import CitiesBrandsReducer from './CitiesBrandsReducer'
import SubscriptionReducer from './SubscriptionReducer'
import OnroadReducer from './OnroadReducer'
import OrderingReducer from './OrderingReducer'
import MessagesReducer from './MessagesReducer'
import DiscountsReducer from './DiscountsReducer'
import InviteFriendReducer from './InviteFriendReducer'
import StoreReducer from './StoreReducer'
import BasketReducer from './BasketReducer'
import HistoryReducer from './HistoryReducer'

export default combineReducers({
    auth: AuthReducer,
    forgotPass: forgotPass,
    register: RegisterReducer,
    feedback: FeedbackReducer,
    AnQ: AnQReducer,
    AAUA_Card: AAUA_CardQReducer,
    insurance: InsuranceReducer,
    citiesBrands: CitiesBrandsReducer,
    subscription: SubscriptionReducer,
    onRoad: OnroadReducer,
    ordering: OrderingReducer,
    messages: MessagesReducer,
    discounts: DiscountsReducer,
    inviteFriend: InviteFriendReducer,
    store: StoreReducer,
    basket: BasketReducer,
    history: HistoryReducer,
})