import Page from 'components/Page';
import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';
import SubmitSolution from '../components/SubmitSolution';
import axios from 'axios';
import TaskSolutions from '../components/TaskSolutions';
import {openPdfInNewTab, downloadPdf} from '../pdfUtil.js';

class TaskPage extends React.Component {

  state = {
    task: {
      number: "",
      name: "",
      time: "",
      memory: "",
    },
    solutions: [],
  }

  async fetchTaskDetails() {
    const taskId = this.props.match.params.taskId;
    const task = (await axios.get('/tasks/'+taskId)).data;
    const solutions = (await axios.get(`/tasks/${taskId}/solutions`)).data;
    this.setState({
      task,
      solutions,
    });
  }
  async componentDidMount() {
    this.fetchTaskDetails();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.match.params.taskId !== this.props.match.params.taskId) {
      this.fetchTaskDetails();
    }
  }

  async showPdf(e, open) {
    e.preventDefault();

    const {name, number} = this.state.task;
    const data = (await axios.get(`/tasks/${number}/pdf`, {
      responseType: 'arraybuffer'
    })).data;
    const pdf = new Blob([data],{type: 'application/pdf'});

    if (open) openPdfInNewTab(pdf, number);
    else downloadPdf(pdf, name);
  }

  render() {
      const {task: {name, number, time, memory}, solutions} = this.state;
      const {taskId} = this.props.match.params;
    return (
      <Page
        className="ContestPage"
        title={`Задача ${taskId} - ${name}`}
      >

        <Row>
          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader className="with-border">
                Условие
              </CardHeader>
              <CardBody>
                <Link to={`/tasks/${number}/pdf`} onClick={e => this.showPdf(e, true)} className="btn btn-info">Отвори</Link>
                <Link to={`/tasks/${number}/pdf`} onClick={e => this.showPdf(e, false)} className="btn btn-info">Изтегли</Link>
	            </CardBody>
            </Card>

            <LimitsCard time={time} memory={memory}/>
            </Col>

            <Col md="6" sm="12" xs="12">
              <SubmitSolution/>
            </Col>
          </Row>

      <Row>
        <TaskSolutions taskId={taskId} solutions={solutions} />
      </Row>

      </Page>
    );
  }
}

const LimitsCard = ({memory, time}) =>
<Card>
    <CardHeader>
    Ограничения
    </CardHeader>
    <CardBody>
<table className="table table-bordered">
    <tbody>
    <tr>
    <td>Време</td>
    <td>{time}</td>
    </tr>
    <tr>
    <td>Памет</td>
    <td>{memory}</td>
    </tr>
    </tbody>
    </table>
    </CardBody>
    </Card>;

export default withRouter(TaskPage);
