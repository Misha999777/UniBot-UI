import * as React from "react";

import {
  Button,
  Dropdown,
  DropdownButton,
  Form,
  Modal,
  Table
} from "react-bootstrap";

import {
  addApp,
  addBook,
  addLecture,
  addLesson,
  addStudent,
  addTeacher,
  deleteApp,
  deleteBook,
  deleteLecture,
  deleteLesson,
  deleteStudent,
  deleteTeacher,
  getApp,
  getBooks,
  getLecture,
  getLesson,
  getStudent,
  getTeacher,
  uploadImage
} from "../util/APIUtils";

import FileInput from "./FileInput";

import "../styles/Manage.css";

export default class Manage extends React.PureComponent {
  state = {
    data: [],
    title: "",
    subtitle: "",
    day: "1",
    modalOpen: false,
    objectID: null,
    title1: "Первая неделя",
    title2: "Вторая неделя",
    isFile: false,
    file: null,
  };

  componentDidMount = () => {
    this.setState({data: []});
    this.getData({day: this.state.day});
    switch (this.props.section) {
      case "Расписание":
        this.setState({
          title1: "Первая неделя",
          title2: "Вторая неделя",
          isFile: false
        });
        break;
      case "Преподаватели":
      case "Студенты" :
        this.setState({
          title1: "Имя",
          title2: "Данные",
          isFile: false
        });
        break;
      case "Лекции":
      case "Учебники" :
        this.setState({
          title1: "Название",
          title2: "Ссылка",
          isFile: true
        });
        break;
      case "Ссылки" :
        this.setState({
          title1: "Название",
          title2: "Ссылка",
          isFile: false
        });
        break;
      default:
        this.setState({
          title1: "Первая неделя",
          title2: "Вторая неделя",
          isFile: false
        });
    }
  };

  getData = (day) => {
    this.props.switchDone(true);
    switch (this.props.section) {
      default:
      case "Расписание":
        getLesson().then(response => {
          this.props.switchDone(false);
          this.setState({data: response._embedded.lessons.filter(function(lesson) {
              return lesson.day.toString() === day.day;
            })
          });
        });
        break;
      case "Ссылки":
        getApp().then(response => {
          this.props.switchDone(false);
          this.setState({ data: response._embedded.apps });
        });
        break;
      case "Учебники":
        getBooks().then(response => {
          this.props.switchDone(false);
          this.setState({ data: response._embedded.books });
        });
        break;
      case "Лекции":
        getLecture().then(response => {
          this.props.switchDone(false);
          this.setState({ data: response._embedded.lectures });
        });
        break;
      case "Студенты":
        getStudent().then(response => {
          this.props.switchDone(false);
          this.setState({ data: response._embedded.students });
        });
        break;
      case "Преподаватели":
        getTeacher().then(response => {
          this.props.switchDone(false);
          this.setState({ data: response._embedded.teachers });
        });
        break;
    }
  };

  handleSelect = (eventKey) => {
    this.setState({day: eventKey});
    this.getData({ day: eventKey });
  };

  deleteItem = (id) =>{
    this.props.switchDone(true);
    switch (this.props.section) {
      case "Расписание":
        deleteLesson({
          id: id
        }).then(() => {
          this.props.switchDone(false);
          this.getData({day: this.state.day});
        });
        break;
      case "Ссылки":
        deleteApp({
          id: id
        }).then(() => {
          this.props.switchDone(false);
          this.getData();
        });
        break;
      case "Учебники":
        deleteBook({
          id: id
        }).then(() => {
          this.props.switchDone(false);
          this.getData();
        });
        break;
      case "Лекции":
        deleteLecture({
          id: id
        }).then(() => {
          this.props.switchDone(false);
          this.getData();
        });
        break;
      case "Студенты":
        deleteStudent({
          id: id
        }).then(() => {
          this.props.switchDone(false);
          this.getData();
        });
        break;
      case "Преподаватели":
        deleteTeacher({
          id: id
        }).then(() => {
          this.props.switchDone(false);
          this.getData();
        });
        break;
      default:
        deleteLesson({
          id: id
        }).then(() => {
          this.props.switchDone(false);
          this.getData({day: this.state.day});
        });
    }
  };

