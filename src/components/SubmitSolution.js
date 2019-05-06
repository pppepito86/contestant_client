import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap';

class SubmitSolution extends Component {
  constructor(props) {
    super(props);
    this.state = {showFile: true};
  }

  handleClick(value) {
    this.setState(state => ({
      showFile: value
    }));
  }

  render() {
    return (
      <Card>
      <CardHeader className="with-border">
        <div className="d-flex">
        <div className="mr-auto p-2">Предай решение</div>
        <div className="p-2"><Button onClick={()=>this.handleClick(true)}><small>Файл</small></Button></div>
        <div className="p-2"><Button onClick={()=>this.handleClick(false)}><small>Код</small></Button></div>
        </div>              
      </CardHeader>
      <CardBody>
      
      {this.state.showFile &&
      <Form>
        <FormGroup>
          <Label for="file">Файл</Label>
          <Input type="file" name="file" accept=".cpp,.c" />
        </FormGroup>
      </Form>
      }

      {!this.state.showFile &&
        <Form>
          <FormGroup>
            <Input type="textarea" name="text" placeholder="Поставете вашият код" maxlength="65536" />
          </FormGroup>
        </Form>
      }

      </CardBody>
      <CardFooter>
      <Button>Submit</Button>

      </CardFooter>
      </Card>
    );
  }
};

export default SubmitSolution;
