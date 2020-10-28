import * as React from "react";

import {Button, Table} from "react-bootstrap";

import {deleteItem, getItems} from "../service/APIService";

import "../styles/Manage.css";

import plusImg from '../icons/plus.svg'
import ModalEdit from "../components/ModalEdit";
import DaysDropdown from "../components/DaysDropdown";
import TableItem from "../components/TableItem";

export default class Manage extends React.PureComponent {
    state = {
        data: [],
        title: "",
        subtitle: "",
        day: "1",
        modalOpen: false,
        objectID: null,
        isFile: false
    };

    componentDidMount = () => {
        this.setState({data: []});
        if (this.props.bot === "") {
            this.props.history.push("/bots")
        } else {
            this.getData({day: this.state.day});
        }
        if (this.props.section === "Учебники" || this.props.section === "Лекции") {
            this.setState({isFile: true});
        } else {
            this.setState({isFile: false});
        }
    };

    getData = (day) => {
        this.props.switchDone(true);
        getItems(this.props.section, this.props.bot).then((response) => {
            this.props.switchDone(false);
            this.setState({
                data: response._embedded[Object.keys(response._embedded)[0]].filter(function (item) {
                    if (item.day) {
                        return item.day.toString() === day.day;
                    } else {
                        return true;
                    }
                })
            });
        });
    };

    deleteItem = (id) => {
        this.props.switchDone(true);
        deleteItem(this.props.section, id).then(() => {
            this.props.switchDone(false);
            this.getData({day: this.state.day});
        });
    };

    handleSelect = (eventKey) => {
        this.setState({day: eventKey});
        this.getData({day: eventKey});
    };

    onModalClose = () => {
        this.setState({modalOpen: false, objectID: null, title: this.props.title, subtitle: this.props.subtitle});
    }

    onModalOpen = (id, title, subtitle) => {
        this.setState({modalOpen: true, objectID: id, title: title, subtitle: subtitle});
    }

    render() {
        const items = this.state.data.map(item => {
            return (
                <TableItem item={item}
                           isFile={this.state.isFile}
                           delteItem={this.deleteItem}
                           openModal={this.onModalOpen}/>
            )
        });

        return (
            <div className={"expT"}>
                <ModalEdit
                    switchDone={this.props.switchDone}
                    section={this.props.section}
                    bot={this.props.bot}
                    isFile={this.state.isFile}
                    title1={this.props.title}
                    title2={this.props.subtitle}
                    title={this.state.title}
                    subtitle={this.state.subtitle}
                    objectId={this.state.objectID}
                    isOpen={this.state.modalOpen}
                    onHide={this.onModalClose}
                    day={this.state.day}
                    updateData={this.getData}/>

                <h1 className="title">{this.props.section}</h1>

                {this.props.section === "Расписание" &&
                <DaysDropdown day={this.state.day} handleSelect={this.handleSelect}/>
                }
                <br/>

                <Table responsive>
                    <thead>
                    <tr>
                        <th>{this.props.title}</th>
                        <th>{this.props.subtitle}</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items}
                    </tbody>
                </Table>

                <div style={{textAlign: "left"}}>
                    <Button onClick={() => this.onModalOpen(null, "", "")}
                            variant="success"><img height={16} width={14} src={plusImg} alt={"add"}/> Добавить</Button>
                </div>

            </div>
        );
    }
}
