import BackButton from "components/BackButton";

export default function QueueList() {
  return (
    <div className="columns is-centered is-vcentered">
      <div className="column is-8">
        <BackButton />
        <h1 className="title">
          Queue List
        </h1>
        <div className="content">
          <table className="table is-hoverable">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="list-group">
              <tr className="list-group-item">
                <td>
                  1
                  </td>
                <td>
                  Ramzy Rashaun
                  </td>
                <td>
                  <button className="button is-warning">
                    <b>Q</b>
                  </button>
                </td>
              </tr>
              <tr className="list-group-item">
                <td>
                  2
                  </td>
                <td>
                  Julian Razif Figaro
                  </td>
                <td>
                  <button className="button is-success">
                    <b>IN</b>
                  </button>
                </td>
              </tr>
              <tr className="list-group-item">
                <td>
                  3
                  </td>
                <td>
                  Ikhsan Wisnuaji Gama
                  </td>
                <td>
                  <button className="button is-success">
                    <b>IN</b>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h1 className="title">
          Today Queue
        </h1>
        <div className="columns">
          <div className="column is-8">
            <div className="content">
              <div className="panel list-group">
                <a className="panel-block list-group-item disabled" href="!#">
                  1. Nabila
                </a>
                <a className="panel-block list-group-item disabled" href="!#">
                  2. Aji Tio
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
