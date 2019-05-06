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

    this.state = {
      task: {
        name: "",
      },
      solution: [],
    }
  }

  async fetchTaskDetails() {
    const accessToken = localStorage.getItem('token1');
    const config = {
      headers: { 
        'Authorization': 'Bearer ' + accessToken
      }
    }
    const task = (await axios.get('http://localhost:8081/tasks/'+this.props.match.params.taskId, config)).data;
    const solutions = (await axios.get('http://localhost:8081/solutions/'+this.props.match.params.taskId, config)).data;
    this.setState({
      task: task,
      solutions: solutions,
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

  render() {
    return (
      <Page
        className="ContestPage"
        title={'Задача ' + this.state.task.id + " - " + this.state.task.name}
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
		                  <td>{this.state.task.time}</td>
		                </tr>
		                <tr>
		                  <td>Памет</td>
		                  <td>{this.state.task.memory}</td>
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
        <SolutionsPage solutions={this.state.solutions} />
      </Row>

      </Page>
    );
  }
}
export default withRouter(TaskPage);
