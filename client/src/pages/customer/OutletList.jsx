import BackButton from "components/BackButton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Slider from "react-slick";
import { fetchAllOutlet } from "../../store/action/outlet"
import { addQueue, clearQueueDetail } from '../../store/action/queue'
import { requestFirebaseNotificationPermission } from 'firebaseInit';

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        width: 'auto',
        height: 'auto',
        position: 'absolute',
        right: '30px',
        zIndex: 1
      }}
      onClick={onClick}
    >
      <i className="fas fa-chevron-right" style={{ fontSize: 60, color: '#ddd' }} />
    </div>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        width: 'auto',
        height: 'auto',
        position: 'absolute',
        left: '30px',
        zIndex: 1
      }}
      onClick={onClick}
    >
      <i className="fas fa-chevron-left" style={{ fontSize: 60, color: '#ddd' }} />
    </div>
  );
}

export default function OutletList() {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  }
  const { outletsCustomer } = useSelector(state => state.outlet)
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const [deviceToken, setDeviceToken] = useState('')


  useEffect(() => {
    dispatch(fetchAllOutlet())
  }, [])

  const category = location.state.category
  const outletByCategory = outletsCustomer.filter(el => {
    return el.category === category
  })
  console.log(outletsCustomer, 'ini outlet')

  const handleAddQueue = (OutletId) => {
    const payload = {
      deviceToken,
      outletId: OutletId
    }
    dispatch(clearQueueDetail())
    dispatch(addQueue(payload))
    history.push("/status-success")
  }


  requestFirebaseNotificationPermission()
    .then(firebaseToken => {
      // console.log('firebaseToken', firebaseToken);
      setDeviceToken(firebaseToken)
    })
    .catch(err => console.log('error', err));

  return (
    <div className="columns is-centered is-vcentered">
      <div className="column is-7-desktop is-10-tablet">
        <BackButton />
        <h1 className="title">
          List of Dinner Place
        </h1>
        <Slider {...settings}>

          {
            outletByCategory && outletByCategory.map(outlet => {
              return (
                <div>
                  <div key={outlet.id} className="card">
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img src={outlet.image_url} alt="Placeholder image" />
                      </figure>
                    </div>
                    <div className="card-content">
                      <p className="title is-4">{outlet.name}</p>
                      <p className="title is-4">Queue: {outlet.Queues.length}</p>
                      <div className="content">
                        <button onClick={() => handleAddQueue(outlet.id)} className="button is-primary is-fullwidth is-medium">ADD ME</button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }

        </Slider>
      </div>
    </div>
  );
}