  getTitle = () => {
    switch (this.state.day) {
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

  handleChange = (event) => {
    const target = event.target;
    this.setState(current => ({ ...current, [target.id]: target.value }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({modalOpen: false});
    this.props.switchDone(true);
    switch (this.props.section) {
      case "Расписание":
        addLesson({
          id: this.state.objectID,
          lessonOfFirstWeek: this.state.title,
          lessonOfSecondWeek: this.state.subtitle,
          day: this.state.day
        }).then(() => {
          this.props.switchDone(false);
          this.getData({ day: this.state.day });
        });
        break;
      case "Ссылки":
        addApp({
          id: this.state.objectID,
          name: this.state.title,
          url: this.state.subtitle
        }).then(() => {
          this.props.switchDone(false);
          this.getData();
        });
        break;
      case "Учебники":
        uploadImage(this.state.file).then(
            response => addBook({
              id: this.state.objectID,
              name: this.state.title,
              url: response.fileDownloadUri
            }).then(() => {
              this.props.switchDone(false);
              this.getData();
            })
        ).catch(() => {
          this.props.switchDone(false);
          alert("Невозможно загрузить файл");
        });
        break;
      case "Лекции":
        uploadImage(this.state.file).then(
            response => addLecture({
              id: this.state.objectID,
              name: this.state.title,
              url: response.fileDownloadUri
            }).then(() => {
              this.props.switchDone(false);
              this.getData();
            })
        ).catch(() => {
          this.props.switchDone(false);
          alert("Невозможно загрузить файл");
        });
        break;
      case "Студенты":
        addStudent({
          id: this.state.objectID,
          name: this.state.title,
          data: this.state.subtitle
        }).then(() => {
          this.props.switchDone(false);
          this.getData();
        });
        break;
      case "Преподаватели":
        addTeacher({
          id: this.state.objectID,
          name: this.state.title,
          data: this.state.subtitle
        }).then(() => {
          this.props.switchDone(false);
          this.getData();
        });
        break;
      default:
        addLesson({
          id: this.state.objectID,
          name: this.state.title,
          data: this.state.subtitle,
          day: this.state.day
        }).then(() => {
          this.props.switchDone(false);
          this.getData({ day: this.state.day });
        });
    }
  };

  onOpenModal = (id, t1, t2) => {
    this.setState({objectID: id, title:t1, subtitle: t2, modalOpen: true});
  };

  onCloseModal = () => {
    this.setState({objectID: null, modalOpen: false});
  };

  handleFileInput = (file) => {
    this.setState({file: file});
  };

   createItem = (item) => {
    if (this.state.isFile) {
      return <tr key={item.id}>
        <td onClick={() => this.onOpenModal(item.id, item.name,
            item.url)}>{item.name}</td>
        <td><a href={item.url}>Открыть</a></td>
        <td>
        <div style={{textAlign:"center", minWidth:"50px"}}>
          <Button variant="danger" onClick={() => this.deleteItem(item.id)}><img height={16} width={14} src={"trash.svg"} alt={"remove"}/></Button>
        </div>
        </td>
      </tr>
    }
    else if(item.lessonOfFirstWeek) {
      return <tr key={item.id}>
        <td onClick={() => this.onOpenModal(item.id, item.lessonOfFirstWeek,
            item.lessonOfSecondWeek)}>{item.lessonOfFirstWeek}</td>
        <td onClick={() => this.onOpenModal(item.id, item.name,
            item.url)}>{item.lessonOfSecondWeek}</td>
      <td>
        <div style={{textAlign:"center", minWidth:"50px"}}>
          <Button variant="danger" onClick={() => this.deleteItem(item.id)}><img height={16} width={14} src={"trash.svg"} alt={"remove"}/></Button>
        </div>
      </td>
      </tr>
    }
    else if(item.data) {
      return <tr key={item.id}>
        <td onClick={() => this.onOpenModal(item.id, item.name,
          item.data)}>{item.name}</td>
        <td onClick={() => this.onOpenModal(item.id, item.name,
          item.data)}>{item.data}</td>
        <td>
        <div style={{textAlign:"center", minWidth:"50px"}}>
          <Button variant="danger" onClick={() => this.deleteItem(item.id)}><img height={16} width={14} src={"trash.svg"} alt={"remove"}/></Button>
        </div>
        </td>
      </tr>
    }
    else {
      return <tr key={item.id}>
        <td onClick={() => this.onOpenModal(item.id, item.name,
            item.url)}>{item.name}</td>
        <td><a href={item.url}>Открыть</a></td>
          <td>
        <div style={{textAlign:"center", minWidth:"50px"}}>
          <Button variant="danger" onClick={() => this.deleteItem(item.id)}><img height={16} width={14} src={"trash.svg"} alt={"remove"}/></Button>
        </div>
          </td>
      </tr>
    }
  }

  render() {
    const items = this.state.data.map(item => {
      return (
          this.createItem(item)
      )
    });

    return (
      <div className={"expT"}>
        <Modal show={this.state.modalOpen} onHide={() =>this.onCloseModal()}>
          <div className="exp">
            <h1 className="title">{this.props.section}</h1>
            <Form onSubmit={this.handleSubmit} autoComplete="off" noValidate>

              <Form.Group controlId="title">
                <Form.Label column={false}>{this.state.title1}</Form.Label>
                <Form.Control value={this.state.title} placeholder={this.state.title1} type="text" onChange={this.handleChange} />
              </Form.Group>

              {this.state.isFile ?
                  <Form.Group controlId="file">
                    <Form.Label column={false}>Файл</Form.Label>
                    <FileInput handleFileChoose={this.handleFileInput}/>
                  </Form.Group>
                  :
                  <Form.Group controlId="subtitle">
                    <Form.Label column={false}>{this.state.title2}</Form.Label>
                    <Form.Control value={this.state.subtitle} placeholder={this.state.title2} type="text" onChange={this.handleChange} />
                  </Form.Group>
              }

              <Button variant="primary" type="submit">
                Добавить
              </Button>
            </Form>
          </div>
        </Modal>

        <h1 className="title">{this.props.section}</h1>
        {this.props.section === "Расписание" &&
        <DropdownButton
            onSelect={this.handleSelect.bind(this)}
            id="dropdown-item-button"
            title={this.getTitle()}
        >
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
        }
        <br/>
        <Table responsive>
          <thead>
          <tr>
            <th>{this.state.title1}</th>
            <th>{this.state.title2}</th>
            <th>Действия</th>
          </tr>
          </thead>
          <tbody>
          {items}
          </tbody>
        </Table>
        <div style={{textAlign: "left"}}>
            <Button onClick={() => this.onOpenModal(null, "", "")}
                    variant="success"><img height={16} width={14} src={"plus.svg"} alt={"add"}/> Добавить</Button>
        </div>
      </div>
    );
  }
}
