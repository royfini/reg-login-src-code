import { Component, h, Listen, Prop, Event, EventEmitter, State } from '@stencil/core/internal';

@Component({
  tag: 'rf-register',
  styleUrl: './register.css',
  shadow: true,
})
export class Register {
  @Prop({ reflect: true, mutable: true }) hide: boolean;
  @Event({ bubbles: true, composed: true }) rfEmitter: EventEmitter<boolean>;

  componentWillLoad() {
    this.hide = true;
  }

  swapping() {
    this.hide = true;
    this.rfEmitter.emit();
  }

  @Listen('rfEmit', { target: 'body' })
  swap() {
    this.hide = false;
  }

  emailInputElement: HTMLInputElement;
  passwordInputElement: HTMLInputElement;
  firstnameInputElement: HTMLInputElement;
  lastnameInputElement: HTMLInputElement;
  @State() emailInputBind: string;
  @State() passwordInputBind: string;
  @State() firstnameInputBind: string;
  @State() lastnameInputBind: string;
  @State() isEmailValid = 'blank';
  @State() isPasswordValid = 'blank';
  @State() isFisrtnameValid = false;
  @State() isLastnameValid = false;
  @State() isRegisterSuccess = false;
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
      this.isPasswordValid = 'blank';
    } else if (value.length < 8) {
      this.isPasswordValid = 'notPass';
    } else {
      this.isPasswordValid = 'valid';
    }
  }

  firstnameInputChange(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    console.log(value);
    if (value == '') {
      this.isFisrtnameValid = false;
    } else {
      this.isFisrtnameValid = true;
    }
  }

  lastnameInputChange(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    console.log(value);
    if (value == '') {
      this.isLastnameValid = false;
    } else {
      this.isLastnameValid = true;
    }
  }

  onSubmitForm(event: Event) {
    event.preventDefault();
    this.isRegisterSuccess = true;
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
    if (this.isPasswordValid == 'blank') {
      passwordError = <span class="error">Password can't be blank</span>;
    }
    if (this.isPasswordValid == 'notPass') {
      passwordError = <span class="error">Password must be at least 8 char</span>;
    }

    let firstnameError = null;
    if (!this.isFisrtnameValid) {
      firstnameError = <span class="error">First name can't be blank</span>;
    }

    let lastnameError = null;
    if (!this.isLastnameValid) {
      lastnameError = <span class="error">Last name can't be blank</span>;
    }

    let message = null;
    if (this.isRegisterSuccess) {
      message = <div class="msg-s">Register successful</div>;
    }

    return (
      <div class="container">
        <form class="form" onSubmit={this.onSubmitForm.bind(this)}>
          <h2>Sign Up</h2>
          <div class="card-name">
            <div class="card">
              <input
                type="text"
                class="box box-name f-name"
                placeholder="First name"
                ref={el => (this.firstnameInputElement = el)}
                value={this.firstnameInputBind}
                onInput={this.firstnameInputChange.bind(this)}
              ></input>
              {firstnameError}
            </div>
            <div class="card">
              <input
                type="text"
                class="box box-name l-name"
                placeholder="Last name"
                ref={el => (this.lastnameInputElement = el)}
                value={this.lastnameInputBind}
                onInput={this.lastnameInputChange.bind(this)}
              ></input>
              {lastnameError}
            </div>
          </div>
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
          <button
            type="submit"
            value="SIGN UP"
            id="submit"
            disabled={
              this.isEmailValid == 'blank' ||
              this.isEmailValid == 'notEmail' ||
              this.isPasswordValid == 'blank' ||
              this.isPasswordValid == 'notPass' ||
              !this.isFisrtnameValid ||
              !this.isLastnameValid
            }
          >
            SIGN UP
          </button>
        </form>
        <span class="footer">
          Already have an account?
          <a href="#" onClick={this.swapping.bind(this)}>
            log in
          </a>
        </span>
      </div>
    );
  }
}
