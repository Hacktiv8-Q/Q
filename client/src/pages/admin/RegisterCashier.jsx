import BackButton from "components/BackButton";
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerCashier } from "store/action/registerCashier";

export default function RegisterCashier() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { register, handleSubmit, errors } = useForm()
  const { outletId } = useParams()

  async function submitForm(data) {
    try {
      const body = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        OutletId: outletId
      }
      console.log(body, 'asup ti submitForm')
      await dispatch(registerCashier(body))
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
      <h1 className="title has-text-centered">Register Cashier</h1>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="box">
          <div className="field">
            <label className="label">First Name</label>
            <div className="control">
              <input name='firstName' className="input" type="text" placeholder="Enter First Name" ref={register({ required: 'Please input first name' })} />
              {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName.message}</p>}
            </div>
          </div>
          <div className="field">
            <label className="label">Last Name</label>
            <div className="control">
              <input name='lastName' className="input" type="text" placeholder="Enter Last Name" ref={register({ required: 'Please input last name' })} />
              {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName.message}</p>}
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input name='email' className="input" type="text" placeholder="Enter Email" ref={register({ required: 'Please input email' })} />
              {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input name='password' className="input" type="password" placeholder="Enter Password" ref={register({ required: 'Please input password' })} />
              {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
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
