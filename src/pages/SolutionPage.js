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
    }
    this.fetchSolutionDetails = this.fetchSolutionDetails.bind(this);
  }

  async fetchSolutionDetails() {
    const accessToken = localStorage.getItem('token1');
    const config = {
      headers: { 
        'Authorization': 'Bearer ' + accessToken
      }
    }
    const taskId = this.props.match.params.taskId;
    const solutionId = this.props.match.params.solutionId;
    const path = '/task/'+taskId+'/solution/'+solutionId;
    const solution = (await axios.get(path, config)).data;
    this.setState({
      solution: solution,
    });
    if (solution.details==='waiting' || solution.details==='judging') {
      setTimeout(this.fetchSolutionDetails, 1000);
    }
  }

  async componentDidMount() {
    this.fetchSolutionDetails();
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
                    <th>Час</th>
                    <th>Група</th>
                    <th>Задача</th>
                    <th>Точки</th>
                    <th>Статус</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">{this.state.solution.time}</th>
                    <td>{this.state.solution.group}</td>
                    <td>{this.state.solution.taskName}</td>
                    <td>{this.state.solution.points}</td>
                    <td>{this.state.solution.details}</td>
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
                  {this.state.solution.steps && this.state.solution.steps.map(({step, verdict, time}, index) => (
                  <tr key={index}>
                    <th scope="row">{step}</th>
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
