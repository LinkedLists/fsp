import React from 'react';

class SessionForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      errors: {}
      // profile_img: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this)
    this.demoAttempt = false;
    // this.handlePhotoFile = this.handlePhotoFile.bind(this);
  }

  
  // handlePhotoFile(e) {
  //   const file = e.target.files[0];
  //   const fileReader = new FileReader();
  //   fileReader.onloadend = () => {
  //     this.setState({profile_img: file})
  //   }

  //   if (file) {
  //     fileReader.readAsDataURL(file);
  //   }
  // }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  // The following is a list of renderable errors:
  // "Invalid credentials. Please try again!"
  // "Username has already been taken"
  // "Password is too short (minimum is 6 characters)"

  handleSubmit(e) {
    // const user = new FormData();
    // user.append("user[username]", this.state.username)
    // user.append("user[password]", this.state.password)
    // if (this.state.profile_img) user.append("user[profile_img]", this.state.profile_img)
    e.preventDefault();
    this.demoAttempt ? 
      this.handleModalClose() : 
      this.props.action(this.state)
  }
  
  handleModalClose() {
    let modalBackground = document.getElementsByClassName("modal-background-close")[0]
    let modalChild = document.getElementsByClassName("modal-child-close")[0]
    modalBackground.classList.remove("modal-background-close")
    modalBackground.classList.add("modal-background-open")
    modalChild.classList.remove("modal-child-close")
    modalChild.classList.add("modal-child-open")
    setTimeout(() => {
      modalChild.style.display = "none"
      modalBackground.style.display = "none"
      this.props.login(this.state)
      this.props.closeModal()
    }, 590)
  }

  handleChange(field) {
    return e => this.setState( {[field]: e.target.value} )
  }

  demoLogin() {
    const demoAccount = {
      username: 'Demo User',
      password: 'secretpasswordlol'
    }
    this.state = demoAccount;
    this.demoAttempt = true;
  }

  handleEnter(e) {
    if (e.key == "Enter") {
      e.preventDefault();
    } else {
      this.demoLogin()
      document.getElementsByClassName("modal-form-submit-button")[0].click();
    }
  }

  render() {
    const errors = {}
    this.props.errors.forEach( (error) => {
        errors[error.split(" ")[0]] = error
    })
    return (
      <form className="modal-form" onSubmit={this.handleSubmit} >
        <button type='button' 
          className="demo-user-login-button" 
          onClick={this.handleEnter} 
          onKeyPress={this.handleEnter}>Try as a demo user!</button>
        <br />
        <div className="auth-separator">
          or
        </div>
        <br />
        <div>
          <div onClick={this.props.closeModal} className="close-x">X</div>
          <input type='text' 
            className={Object.keys(errors).length ? "input-error" : "no-error"} 
            onChange={this.handleChange('username')} 
            placeholder="Your username" 
            value={this.state.username} />
          {errors['Username'] ? <div className="credential-errors-ul">{errors['Username']}</div> : null}
        </div>
        <div>
          <input type='password' 
            className={Object.keys(errors).length ? "input-error" : "no-error"} 
            onChange={this.handleChange('password')} 
            placeholder="Your password" 
            value={this.state.password} />
          {errors['Password'] ? <div className="credential-errors-ul">{errors['Password']}</div> : null}
          {errors['Invalid'] ? <div className="credential-errors-ul">{errors['Invalid']}</div> : null}
        </div>
        {/* users can create a profile w/picture if needed later */}
        {/* <input type="file"  onChange={this.handlePhotoFile}/> */}
        <button className="modal-form-submit-button" type='submit'>{this.props.formType}</button>
        <span className="session-form-footer">
          {
            this.props.formType === "Login" ? 
              <p>Don't already have an account? {this.props.otherForm} instead</p>:
              <p>Already have an account? {this.props.otherForm} instead</p>
          }
        </span>
      </form>
    )
  }
}

export default SessionForm