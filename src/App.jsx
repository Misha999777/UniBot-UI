import React, {Component} from "react";
import {Route, Switch} from "react-router";
import ReactLoading from "react-loading";
import LoadingOverlay from "react-loading-overlay";
import withRouter from "react-router-dom/es/withRouter";

import PWAPrompt from 'react-ios-pwa-prompt'

import {ACCESS_TOKEN} from "./constants";

import "./styles/App.css";

import AppHeader from "./components/AppHeader";
import Login from "./components/Login";
import Manage from "./components/Manage";
import NewWeek from "./components/NewWeek";

class App extends Component {

  state = {
    isAuthenticated: false,
    inProgress: false,
    section: "Расписание",
  };

  constructor(props) {
    super(props);
    this.child = React.createRef();
  }

  componentDidMount = () => {
    window.iNoBounce.disable();
    if (localStorage.getItem(ACCESS_TOKEN)) {
      this.props.history.push("/admin");
    } else if (this.props.location.pathname !== "/login" && this.props.location.pathname !== "/prompt") {
      this.switchDone(false);
      this.props.history.push("/login");
    }
  };

  handleLogin = (response) => {
    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
    this.props.history.push("/admin");
  };

  switchDone = (d) => {
    this.setState({inProgress: d});
  };

  setSection = (section) => {
    this.setState({section: section},   () => {
      this.child.current.componentDidMount();
    });
  }

  render() {
    return (
        <LoadingOverlay
            styles={{
              overlay: (base) => ({
                ...base,
                background: "rgba(0, 0, 0, 0)"
              })
            }}
            active={this.state.inProgress}
            spinner={
              <div className="loader">
                <ReactLoading type={"bars"} color={"black"}/>
              </div>
            }
        >
          <div className={"app-container"}>
            <PWAPrompt promptOnVisit={1}
                       timesToShow={3}
                       copyTitle="Этот сайт поддерживает установку"
                       copyBody="Его можно добавить на экран домой и пользываться им как приложением"
                       copyShareButtonLabel="Нажмите на кнопку действий"
                       copyAddHomeButtonLabel="Нажмите добавить на экран домой"
                       copyClosePrompt="Закрыть"
                       permanentlyHideOnDismiss={false}/>
            {localStorage.getItem(ACCESS_TOKEN) && (
                <AppHeader
                    setSection={this.setSection}
                    {...this.props}
                />
            )}
            <div className="d-flex">
              <div className="w-100">
                <Switch>
                  <Route
                      path="/login"
                      exact
                      render={(props) => (
                          <Login
                              switchDone={this.switchDone}
                              handleLogin={this.handleLogin}
                              {...props}
                          />
                      )}
                  />
                  <Route
                      path="/admin"
                      exact
                      render={(props) => (
                          <Manage
                              switchDone={this.switchDone}
                              section={this.state.section}
                              ref={this.child}
                              {...props}
                          />
                      )}
                  />
                  <Route
                      path="/newWeek"
                      exact
                      render={(props) => (
                          <NewWeek switchDone={this.switchDone} {...props} />
                      )}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </LoadingOverlay>
    );
  }
}

export default withRouter(App);
