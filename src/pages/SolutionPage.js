import Page from 'components/Page';
import React from 'react';
import {
  Card,
  CardBody,
  Col,
  Row,
  Table
} from 'reactstrap';

class SolutionPage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
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
                    <th scope="row">23.04.19 12:01:49	</th>
                    <td>Z</td>
                    <td>cookies</td>
                    <td>?</td>
                    <td>WA,WA,WA,WA,WA,?,?,?,?,?	</td>
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
                  <tr>
                    <th scope="row">Тест 1</th>
                    <td>WA</td>
                    <td>0.0</td>
                  </tr>
                  <tr>
                    <th scope="row">Тест 2</th>
                    <td>WA</td>
                    <td>0.0</td>
                  </tr>
                  <tr>
                    <th scope="row">Тест 3</th>
                    <td>HIDDEN</td>
                    <td>0.0</td>
                  </tr>
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
export default SolutionPage;
