import * as React from "react";

import {Button} from "react-bootstrap";

import "../styles/Manage.css";

import trashImg from '../icons/trash.svg'

export default class TableItem extends React.PureComponent {

    openModal = (id, title1, title2) => {
        this.props.openModal(id, title1, title2);
    }

    render() {
        let title;
        let subTitle;
        if (this.props.item.lessonOfFirstWeek) {
            title = this.props.item.lessonOfFirstWeek;
            subTitle = this.props.item.lessonOfSecondWeek;
        } else if (this.props.item.data) {
            title = this.props.item.name;
            subTitle = this.props.item.data;
        } else {
            title = this.props.item.name;
            subTitle = this.props.item.url;
        }
        return <tr key={this.props.item.id}>
            <td onClick={() => this.openModal(this.props.item.id, title,
                subTitle)}>{title}</td>
            {this.props.isFile ?
                <td><a href={this.props.item.url}>Открыть</a></td>
                :
                <td onClick={() => this.openModal(this.props.item.id, title, subTitle)}>{title}</td>
            }
            <td>
                <div style={{textAlign: "center", minWidth: "50px"}}>
                    <Button
                        variant="danger"
                        onClick={() => this.props.delteItem(this.props.item.id)}>
                        <img height={16}
                             width={14}
                             src={trashImg}
                             alt={"remove"}/>
                    </Button>
                </div>
            </td>
        </tr>
    }
}
