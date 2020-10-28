import React, {Component} from "react";
import {Route, Switch} from "react-router";
import ReactLoading from "react-loading";
import LoadingOverlay from "react-loading-overlay";
import {withRouter} from "react-router-dom";

import "./styles/App.css";

import AppHeader from "./components/AppHeader";
import Manage from "./pages/Manage";
import NewWeek from "./pages/NewWeek";
import Bots from "./pages/Bots";
import CreateBot from "./pages/CreateBot";
import {AuthService} from "./service/AuthService";

class App extends Component {

    state = {
        isAuthenticated: false,
        inProgress: false,
        section: "Расписание",
        title: "Первая неделя",
        subtitle: "Вторая неделя",
        bot: ""
    };

    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.authService = new AuthService();
    }

    componentDidMount() {
        this.authService.loadUser().then(() => {
            if (this.authService.isLoggingIn) {
                this.authService.completeLogin().then(() => {
                    this.checkLogin();
                });
            } else if (this.authService.isLoggingOut) {
                this.authService.completeLogout().then(() => {
                    this.checkLogin();
                });
            } else {
                this.checkLogin();
            }
        })
    };

    checkLogin() {
        if (this.authService.isLoggedIn) {
            this.props.history.push("/bots");
        } else {
            this.authService.login();
        }
    }

    switchDone = (d) => {
        this.setState({inProgress: d});
    };

    setSection = (section) => {
        this.setState({section: section.name, title: section.title, subtitle: section.subtitle}, () => {
            this.child.current.componentDidMount();
        });
    }

    setBot = (bot) => {
        this.setState({bot: bot});
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
                    <AppHeader
                        setSection={this.setSection}
                        authService={this.authService}
                        {...this.props}
                    />
                    <div className="d-flex">
                        <div className="w-100">
                            <Switch>
                                <Route
                                    path="/bots"
                                    exact
                                    render={(props) => (
                                        <Bots
                                            setBot={this.setBot}
                                            switchDone={this.switchDone}
                                            {...props}
                                        />
                                    )}
                                />
                                <Route
                                    path="/create"
                                    exact
                                    render={(props) => (
                                        <CreateBot
                                            switchDone={this.switchDone}
                                            {...props}
                                        />
                                    )}
                                />
                                <Route
                                    path="/admin"
                                    render={(props) => (
                                        <Manage
                                            switchDone={this.switchDone}
                                            section={this.state.section}
                                            title={this.state.title}
                                            subtitle={this.state.subtitle}
                                            bot={this.state.bot}
                                            ref={this.child}
                                            {...props}
                                        />
                                    )}
                                />
                                <Route
                                    path="/newWeek"
                                    exact
                                    render={(props) => (
                                        <NewWeek switchDone={this.switchDone}
                                                 bot={this.state.bot}
                                                 {...props} />
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
