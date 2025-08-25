import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { Routes, Route, unstable_HistoryRouter as HistoryRouter, Navigate } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './pages/Home/Home';
import HeaderAndFooter from './templates/HeaderAndFooter/HeaderAndFooter';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import AccountUser from './pages/AccountUser/AccountUser';
import InfoUser from './pages/AccountUser/InfoUser/InfoUser';
import BankUser from './pages/AccountUser/BankUser/BankUser';
import ChangePassword from './pages/AccountUser/ChangePassword/ChangePassword';
import PurchaseOrder from './pages/AccountUser/PurchaseOrder/PurchaseOrder';
import ShopeeCoin from './pages/AccountUser/ShopeeCoin/ShopeeCoin';
import ShopeeHelp from './pages/ShopeeHelp/ShopeeHelp';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Search from './pages/Search/Search';
import Cart from './pages/Cart/Cart';
import Payment from './pages/Payment/Payment';
import Category from './pages/Category/Category';
import { store } from './redux/configStore';
import ScrollToTop from './ScrollToTop';
import ShopeePolicy from './pages/ShopeePolicy/ShopeePolicy';
import GeneralInfo from './pages/ShopeePolicy/Child/GeneralInfo';
import PayMethod from './pages/ShopeePolicy/Child/PayMethod';
import Transport from './pages/ShopeePolicy/Child/Transport';
import Refund from './pages/ShopeePolicy/Child/Refund';
import ShopName from './pages/ShopName/ShopName';
import ShoppingWithShopee from './pages/ShopeePolicy/Child/ShoppingWithShopee';
import Promotion from './pages/ShopeePolicy/Child/Promotion';
import Notification from './pages/Notification/Notification';
import './i18n';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgotPassword from './pages/FogotPassword/ForgotPassword';
import ResetPassword from './pages/FogotPassword/ResetPassword';
import EnterCodePassword from './pages/FogotPassword/EnterCodePassword';
import EnterPhoneNumber from './pages/EnterPhoneNumber/EnterPhoneNumber';
import NotificationSetting from './pages/AccountUser/NotificationSetting/NotificationSetting';
import MyVoucher from './pages/AccountUser/MyVoucher/MyVoucher';
import FlashSale from './pages/FlashSale/FlashSale';
import ManageProducts from './pages/SellerCenter/ManageProducts/ManageProducts';
import BecomeSeller from './pages/BecomeSeller/BecomeSeller';
import RegisterShop from './pages/BecomeSeller/RegisterShop';
import ViewsProductsChart from './pages/SellerCenter/ViewsProductsChart/ViewsProductsChart';
import ChatWidget from './components/ChatWidget/ChatWidget';
import DownloadApp from './pages/DownloadApp/DownloadApp';
import SellerCenter from './pages/SellerCenter/SellerCenter';
import PaymentMethodChart from './pages/SellerCenter/PaymentMethodChart/PaymentMethodChart';
import RevenueChart from './pages/SellerCenter/Revenue/RevenueChart';
import ShippingAreaChart from './pages/SellerCenter/ShippingArea/ShippingAreaChart';
import SetupAccount from './pages/Login/SetupAccount';






const root = ReactDOM.createRoot(document.getElementById('root'));
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;


export const history = createBrowserHistory();
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <HistoryRouter history={history}>
        <ScrollToTop />
        <Routes>
          <Route element={<HeaderAndFooter />}>
            <Route index element={<Home />} path="/"></Route>
            <Route path="/productdetail">
              <Route path=':productid' element={<ProductDetail />}></Route>
            </Route>
            <Route path="/category">
              <Route path=':name' element={<Category />} ></Route>
            </Route>
            <Route element={<Cart />} path="/cart"></Route>
            <Route element={<Payment />} path="/payments"></Route>
            <Route path="/search">
              <Route path=':keyword' element={<Search />} ></Route>
            </Route>
            <Route path="/shopname">
              <Route path=':shopnameid' element={<ShopName />}></Route>
            </Route>
            <Route element={<FlashSale />} path="/flashsale"></Route>
            <Route element={<DownloadApp />} path="/downloadapp"></Route>
            <Route element={<AccountUser />} path="/accountuser">
              <Route path='infouser' element={<InfoUser />}></Route>
              <Route path='bankuser' element={<BankUser />}></Route>
              <Route path='notificationsetting' element={<NotificationSetting />}></Route>
              <Route path='changepassword' element={<ChangePassword />}></Route>
              <Route path='myvoucher' element={<MyVoucher />}></Route>
              <Route path='purchaseorder' element={<PurchaseOrder />}></Route>
              <Route path='shopeecoin' element={<ShopeeCoin />}></Route>
            </Route>
            <Route path="/sellercenter">
              <Route path=':email/' element={<SellerCenter />} >
                <Route path='manageproduct' element={<ManageProducts />}></Route>
                <Route path='viewsproductschart' element={<ViewsProductsChart />}></Route>
                <Route path='paymentmethodchart' element={<PaymentMethodChart />}></Route>
                <Route path='revenue' element={<RevenueChart />}></Route>
                <Route path='shippingarea' element={<ShippingAreaChart />}></Route>
              </Route>
            </Route>
            <Route path='*' element={<Navigate to="" />}></Route>
          </Route>
          <Route element={<BecomeSeller />} path="/becomeseller"></Route>
          <Route element={<RegisterShop />} path="/registershop"></Route>
          <Route element={<Notification />} path="/notification"></Route>
          <Route element={<ShopeeHelp />} path="/shopeehelp"></Route>
          <Route element={<ShopeePolicy />} path="/shopeepolicy">
            <Route path='generalinfo' element={<GeneralInfo />}></Route>
            <Route path='shoppingwithshopee' element={<ShoppingWithShopee />}></Route>
            <Route path='promotion' element={<Promotion />}></Route>
            <Route path='paymethod' element={<PayMethod />}></Route>
            <Route path='transport' element={<Transport />}></Route>
            <Route path='refund' element={<Refund />}></Route>
          </Route>
          <Route element={<Register />} path="/register"></Route>
          <Route element={<SetupAccount />} path="/setupaccount"></Route>
          <Route element={<Login />} path="/login"></Route>
          <Route element={<ForgotPassword />} path="/forgotpassword"></Route>
          <Route element={<EnterCodePassword />} path="/entercodepassword"></Route>
          <Route path="/resetpassword">
            <Route path=':token' element={<ResetPassword />}></Route>
          </Route>
          <Route element={<EnterPhoneNumber />} path="/enterphonenumber"></Route>
        </Routes>
        <ChatWidget />
      </HistoryRouter>
    </GoogleOAuthProvider>
  </Provider>
);


