import BackButton from "components/BackButton";

export default function QueueHistory() {
  return (
    <div className="columns is-centered">
      <div className="column is-6">
        <BackButton />
        <h1 className="title">
          Queue History List
        </h1>
        <div className="content">
          <div className="panel list-group">
            <a className="panel-block list-group-item" href="!#">
              1. Nasrul Ilmi
            </a>
            <a className="panel-block list-group-item" href="!#">
              2. Riki Hidayat
            </a>
            <a className="panel-block list-group-item" href="!#">
              3. Fernando
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
