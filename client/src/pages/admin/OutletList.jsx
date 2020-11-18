import BackButton from "components/BackButton";
import { Link } from "react-router-dom";
import OutletCard from 'components/OutletCard'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { fetchOutlet } from "store/action/outlet";

export default function OutletList() {
  const { outlets } = useSelector(state => state.outlet)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOutlet())
  }, [])

  const list = () => {
    // console.log(outlets, 'asup ti list')
    return outlets.map((elem, i) => {
      return <OutletCard key={i} image_url={elem.image_url} id={elem.id} name={elem.name} description={elem.description} category={elem.category}/>
    })
  }

  return (
    <div className="columns is-centered is-vcentered">
      {outlets && outlets.length &&
      <div className="column is-6">
        <div className="is-flex is-justify-content-space-between">
          <BackButton />
          <Link
            className="button is-primary"
            to="/admin/outlet-add"
          >
            Add Outlet
          </Link>
        </div>
        <h1 className="title has-text-centered">Outlet List</h1>
        {list()}
      </div>
      }
    </div>
  )
}
