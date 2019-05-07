import Page from 'components/Page';
import React from 'react';
import {withRouter} from 'react-router-dom';
import {
  Card,
  CardBody,
  Col,
  Row,
  Table
} from 'reactstrap';
import axios from 'axios';

class SolutionPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      solution: {},
      timeout: null,
    }
    this.fetchSolutionDetails = this.fetchSolutionDetails.bind(this);
  }

  async fetchSolutionDetails() {
    const taskId = this.props.match.params.taskId;
    const solutionId = this.props.match.params.solutionId;
    const path = 'http://52.59.81.222:8081/tasks/'+taskId+'/solutions/'+solutionId;
    const solution = (await axios.get(path)).data;
    this.setState({
      solution: solution,
    });
    if (solution.verdict==='waiting' || solution.verdict==='judging') {
      this.setState({
        timeout: setTimeout(this.fetchSolutionDetails, 1000),
      });
    }
  }

  async componentDidMount() {
    this.fetchSolutionDetails();
  }

  async componentWillUnmount() {
    clearTimeout(this.state.timeout);
  }

  render() {
    return (
      <Page
        className="ContestPage"
        title="Решение"
      >

<Row>
        <Col>
          <Card className="mb-3">
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Час</th>
                    <th>Група</th>
                    <th>Задача</th>
                    <th>Точки</th>
                    <th>Статус</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">{this.state.solution.number}</th>
                    <td>{this.state.solution.upload_time}</td>
                    <td>{this.state.solution.contest}</td>
                    <td>{this.state.solution.name}</td>
                    <td>{this.state.solution.points}</td>
                    <td>{this.state.solution.verdict}</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>

            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Стъпка</th>
                    <th>Резултат</th>
                    <th>Време</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.solution.tests && this.state.solution.tests.map(({name, verdict, time}, index) => (
                  <tr key={index}>
                    <th scope="row">{name}</th>
                    <td>{verdict}</td>
                    <td>{time}</td>
                  </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>


          </Card>
        </Col>
      </Row>

      </Page>
    );
  }
}
export default withRouter(SolutionPage);
