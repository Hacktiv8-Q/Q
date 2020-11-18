import BackButton from "components/BackButton";
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addOutlet } from "store/action/outlet";

export default function AddOutlet() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { register, handleSubmit, errors } = useForm()

  async function submitForm(data) {
    try {
      const body = {
        name: data.name,
        description: data.description,
        category: data.category,
        image_url: data.image_url
      }
      console.log(body, 'asup ti submitForm')
      await dispatch(addOutlet(body))
      history.push('/admin/outlet-list')
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="columns is-centered is-vcentered">
      <div className="column is-6">
        <BackButton />
        <h1 className="title has-text-centered">Add Outlet</h1>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="box">
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input name='name' className="input" type="text" placeholder="Enter Outlet Name" ref={register({ required: 'Please input outlet name' })} />
                {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
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
                <input name='image_url' className="input" type="text" placeholder="Enter Image URL" ref={register({ required: 'Please input Image URL' })} />
                {errors.image_url && <p style={{ color: 'red' }}>{errors.image_url.message}</p>}
              </div>
            </div>
            {/* <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <input name='category' className="input" type="text" placeholder="Enter category" ref={register({ required: 'Please input category' })} />
                {errors.category && <p style={{ color: 'red' }}>{errors.category.message}</p>}
              </div>
            </div> */}
            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <div className="select">
                  <select
                    name="category"
                    ref={register({ required: 'Please input category' })}
                  >
                    <option value="" selected disabled>Pilih Kategori</option>
                    <option value="kesehatan">Kesehatan</option>
                    <option value="otomotif">Otomotif</option>
                    <option value="rumah-makan">Rumah makan</option>
                    <option value="lain">Lain lain</option>
                  </select>
                </div>
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
    </div>
  )
}
