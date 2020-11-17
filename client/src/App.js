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
						<Route path="/login">
							<LoginCustomer />
						</Route>
						<Route path="/register">
							<RegisterCustomer />
						</Route>
						<Route path="/qrcode-detail">
							<QRCodeDetail />
						</Route>
						<Route path="/notification">
							<Notification />
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
