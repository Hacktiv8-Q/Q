export default function StatusQueue() {
  return (
    <div className="columns is-centered is-vcentered">
      <div className="column is-6">
        <h1 className="title has-text-centered">
          Success
        </h1>
        <div className="circle-wrapper">
          <div className="circle-fill">
            <h1 className="has-text-centered">
              <i className="fas fa-check" />
            </h1>
          </div>
        </div>
        <p className="subtitle is-5 has-text-centered">
          You’ve added to the queue number 5
        </p>
      </div>
    </div>
  )
}
