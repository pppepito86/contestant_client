import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class AuthForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();
    var data = new FormData(event.target);
    data.append('grant_type', 'password');
    const config = {
      headers: { 
        'Authorization':'Basic Y29udGVzdF91c2VyX2NsaWVudDpjb250ZXN0X3VzZXJfY2xpZW50X3NlY3JldA==',
        'Content-Type': 'application/x-www-form-urlencoded' 
      }
    }
    axios.post("http://localhost:8081/oauth/token", data, config)
    .then(response => {
        console.log(response);
        localStorage.setItem('token', response);
        localStorage.setItem('token1', JSON.parse(JSON.stringify(response['data']['access_token'])));
        this.props.history.push("/");
    })
    .catch(error => {
        console.log(error);
    });
  };

  render() {
    const {
      usernameLabel,
      usernameInputProps,
      passwordLabel,
      passwordInputProps,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        {(
          <div className="text-center pb-4">
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 60, height: 60, cursor: 'pointer' }}
              alt="logo"
            />
          </div>
        )}
        <FormGroup>
          <Label for={usernameLabel}>{usernameLabel}</Label>
          <Input id="username" name="username" {...usernameInputProps} />
        </FormGroup>
        <FormGroup>
          <Label for={passwordLabel}>{passwordLabel}</Label>
          <Input id="password" name="password" {...passwordInputProps} />
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" />{' '}
            Запомни ме
          </Label>
        </FormGroup>
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block>
          Вход
        </Button>
      </Form>
    );
  }
}

AuthForm.propTypes = {
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
};

AuthForm.defaultProps = {
  usernameLabel: 'Потребителско име',
  usernameInputProps: {
    type: 'name',
    placeholder: '',
  },
  passwordLabel: 'Парола',
  passwordInputProps: {
    type: 'password',
    placeholder: '',
  },
};

export default withRouter(AuthForm);
