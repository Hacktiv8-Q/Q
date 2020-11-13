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
  OutletList,
  Login as LoginCustomer,
  Register as RegisterCustomer
} from "./pages/customer";
import { Home } from "./pages/admin";
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function App() {
  return (
    <Router>
      <section className="section">
        <div className="container">
          <Switch>
            {/* Customer Route */}
            <Route path="/" exact>
              <Status />
            </Route>
            <Route path="/status">
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
              <OutletList />
            </Route>
            <Route path="/login">
              <LoginCustomer />
            </Route>
            <Route path="/register">
              <RegisterCustomer />
            </Route>

            {/* Admin Route */}
            <Route path="/admin/">
              <Home />
            </Route>
          </Switch>
        </div>
      </section>
    </Router>
  );
}
