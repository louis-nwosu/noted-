import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";

const SignIn = ({ toggle }) => {
  return (
    <Row>
      <Col md={8} className="signIn-side"></Col>
      <Col>
        <Row>
          <Col className="py-5">
            <p className="display-4 py-1 text-center">Jott3d.</p>
          </Col>
        </Row>
        <Row>
          <Col md={12} sm={12} className="px-5">
            <p className="display-5 py-1">
              Sign into your account to share and access your notes.
            </p>
          </Col>
          <Col md={{ offset: 1, span: 10 }}>
            <Button variant="danger" className="px-5" style={{ width: "100%" }}>
              sign in with Google
            </Button>
          </Col>
          <Col md={{ offset: 1 }} className="mx-auto py-2">
            <hr />
            <p
              className="text-center bg-light p-2 mx-auto rounded"
              style={{ marginTop: "-9.5%", width: "10%" }}
            >
              or
            </p>
          </Col>
          <Col md={{ offset: 1, span: 10 }}>
            <InputGroup className="mb-3">
              <FormControl
                aria-label="Text input with checkbox"
                placeholder="e-mail"
              />
            </InputGroup>
            <InputGroup>
              <FormControl
                aria-label="Text input with radio button"
                placeholder="password"
              />
            </InputGroup>
            <Button
              variant="primary"
              className="px-5 my-3"
              style={{ width: "100%" }}
            >
              next
            </Button>
            <p className="text-center">
              don't have an account?{" "}
              <span
                className="text-primary mx-2"
                onClick={toggle}
                style={{ cursor: "pointer" }}
              >
                sign up
              </span>
            </p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const SignUp = ({ toggle }) => {
  return (
    <Row className='signIn-side'>
      <Col md={5} className="mx-auto mt-4 rounded glass">
        <Row>
          <Col className="py-1">
            <p className="display-4 py-1 text-center">Jott3d.</p>
          </Col>
        </Row>
        <Row>
          <Col md={12} sm={12} className="px-5">
            <p className="display-5 py-1">
              Sign into your account to share and access your notes.
            </p>
          </Col>
          <Col md={{ offset: 1, span: 10 }}>
            <Button
              variant="danger"
              className="px-5 my-2"
              style={{ width: "100%" }}
            >
              sign up with Google
            </Button>
          </Col>
          <Col md={{ offset: 1 }} className="mx-auto py-2">
            <hr />
            <p
              className="text-center bg-light p-1 mx-auto rounded"
              style={{ marginTop: "-7%", width: "10%" }}
            >
              or
            </p>
          </Col>
          <Col md={{ offset: 1, span: 10 }}>
            <InputGroup className="mb-3">
              <FormControl
                aria-label="Text input with checkbox"
                placeholder="User name"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl
                aria-label="Text input with checkbox"
                placeholder="e-mail"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl
                aria-label="Text input with checkbox"
                placeholder="password"
              />
            </InputGroup>

            <Button
              variant="primary"
              className="px-5 my-3"
              style={{ width: "100%" }}
            >
              next
            </Button>
            <p className="text-center">
              don't have an account?{" "}
              <span
                className="text-primary mx-2"
                onClick={toggle}
                style={{ cursor: "pointer" }}
              >
                sign in
              </span>
            </p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const Form = () => {
  const [hasAccount, setHasAccount] = React.useState(true);
  const toggleAccount = () => setHasAccount(!hasAccount);
  return (
    <Container fluid>
      <Row>
        <Col>
          {hasAccount ? (
            <SignIn toggle={toggleAccount} />
          ) : (
            <SignUp toggle={toggleAccount} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Form;
