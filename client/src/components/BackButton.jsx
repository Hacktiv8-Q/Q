import { useHistory } from "react-router-dom"

export default function BackButton() {
  const history = useHistory()
  return (
    <button
      onClick={() => history.goBack()}
      className="button is-light is-medium mb-3"
    >
      <span className="icon fa-lg">
        <i className="fas fa-angle-left" />
      </span>
    </button>
  )
}
