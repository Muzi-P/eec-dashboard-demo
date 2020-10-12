import React, { Component } from 'react';
import { InflowsContext } from "../components/Context/context"
import { withRouter } from "react-router-dom";
import Cookies from 'js-cookie'

class LogIn extends Component {
  static contextType = InflowsContext
  constructor(props) {
    super(props)
    this.state= {
      email: '',
      password: '',
      name: '',
      greeting: ''
    }
  }
  componentDidMount = () => {
    const today = new Date()
    const curHr = today.getHours()
    let greeting = ''
    if (curHr < 12) {
      greeting = 'Good Morning!'
    } else if (curHr < 18) {
      greeting = 'Good Afternoon!'
    } else {
      greeting = 'Good Evening!'
    }
    this.setState({greeting})
  }
  handleSignUp = (e) => {
    e.preventDefault()
    this.container.classList.add('right-panel-active')
  }
  signIn = (e) => {
    e.preventDefault()
    this.context.signIn(this.state)
  }
  signUp = (e) => {
    e.preventDefault()
    this.context.signUp(this.state)
  }
  componentDidUpdate() {
    if (this.context.isAuthenticated) {
      this.props.history.push("/admin/dashboard")
    }
    this.checkStatus()
  }
  handleInputChange = (e) => {
    this.setState({
      [e.target.id] : e.target.value
    })
  }
  checkStatus = () => {
    const loggedIn = Cookies.get('loggeIn')
    if (loggedIn) this.context.keepLoggedIn()
  }
  handleSignIn = (e) => {
    e.preventDefault()
    this.container.classList.remove('right-panel-active')
  }
  render() {
    return (
      <div className="login-body">
        <div className="container" id="container" ref={ref => this.container = ref}>
            <div className="form-container sign-up-container">
              <form action="/#">
                <h1>Create Account</h1>
                <div className="social-container">
                  <a  href="/#" className="social"><i className="fab fa-facebook-f"></i></a>
                  <a href="/#" className="social"><i className="fab fa-google-plus-g"></i></a>
                  <a href="/#" className="social"><i className="fab fa-linkedin-in"></i></a>
                </div>
                <span>or use your email for registration</span>
                <input type="text" placeholder="Name" id="name" onChange={this.handleInputChange}/>
                <input type="email" placeholder="Email" id="email" onChange={this.handleInputChange}/>
                <input type="password" placeholder="Password" id="password" onChange={this.handleInputChange} autocomplete="off"/>
                <button onClick={this.signUp}>Sign Up</button>
              </form>
            </div>
            <div className="form-container sign-in-container">
              <form action="/#">
                <h1>Sign in</h1>
                <div className="social-container">
                  <a href="/#" className="social"><i className="fab fa-facebook-f"></i></a>
                  <a href="/#" className="social"><i className="fab fa-google-plus-g"></i></a>
                  <a href="/#" className="social"><i className="fab fa-linkedin-in"></i></a>
                </div>
                <span>or use your account</span>
                <input type="email" placeholder="Email" id="email" onChange={this.handleInputChange}/>
                <input type="password" placeholder="Password" id="password" onChange={this.handleInputChange} />
                <a href="/#">Forgot your password?</a>
                <button onClick={this.signIn} >Sign In</button>
              </form>
            </div>
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1>Welcome Back!</h1>
                  <p>To keep connected with us please login with your personal info</p>
                  <button className="ghost" id="signIn" onClick = {this.handleSignIn}>Sign In</button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1>{this.state.greeting}</h1>
                  <p>Enter your personal details and start your journey with us</p>
                  <button className="ghost" id="signUp" onClick = {this.handleSignUp}>Sign Up</button>
                </div>
              </div>
          </div>
        </div>
      </div>
     
    );
  }
}

export default withRouter(LogIn);