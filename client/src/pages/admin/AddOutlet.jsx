import BackButton from "components/BackButton";

export default function AddOutlet() {
  return (
    <div className="columns is-centered is-vcentered">
      <div className="column is-6">
        <BackButton />
        <h1 className="title has-text-centered">Add Outlet</h1>
        <div className="box">
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input className="input" type="text" placeholder="First name input" />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className="textarea"
                cols="30"
                rows="5"
                placeholder="Description input"
              ></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label">Image Url</label>
            <div className="control">
              <input className="input" type="text" placeholder="Image Url input" />
            </div>
          </div>
          <div className="field">
            <label className="label">Category</label>
            <div className="control">
              <input className="input" type="text" placeholder="Category input" />
            </div>
          </div>
          <div className="field mt-5">
            <p className="control">
              <div className="columns">
                <div className="column">
                  <button className="button is-primary is-fullwidth">
                    <b>Submit</b>
                  </button>
                </div>
                <div className="column">
                  <button className="button has-background-white-ter is-fullwidth">
                    <b>Cancel</b>
                  </button>
                </div>
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
