import Page from 'components/Page';
import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';
import {withRouter} from 'react-router-dom';
import SubmitSolution from '../components/SubmitSolution';
import axios from 'axios';
import SolutionsPage from './SolutionsPage';

class TaskPage extends React.Component {

  constructor(props) {
    super(props);

    this.taskId = this.taskId.bind(this);
    this.state = {
      tasks: [],
      solutions: [],
    }
  }

  async componentDidMount() {
    const accessToken = localStorage.getItem('token1');
    const config = {
      headers: { 
        'Authorization': 'Bearer ' + accessToken
      }
    }
    const tasks = (await axios.get('http://localhost:8081/tasks', config)).data;
    const solutions = (await axios.get('http://localhost:8081/solutions', config)).data;
    this.setState({
      tasks: tasks,
      solutions: solutions,
    });
  }
  
  componentWillReceiveProps(props) {
    //alert(JSON.stringify(props));
  }

  taskId() {
    return this.props.match.params.taskId;
  }

  task(property) {
    var taskId = parseInt(this.taskId());
    var task = this.state.tasks[taskId-1];
    return task === undefined ? "":JSON.parse(JSON.stringify(task))[property];
  }

  solutions() {
    var taskId = parseInt(this.taskId());
    alert(taskId);
    return this.state.solutions[taskId-1];
  }

  render() {
    return (
      <Page
        className="ContestPage"
        title={'Задача ' + this.taskId() + " - " + this.task('name')}
      >

        <Row>
          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader className="with-border">
                Условие
              </CardHeader>
              <CardBody>
                <a href="/"  target="_blank" className="btn btn-info">Отвори</a>
                <a href="/" target="_blank" className="btn btn-info">Изтегли</a>
	            </CardBody>
            </Card>

            <Card>
              <CardHeader>
                Ограничения
              </CardHeader>
              <CardBody>
              <table className="table table-bordered">
		                <tbody>
		                <tr>
		                  <td>Време</td>
		                  <td>{this.task('time')}</td>
		                </tr>
		                <tr>
		                  <td>Памет</td>
		                  <td>{this.task('memory')}</td>
		                </tr>
		              </tbody>
		            </table>
              </CardBody>
            </Card>
            </Col>

            <Col md="6" sm="12" xs="12">
              <SubmitSolution/>
            </Col>
          </Row>

      <Row>
        <SolutionsPage taskId={this.taskId} solutions={this.state.solutions} />
      </Row>

      </Page>
    );
  }
}
export default withRouter(TaskPage);
