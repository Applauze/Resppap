import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function AlertDismissible(props) {
  const [show, setShow] = useState(props.ShowAlert);

  const After_Event = () => {
    setShow(true);
    props.AfterEvent();
  };

  return (
    <>
      <Alert show={props.ShowAlert} variant={props.variant}>
        <Alert.Heading>{props.title}</Alert.Heading>
        <p>{props.message}</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            {props.buttontitle}
          </Button>
        </div>
      </Alert>

      <Button onClick={After_Event}>Show Alert</Button>
    </>
  );
}

export default AlertDismissible;
