import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {
  Status,
  ScanQRCode,
  StatusQueue,
  StatusSuccess,
  Categories,
  OutletList as OutletListCustomer,
  Login as LoginCustomer,
  Register as RegisterCustomer,
  QRCodeDetail,
  Notification,
} from "./pages/customer";
import {
  AddOutlet,
  Home,
  QRCode,
  Login as LoginAdmin,
  QueueHistory,
  QueueList,
  OutletList as OutletListAdmin,
  ScanQRCode as ScanQRCodeAdmin,
  RegisterCashier,
  EditOutlet,
  LoginCashier
} from "./pages/admin";
import RegisterAdmin from "./pages/admin/RegisterAdmin";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ChooseRole from "pages/ChooseRole";

const PrivateRouteCustomer = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (localStorage.tokenCustomer) {
          return <Component />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

const PrivateRouteAdmin = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (localStorage.tokenAdmin) {
          return <Component />;
        } else {
          return <Redirect to="/admin/login" />;
        }
      }}
    />
  );
};

const PrivateRouteCashier = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (localStorage.tokenCashier) {
          return <Component />;
        } else {
          return <Redirect to="/admin/login" />;
        }
      }}
    />
  );
};

export default function App() {
  return (
    <Router>
      <section className="section">
        <div className="container">
          <Switch>
            {/* General */}
            <Route path="/" exact>
              <ChooseRole />
            </Route>

            {/* Customer Route */}
            <PrivateRouteCustomer path="/status" component={Status} exact />
            <PrivateRouteCustomer
              path="/status-queue"
              component={StatusQueue}
            />
            <PrivateRouteCustomer
              path="/status-success"
              component={StatusSuccess}
            />
            <PrivateRouteCustomer path="/categories" component={Categories} />
            <PrivateRouteCustomer path="/scan" component={ScanQRCode} />
            <PrivateRouteCustomer
              path="/outlet-list"
              component={OutletListCustomer}
            />
            <PrivateRouteCustomer
              path="/qrcode-detail"
              component={QRCodeDetail}
            />
            <Route path="/login">
              <LoginCustomer />
            </Route>
            <Route path="/register">
              <RegisterCustomer />
            </Route>
            <Route path="/notification">
              <Notification />
            </Route>

            {/* Admin Route */}
            {/* Home for admin Cashier */}
            <PrivateRouteCashier
              path="/admin/"
              component={Home}
              exact
            />
            <PrivateRouteCashier
              path="/admin/scan/:queueId"
              component={ScanQRCodeAdmin}
            />
            <PrivateRouteCashier
              path="/admin/qrcode"
              component={QRCode}
            />
            <PrivateRouteCashier
              path="/admin/queue-list"
              component={QueueList}
            />
            {/* Home for admin Owner */}
            <PrivateRouteAdmin
              path="/admin/outlet-list"
              component={OutletListAdmin}
            />
            <PrivateRouteAdmin
              path="/admin/outlet-add"
              component={AddOutlet}
            />
            <PrivateRouteAdmin
              path="/admin/queue-history"
              component={QueueHistory}
            />
            <Route path="/admin/login">
              <LoginAdmin />
            </Route>
            <Route path="/admin/register">
              <RegisterAdmin />
            </Route>
          </Switch>
        </div>
      </section>
    </Router>
  );
}
