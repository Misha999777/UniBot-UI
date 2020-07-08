import * as React from "react";
import {Component} from "react";
import {Button, Form} from "react-bootstrap";
import "../styles/Login.css";
import {login} from "../util/APIUtils";

export default class Login extends Component {

  state = {
    api: "",
    username: ""
  };

  componentDidMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let username = params.get("username");
    let token = params.get("token");
    if (username != null && token != null) {
      this.props.switchDone(true);
      login({ api: token, username: username, status: "Not running" })
        .then(response => {
          this.props.switchDone(false);
          this.props.handleLogin(response);
        })
        .catch(error => {
          alert("Something went wrong" + error);
        });
    }
  }

  handleChange = (event) => {
    let target = event.currentTarget;

    event.stopPropagation();
    event.preventDefault();

    this.setState(current => ({ ...current, [target.id]: target.value }));
  };

  handleSubmit = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const { api, username } = this.state;
    if (api !== "" && username !== "") {
      this.props.switchDone(true);
      login({ api: api, username: username, status: "Not running" })
        .then(response => {
          this.props.switchDone(false);
          this.props.handleLogin(response);
        })
        .catch(() => {
          alert("Не удается запустить бота, проверьте данные");
          this.props.switchDone(false);
        });
    }
  };

  render() {
    return (
      <div className="login">
        <h1 className="login-title">Введите данные бота</h1>
        <Form onSubmit={this.handleSubmit} autoComplete="off" noValidate>
          <Form.Group controlId="api">
            <Form.Label column={false}>Ключ бота</Form.Label>
            <Form.Control
              type="usernameOrEmail"
              placeholder="Ключ бота"
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="username">
            <Form.Label column={false}>Ник бота</Form.Label>
            <Form.Control
              type="usernameOrEmail"
              placeholder="Ник бота"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button className="login-button" variant="primary" type="submit">
            Продолжить
          </Button>
          <span className="signup-link">Нет бота? <a href={"https://thelper.tcomad.tk/"}>Создать</a> </span>
        </Form>
      </div>
    );
  }
}
