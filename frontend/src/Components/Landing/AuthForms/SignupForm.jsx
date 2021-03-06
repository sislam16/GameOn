import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, Form, HelpBlock, Button, Alert} from 'react-bootstrap';
import SportsSelectionOptions from '../../Home/SportsSelectionOptions'

export default class SignupForm extends Component {
  state = {
    username: "",
    password: "",
    fullname: "",
    email: "",
    confirmPass: "",
    zipcode: "",
    message: "",
    selectedSportsIds: []
  }

  componentDidMount() {
    this.props.setAuthMessage('');
  }

  handleTextInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleZipCodeChange = e => {
    const { zipcode } = this.state;
    const userZip = Number(e.target.value);
    if (!isNaN(userZip) && zipcode.length <= 5) {
      this.setState({
        zipcode: e.target.value
      });
    }
  };

  handleSportsSelection = clickedSportId => {
    let { selectedSportsIds } = this.state;
    console.log('called handleSportsSelection with:',typeof(clickedSportId), clickedSportId)

    //Find if we already have the clicked sport in our array
    //if so it means our user wants to de-select it, so remove it, else add it
    let sportIndex = selectedSportsIds.indexOf(clickedSportId)
    if(sportIndex >= 0) {
      //Removing ~ Deselecting
      selectedSportsIds.splice(sportIndex, 1)
    } else {
      //Adding
      selectedSportsIds.push(clickedSportId)
    }

    this.setState({
      selectedSportsIds: selectedSportsIds
    });
  };

  validateAndSubmit = (e) => {
    const { setAuthMessage } = this.props
    e.preventDefault()
    const {
      username,
      password,
      confirmPass,
      email,
      fullname,
      zipcode,
      selectedSportsIds
    } = this.state;

    if (!username || !email || !fullname || !zipcode) {
      return setAuthMessage("Please complete all fields.");
    }

    if (password.length < 5) {
      return setAuthMessage("Password length must be at least 5 characters.");
    }

    if (password!== confirmPass) {
      this.setState({
        password: "",
        confirmPass: "",
      });
      return setAuthMessage("Passwords do not match!");
    }

    if (!selectedSportsIds.length) {
      return setAuthMessage("Please select at least one sport.");
    }
    this.props.signupUser(this.state)
  };

  render() {
    const { email, fullname, username, password, confirmPass, zipcode, message, selectedSportsIds } = this.state;
    return (
      <div>
        <h1 className="form-title">Sign Up</h1>
          <Form horizontal onSubmit={this.validateAndSubmit}>
            <FormGroup controlId="email">
              <FormControl
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={this.handleTextInput}
              />
            </FormGroup>
            <FormGroup controlId='fullname'>
              <FormControl
                type="text"
                name="fullname"
                placeholder="Fullname"
                value={fullname}
                onChange={this.handleTextInput}
              />
            </FormGroup>
            <FormGroup controlId='username'>
              <FormControl
                type="input"
                placeholder="Username"
                name="username"
                value={username}
                onChange={this.handleTextInput}
              />
            </FormGroup>
            <FormGroup controlId='password'>
              <FormControl
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={this.handleTextInput}
              />
            </FormGroup>
            <FormGroup controlId='confirmPass'>
              <FormControl
                type="password"
                placeholder="Confirm Password"
                name="confirmPass"
                value={confirmPass}
                onChange={this.handleTextInput}
              />
            </FormGroup>
            <FormGroup controlId='zipcode'>
              <FormControl
                type="text"
                name="zipcode"
                placeholder="Zipcode"
                value={zipcode}
                onChange={this.handleZipCodeChange}
              />
            </FormGroup>
            <FormGroup>
              <HelpBlock>Pick the sports you would like to play.</HelpBlock>
              <SportsSelectionOptions
                handleSportsSelection={this.handleSportsSelection}
                selectedSportsIds={selectedSportsIds}
              />
            </FormGroup>
            <div className='form-footer'>
              { this.props.msg ? <Alert bsStyle='danger'>{this.props.msg}</Alert> : '' }
              <Button bsStyle='success' type="submit"> Sign Up </Button>
              <p>Already have an Account <Link to='/login'>Log In</Link></p>
           </div> 
          </Form>
      </div>
    )
  }
}
