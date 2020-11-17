import { useEffect, useState } from "react";
import axios from 'config/axios'
import { requestFirebaseNotificationPermission, onMessageListener } from "firebaseInit";
import BackButton from "components/BackButton";

export default function Messaging() {
  const [messages, setMessages] = useState([]);
  const [requesting, setRequesting] = useState(false);
  const [deviceToken, setDeviceToken] = useState('');

  useEffect(() => {

  }, []);

  requestFirebaseNotificationPermission()
    .then(firebaseToken => {
      console.log('firebaseToken', firebaseToken);
      // localStorage.setItem('deviceToken', firebaseToken)
      setDeviceToken(firebaseToken)
    })
    .catch(err => console.log('error', err));

  onMessageListener()
    .then((payload) => {
      console.log('payload', payload)
      const { title, body } = payload.data;
      console.log(`message ${title}; ${body}`);
    })
    .catch((err) => {
      console.error(JSON.stringify(err));
    });

  return (
    <div>
      {/* form goes here */}
      <div className="box">
        <BackButton />
        <h3 className="title">Messages</h3>
        <button
          className="button is-danger is-light"
          onClick={() => {
            setRequesting(true);

            if (deviceToken) {
              axios.post("/notification/", { deviceToken })
                .then((resp) => {
                  setMessages(resp.data.messages);
                  setRequesting(false);
                });
            }
          }}
        >Click</button>
        {requesting && <span>Loading...</span>}
        {deviceToken && <p className="subtitle">{deviceToken}</p>}
        {messages && (
          <>
            <h1 className="subtitle">{messages}</h1>
            {/* {messages.map(({ name, message }, index) => {
                return (
                  <div key={index}>
                    {name}: {message}
                  </div>
                );
              })} */}
          </>
        )}
      </div>
    </div>
  );
};
