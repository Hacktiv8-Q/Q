import BackButton from "components/BackButton";
import Slider from "react-slick";

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

  return (
    <div className="columns is-centered is-vcentered">
      <div className="column is-7-desktop is-10-tablet">
        <BackButton />
        <h1 className="title">
          List of Dinner Place
        </h1>
        <Slider {...settings}>
          <div>
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src="https://picsum.photos/880/560" alt="Placeholder image" />
                </figure>
              </div>
              <div className="card-content">
                <p className="title is-4">Mashū All You Can Eat</p>
                <p className="title is-4">Queue: 5</p>
                <div className="content">
                  <button className="button is-primary is-fullwidth is-medium">ADD ME</button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src="https://picsum.photos/880/560" alt="Placeholder image" />
                </figure>
              </div>
              <div className="card-content">
                <p className="title is-4">MD Family</p>
                <p className="title is-4">Queue: 8</p>
                <div className="content">
                  <button className="button is-primary is-fullwidth is-medium">ADD ME</button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src="https://picsum.photos/880/560" alt="Placeholder image" />
                </figure>
              </div>
              <div className="card-content">
                <p className="title is-4">Bakso Cak Di</p>
                <p className="title is-4">Queue: 2</p>
                <div className="content">
                  <button className="button is-primary is-fullwidth is-medium">ADD ME</button>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}
