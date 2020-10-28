import * as React from "react";

import {Button, Table} from "react-bootstrap";

import {getBots} from "../service/APIService";

import "../styles/Manage.css";

import plusImg from '../icons/plus.svg'

export default class Bots extends React.PureComponent {
    state = {
        data: [],
        title: ""
    };

    componentDidMount = () => {
        this.setState({data: []});
        this.getData();
    };

    getData = () => {
        this.props.switchDone(true);
        getBots().then(response => {
            this.props.switchDone(false);
            this.setState({
                data: response._embedded.bots
            });
        });
    };

    createItem = (item) => {
        return <tr key={item.id}>
            <td>{item.username}</td>
            <td><Button onClick={() => {
                this.props.setBot(item.id);
                this.props.history.push("/admin")
            }
            }>Открыть</Button></td>
        </tr>
    }

    render() {
        const items = this.state.data.map(item => {
            return (
                this.createItem(item)
            )
        });

        return (
            <div className={"expT"}>
                <h1 className="title">{this.state.title}</h1>
                <br/>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>Имя бота</th>
                        <th>Открыть</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items}
                    </tbody>
                </Table>
                <div style={{textAlign: "left"}}>
                    <Button onClick={() => this.props.history.push("/create")}
                            variant="success"><img height={16} width={14}
                                                   src={plusImg}
                                                   alt={"add"}/> Добавить</Button>
                </div>
            </div>
        );
    }
}
