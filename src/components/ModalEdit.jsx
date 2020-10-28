import * as React from "react";

import {Button, Form, Modal} from "react-bootstrap";

import {addItem, uploadImage} from "../service/APIService";

import FileInput from "./FileInput";

import "../styles/Manage.css";

export default class ModalEdit extends React.PureComponent {

    state = {
        title: "",
        subtitle: "",
        file: null,
    };

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({title: nextProps.title, subtitle: nextProps.subtitle});
    }

    handleChange = (event) => {
        const target = event.target;
        this.setState(current => ({...current, [target.id]: target.value}));
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onHide();
        this.props.switchDone(true);
        addItem({
            objectID: this.props.objectId,
            section: this.props.section,
            bot: this.props.bot,
            day: this.props.day,
            title: this.state.title,
            subtitle: this.state.subtitle
        })
            .then(() => {
                this.props.switchDone(false);
                this.props.updateData({day: this.props.day});
            });
    };

    handleFileInput = (file) => {
        uploadImage(file).then((response) => this.setState({subtitle: response.fileDownloadUri}));
    };

    render() {

        return (
            <Modal show={this.props.isOpen} onHide={() => this.props.onHide()}>
                <div className="exp">
                    <h1 className="title">{this.props.section}</h1>
                    <Form onSubmit={this.handleSubmit} autoComplete="off" noValidate>

                        <Form.Group controlId="title">
                            <Form.Label column={false}>{this.props.title1}</Form.Label>
                            <Form.Control
                                value={this.state.title}
                                placeholder={this.props.title1}
                                type="text"
                                onChange={this.handleChange}
                            />
                        </Form.Group>

                        {this.props.isFile ?
                            <Form.Group controlId="file">
                                <Form.Label column={false}>Файл</Form.Label>
                                <FileInput handleFileChoose={this.handleFileInput}/>
                            </Form.Group>
                            :
                            <Form.Group controlId="subtitle">
                                <Form.Label column={false}>{this.props.title2}</Form.Label>
                                <Form.Control
                                    value={this.state.subtitle}
                                    placeholder={this.props.title2}
                                    type="text"
                                    onChange={this.handleChange}/>
                            </Form.Group>
                        }

                        <Button variant="primary" type="submit">
                            Добавить
                        </Button>
                    </Form>
                </div>
            </Modal>
        );
    }
}
