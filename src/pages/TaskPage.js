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

class TaskPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      task: {
        number: null,
        name: null,
        time: null,
        memory: null,
      },
      solutions: [],
    }
  }

  async fetchTaskDetails() {
    const taskId = this.props.match.params.taskId;
    const task = (await axios.get('/tasks/'+taskId)).data;
    const solutions = (await axios.get('/tasks/'+taskId+'/solutions')).data;
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

  openPdfInNewTab(pdf) {
    let newWindow = window.open('/tasks/'+this.state.task.number+'/pdf');
    if (newWindow.document.readyState === 'complete') {
      newWindow.location = URL.createObjectURL(pdf);
    } else {
      newWindow.onload = () => {
        newWindow.location = URL.createObjectURL(pdf);
      };
    }
  }

  downloadPdf(pdf) {
    const pdfName = this.state.task.name+'.pdf';
    if (!window.navigator.msSaveOrOpenBlob){
      // BLOB NAVIGATOR
      const url = window.URL.createObjectURL(pdf);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', pdfName);
      //document.body.appendChild(link);
      link.click();
    } else {
      // BLOB FOR EXPLORER 11
      const url = window.navigator.msSaveOrOpenBlob(pdf, pdfName);
    }
  }

  async showPdf(e, open) {
    e.preventDefault();
    const data = (await axios.get("/tasks/"+this.state.task.number+"/pdf", {
      responseType: 'arraybuffer'
    })).data;
   
    if (open) this.openPdfInNewTab(new Blob([data],{type: 'application/pdf'}));
    else this.downloadPdf(new Blob([data],{type: 'application/pdf'}));
  }

  render() {
    return (
      <Page
        className="ContestPage"
        title={"Задача " + this.state.task.number + " - " + this.state.task.name}
      >

        <Row>
          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader className="with-border">
                Условие
              </CardHeader>
              <CardBody>
                <Link to={"/tasks/"+this.state.task.number+"/pdf"} onClick={(e)=>this.showPdf(e, true)} className="btn btn-info">Отвори</Link>
                <Link to={"/tasks/"+this.state.task.number+"/pdf"} onClick={(e)=>this.showPdf(e, false)} className="btn btn-info">Изтегли</Link>
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
        <TaskSolutions taskId={this.props.match.params.taskId} solutions={this.state.solutions} />
      </Row>

      </Page>
    );
  }
}

export default withRouter(TaskPage);
