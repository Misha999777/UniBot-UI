import * as React from "react";

import {Dropdown, DropdownButton} from "react-bootstrap";

import "../styles/Manage.css";

export default class DaysDropdown extends React.PureComponent {

    getTitle = () => {
        switch (this.props.day) {
            case "1":
                return "Понедельник";
            case "2":
                return "Вторник";
            case "3":
                return "Среда";
            case "4":
                return "Четверг";
            case "5":
                return "Пятница";
            case "6":
                return "Суббота";
            default:
                return "Понедельник"
        }
    };

    onSelect = (event) => {
        this.props.handleSelect(event);
    }

    render() {
        return (
            <DropdownButton
                onSelect={this.onSelect}
                id="dropdown-item-button"
                title={this.getTitle()}>
                <Dropdown.Item eventKey="1" as="button">
                    Понедельник
                </Dropdown.Item>
                <Dropdown.Item eventKey="2" as="button">
                    Вторник
                </Dropdown.Item>
                <Dropdown.Item eventKey="3" as="button">
                    Среда
                </Dropdown.Item>
                <Dropdown.Item eventKey="4" as="button">
                    Четверг
                </Dropdown.Item>
                <Dropdown.Item eventKey="5" as="button">
                    Пятница
                </Dropdown.Item>
                <Dropdown.Item eventKey="6" as="button">
                    Суббота
                </Dropdown.Item>
            </DropdownButton>
        );
    }
}
