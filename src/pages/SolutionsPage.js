import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Table
} from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';

class SolutionsPage extends React.Component {

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
                {this.props.solutions.map(({id, time, details, points}, index) => (
                  <tr key={index}>
                    <th scope="row">
                      <Link to={'/task/'+this.props.taskId+'/solution/'+id} activeClassName="active">{id}</Link>
                    </th>
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
