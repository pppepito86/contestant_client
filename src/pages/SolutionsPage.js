import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Table
} from 'reactstrap';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

class SolutionsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      solutions: [],
    }
  }

  async fetchTasks(taskId) {
    const accessToken = localStorage.getItem('token1');
    const config = {
      headers: { 
        'Authorization': 'Bearer ' + accessToken
      }
    }
    const solutions = (await axios.get('http://localhost:8081/solutions/' + taskId, config)).data;
    this.setState({
      solutions: solutions,
    });
  }

  async componentDidMount() {
    this.fetchTasks(this.props.match.params.taskId);
  }
  
  async componentDidUpdate(prevProps) {
    if (prevProps.match.params.taskId !== this.props.match.params.taskId) {
      this.fetchTasks(this.props.match.params.taskId);
    }
  }

  /*componentDidUpdate(prevProps) {
    alert(prevProps.match.params.taskId + " " + this.props.match.params.taskId);
    // Typical usage (don't forget to compare props):
    if (this.props.userID !== prevProps.userID) {
      this.fetchData(this.props.userID);
    }
  }*/

  render() {
    return (
        <Col>
          <Card className="mb-3">
            <CardHeader>Предадени решения</CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Час</th>
                    <th>Детайли</th>
                    <th>Точки</th>
                  </tr>
                </thead>
                <tbody>
                {this.state.solutions.map(({id, time, details, points}, index) => (
                  <tr key={index}>
                    <th scope="row">{id}</th>
                    <td>{time}</td>
                    <td>{details}</td>
                    <td>{points}</td>
                  </tr>
                ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
    );
  }
}

export default withRouter(SolutionsPage);
