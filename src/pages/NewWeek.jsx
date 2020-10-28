import * as React from "react";
import {Button, Form} from "react-bootstrap";
import {withRouter} from "react-router";
import "../styles/New.css";
import {addWeek} from "../service/APIService";

class NewWeek extends React.Component {
    state = {
        date: ""
    };

    handleChange = (event) => {
        const target = event.target;
        this.setState(current => ({...current, [target.id]: target.value}));
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.switchDone(true);
        addWeek({
            date: this.state.date,
            botId: this.props.bot
        }).then(() => {
            this.props.switchDone(false);
            this.props.history.push("/admin");
        });
    };

    render() {
        return (
            <div className="exp">
                <h1 className="title">Настроить неделю</h1>
                <Form onSubmit={this.handleSubmit} autoComplete="off" noValidate>

                    <Form.Group controlId="date">
                        <Form.Label column={false}>Дата</Form.Label>
                        <Form.Control
                            type="birth"
                            placeholder="Например: 02-09-2019"
                            onChange={this.handleChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Установить
                    </Button>
                </Form>
            </div>
        );
    }
}

export default withRouter(NewWeek);
