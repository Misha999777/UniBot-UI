import * as React from "react";

import {Navbar} from "react-bootstrap";
import {slide as Menu} from 'react-burger-menu'

import "../styles/AppHeader.css";
import Button from "react-bootstrap/Button";
import {AuthService} from "../service/AuthService";

export default class AppHeader extends React.Component {
    state = {
        selected: "Расписание",
        opened: false
    };

    componentDidMount = () => {
        window.onresize = () => {
            this.setState({opened: false})
        };
    };

    preventDefault(e) {
        e.preventDefault();
    };

    handleStateChange = (state) => {
        this.setState({opened: state.isOpen});
        // Prevent scroll when menu is open on all platforms
        if (state.isOpen) {
            window.iNoBounce.enable(); //iOS
            document.addEventListener('wheel', this.preventDefault, {passive: false}); // Chrome
            window.onwheel = this.preventDefault; // Desktop default
            window.ontouchmove = this.preventDefault; // Mobile default

        } else {
            window.iNoBounce.disable(); //iOS
            document.removeEventListener('wheel', this.preventDefault); // Chrome
            window.onwheel = null; // Desktop default
            window.ontouchmove = null; // Mobile default
        }
    };

    handleMenuClick = (ev) => {
        this.setState({selected: ev, opened: false});
        switch (ev.name) {
            case "Настройки":
                this.props.history.push("/newWeek");
                break;
            default:
                this.props.history.push("/admin");
                this.props.setSection(ev);
        }
    };

    getMenuItems = () => {
        return [
            {name: "Расписание", title: "Первая неделя", subtitle: "Вторая неделя"},
            {name: "Преподаватели", title: "Имя", subtitle: "Данные"},
            {name: "Лекции", title: "Название", subtitle: "Ссылка"},
            {name: "Учебники", title: "Название", subtitle: "Ссылка"},
            {name: "Студенты", title: "Имя", subtitle: "Данные"},
            {name: "Ссылки", title: "Название", subtitle: "Ссылка"},
            {name: "Настройки", title: "", subtitle: ""}
        ];
    };

    handleLogout = () => {
        let authService = new AuthService();
        authService.logout();
    };

    render() {
        let left = getComputedStyle(document.body).getPropertyValue("--sal").replace(/\D/g, '');
        let calc = Math.max(Number(left), 15);
        let styles = {
            bmBurgerButton: {
                position: 'absolute',
                width: '25px',
                height: '25px',
                left: calc.toString() + "px",
                top: '20px'
            },
            bmBurgerBars: {
                background: 'white'
            },
            bmCrossButton: {
                visibility: 'hidden'
            },
            bmCross: {
                background: 'white'
            },
            bmMenu: {
                background: '#373a47',
                padding: '2.5em 1.5em 0',
                fontSize: '1.7em'
            },
            bmItemList: {
                color: '#b8b7ad'
            },
        };

        const listItems = this.getMenuItems().map(item => (
            <div id={item.name} style={{padding: "10px"}} onClick={() => this.handleMenuClick(item)}>{item.name}</div>
        ));

        return (
            <div>
                <Navbar
                    bg="dark"
                    expand="lg"
                    className="justify-content-between navbar app-header-padding"
                >
                    <br/>
                    <br/>
                    <Button onClick={this.handleLogout}>Выйти</Button>
                </Navbar>
                {this.props.location.pathname === "/admin" &&
                <Menu disableAutoFocus isOpen={this.state.opened}
                      onStateChange={(state) => this.handleStateChange(state)} styles={styles}>
                    <div style={{paddingBottom: "50px"}}>{listItems}</div>
                </Menu>
                }
            </div>
        );
    }
}
