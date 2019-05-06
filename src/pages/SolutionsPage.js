import Page from 'components/Page';
import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table
} from 'reactstrap';

class SolutionsPage extends React.Component {

  constructor(props) {
    super();
    this.state = {
      solutions: props.solutions,
    }
  }

  componentWillReceiveProps({solutions}) {
    this.setState({
      solutions: solutions,
    })
  }

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
                {this.state.solutions.length > 0 && 
                this.state.solutions[this.props.taskId()-1].map(({id, time, details, points}, index) => (
                  <tr>
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

export default SolutionsPage;
