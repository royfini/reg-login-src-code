import { Component, h, Prop, Event, EventEmitter, Listen, State } from '@stencil/core/internal';

@Component({
  tag: 'rf-login',
  styleUrl: './login.css',
  shadow: true,
})
export class Login {
  @Prop({ reflect: true, mutable: true }) hide: boolean;
  @Event({ bubbles: true, composed: true }) rfEmit: EventEmitter<boolean>;

  componentWillLoad() {
    this.hide = false;
  }

  swapping() {
    this.hide = true;
    this.rfEmit.emit();
  }

  @Listen('rfEmitter', { target: 'body' })
  swap() {
    this.hide = false;
  }

  emailInputElement: HTMLInputElement;
  passwordInputElement: HTMLInputElement;
  @State() emailInputBind: string;
  @State() passwordInputBind: string;
  @State() isEmailValid = 'blank';
  @State() isPasswordValid = false;
  @State() isLoginSuccess = '';
  emailInputChange(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    console.log(value);
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let emailValid = emailPattern.test(value);
    if (value == '') {
      this.isEmailValid = 'blank';
    } else if (!emailValid) {
      this.isEmailValid = 'notEmail';
    } else {
      this.isEmailValid = 'valid';
    }
  }

  passwordInputChange(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    console.log(value);
    if (value == '') {
      this.isPasswordValid = false;
    } else {
      this.isPasswordValid = true;
    }
  }

  onSubmitForm(event: Event) {
    event.preventDefault();
    let email = this.emailInputElement.value;
    let password = this.passwordInputElement.value;

    console.log(email);
    console.log(password);
    if (email == 'stencil@live.com' && password == 'stencil123') {
      this.isLoginSuccess = 'success';
    } else {
      this.isLoginSuccess = 'fail';
    }
  }

  render() {
    let emailError = null;
    if (this.isEmailValid == 'blank') {
      emailError = <span class="error">Email can't be blank</span>;
    }
    if (this.isEmailValid == 'notEmail') {
      emailError = <span class="error">Email not valid</span>;
    }
    let passwordError = null;
    if (!this.isPasswordValid) {
      passwordError = <span class="error">Password can't be blank</span>;
    }

    let message = null;
    if (this.isLoginSuccess == 'success') {
      message = <div class="msg-s">Login successful</div>;
    }
    if (this.isLoginSuccess == 'fail') {
      message = <div class="msg-i">Email or Password incorrect</div>;
    }
    return (
      <div class="container">
        <form class="form" onSubmit={this.onSubmitForm.bind(this)}>
          <h2>Log In</h2>
          <div class="card">
            <input
              type="email"
              name="email"
              class="box"
              placeholder="Enter Email"
              ref={el => (this.emailInputElement = el)}
              value={this.emailInputBind}
              onInput={this.emailInputChange.bind(this)}
            ></input>
            {emailError}
          </div>
          <div class="card">
            <input
              type="password"
              name="password"
              class="box"
              placeholder="Enter password"
              ref={el => (this.passwordInputElement = el)}
              value={this.passwordInputBind}
              onInput={this.passwordInputChange.bind(this)}
            ></input>
            {passwordError}
          </div>
          {message}
          <button type="submit" id="submit" disabled={this.isEmailValid == 'blank' || this.isEmailValid == 'notEmail' || !this.isPasswordValid}>LOG IN</button>
          <a href="#">Forget Password</a>
        </form>
        <span class="footer">
          Don't have an account yet ?{' '}
          <a href="#" onClick={this.swapping.bind(this)}>
            create one
          </a>
        </span>
      </div>
    );
  }
}
