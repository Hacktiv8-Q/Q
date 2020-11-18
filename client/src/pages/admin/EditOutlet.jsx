import BackButton from "components/BackButton";
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOutletById, editOutlet } from "store/action/outlet";
import { useEffect } from "react";

export default function EditOutlet() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { register, handleSubmit, errors } = useForm()
  const { outletId } = useParams()
  const { outlets } = useSelector(state => state.outlet)

  useEffect(() => {
    dispatch(fetchOutletById(outletId))
  }, [])

  async function submitForm(data) {
    try {
      const body = {
        id: +outletId,
        name: data.name,
        description: data.description,
        category: data.category,
        image_url: data.image_url
      }
      console.log(body, 'asup ti submitForm')
      await dispatch(editOutlet(body))
      history.push('/admin/outlet-list')
    }
    catch (err) {
    console.log(err)
  }
}

return (
  
  <div className="columns is-centered is-vcentered">
    {outlets && 
    <div className="column is-6">
      <BackButton />
      <h1 className="title has-text-centered">Add Outlet</h1>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="box">
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input defaultValue={outlets.name} name='name' className="input" type="text" placeholder="Enter Outlet Name" ref={register({ required: 'Please input outlet name' })} />
              {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                defaultValue={outlets.description}
                name='description'
                ref={register({ required: 'Please input description' })}
                className="textarea"
                cols="30"
                rows="5"
                placeholder="Description input"
              ></textarea>
              {errors.description && <p style={{ color: 'red' }}>{errors.description.message}</p>}
            </div>
          </div>
          <div className="field">
            <label className="label">Image Url</label>
            <div className="control">
              <input defaultValue={outlets.image_url} name='image_url' className="input" type="text" placeholder="Enter Image URL" ref={register({ required: 'Please input Image URL' })} />
              {errors.image_url && <p style={{ color: 'red' }}>{errors.image_url.message}</p>}
            </div>
          </div>
          <div className="field">
            <label className="label">Category</label>
            <div className="control">
              <input defaultValue={outlets.category} name='category' className="input" type="text" placeholder="Enter category" ref={register({ required: 'Please input category' })} />
              {errors.category && <p style={{ color: 'red' }}>{errors.category.message}</p>}
            </div>
          </div>
          <div className="field mt-5">
            <div className="control">
              <div className="columns">
                <div className="column">
                  <button type='submit' className="button is-primary is-fullwidth">
                    <b>Submit</b>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    }
  </div>
)
}
