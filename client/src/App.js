import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {
  Status,
  ScanQRCode,
  StatusQueue,
  StatusSuccess,
  Categories,
  OutletList as OutletListCustomer,
  Login as LoginCustomer,
  Register as RegisterCustomer
} from "./pages/customer";
import {
  AddOutlet,
  Home,
  QRCode,
  QueueHistory,
  QueueList,
  OutletList as OutletListAdmin
} from "./pages/admin";
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ChooseRole from "pages/ChooseRole";

export default function App() {
  return (
    <Router>
      <section className="section">
        <div className="container">
          <Switch>
            {/* General */}
            <Route path="/" exact>
              {/* <ChooseRole /> */}
              <Status />
            </Route>

            {/* Customer Route */}
            <Route path="/status" exact>
              <Status />
            </Route>
            <Route path="/status-queue">
              <StatusQueue />
            </Route>
            <Route path="/status-success">
              <StatusSuccess />
            </Route>
            <Route path="/categories">
              <Categories />
            </Route>
            <Route path="/scan">
              <ScanQRCode />
            </Route>
            <Route path="/outlet-list">
              <OutletListCustomer />
            </Route>
            <Route path="/login">
              <LoginCustomer />
            </Route>
            <Route path="/register">
              <RegisterCustomer />
            </Route>

            {/* Admin Route */}
            {/* Home for admin Cashier */}
            <Route path="/admin/" exact>
              <Home />
            </Route>
            {/* Home for admin Owner */}
            <Route path="/admin/outlet-list">
              <OutletListAdmin />
            </Route>
            <Route path="/admin/outlet-add">
              <AddOutlet />
            </Route>
            <Route path="/admin/qrcode">
              <QRCode />
            </Route>
            <Route path="/admin/queue-list">
              <QueueList />
            </Route>
            <Route path="/admin/queue-history">
              <QueueHistory />
            </Route>
          </Switch>
        </div>
      </section>
    </Router>
  );
}
