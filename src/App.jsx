import * as React from "react"
import axios from "axios"
import { phoneIcon, closeIcon } from "./icons"
import "./styles.scss"

const App = () => {
  const [dataResponse, setDataResponse] = React.useState({})

  React.useEffect(() => {
    let mount = true
    ;(async () => {
      /**
       * @note Making API call using Axios package
       */

      const response = await axios.get(
        "https://codifyinditest.com/script_test/api-test/ "
      )
      const { data = {} } = response

      if (mount) setDataResponse(data)
    })()

    return () => {
      mount = false
    }
  }, [])

  const onCloseClick = React.useCallback(() => {
    /**
     * @note To remove the content assign empty object to response
     */
    setDataResponse({})
  }, [])

  const {
    "script test": { labels = "", phone_number = "" } = {},
  } = dataResponse

  return (
    labels !== "" && (
      <div className="call-us-wrapper">
        <div className="call-us-body">
          <h3 className="call-us-text">{labels}</h3>
          <div className="call-us-number">
            {phoneIcon()}
            <a href={`tel:${phone_number}`}>{phone_number}</a>
          </div>
        </div>
        <div className="call-us-close-wrapper" onClick={onCloseClick}>
          {closeIcon()}
        </div>
      </div>
    )
  )
}

export default App
export { App }
