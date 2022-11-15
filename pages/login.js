import React, { Component } from 'react';
import cookie from 'js-cookie';
import Link from 'next/link';
import Router from 'next/router';

import { login } from '../services/http/User';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { msisdn: '', flash: undefined };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.form = React.createRef();
  }

  componentDidMount() {
    window.document.body.classList.add('login');
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    window.document.body.classList.remove('login');
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async handleSubmit() {
    const valid = this.form.current.reportValidity();
    if (!valid) {
      return;
    }

    const { msisdn } = this.state;

    try {
      this.setState({ flash: undefined });
      const sanitizedMsisdn = msisdn.replace(/\s+/g, '').replace(/^0/, '27');

      const { status } = await login({ msisdn: sanitizedMsisdn });

      if (status !== 201) {
        this.setState({ flash: 'An error occurred while sending your OTP. Please try again.' });
        return;
      }

      cookie.set('sanitizedMsisdn', sanitizedMsisdn, { expires: 1 });
      Router.push('/otp');
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { flash, msisdn } = this.state;

    return (
      <form ref={this.form} onSubmit={(e) => e.preventDefault()} className={flash ? 'error' : ''}>
        <svg
          className="svg__filler"
          viewBox="0 0 480.653 480.653"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M107.344 76.8h265.927v302.498H107.344z" fill="#d4e1f4" />
          <path
            d="M373.27 47.02V76.8H107.344V47.02c0-17.241 14.106-31.347 31.347-31.347h203.233c17.24 0 31.346 14.107 31.346 31.347zM373.27 433.633c.522 17.241-13.584 31.347-30.824 31.347H138.691c-17.241 0-31.347-14.106-31.347-31.347v-54.335H373.27z"
            className="fill-primary"
            fill="#4dcfe0"
          />
          <g fill="#363F3D">
            <path d="M341.923 0H138.691c-26.122 0-47.02 20.898-47.02 47.02v386.612c0 26.122 20.898 47.02 47.02 47.02h203.755c12.539 0 24.555-5.224 33.437-14.106s13.584-20.898 13.061-32.914V47.02c0-26.122-20.898-47.02-47.021-47.02zm15.674 363.624h-234.58V92.473h234.58zM138.691 31.347h203.233c8.882 0 15.673 6.792 15.673 15.673v14.106h-234.58V47.02c0-8.881 6.792-15.673 15.674-15.673zm214.726 413.257c-3.135 3.135-6.792 4.702-10.971 4.702H138.691c-8.882 0-15.673-6.792-15.673-15.673v-38.661h234.58v39.184c-.001 3.656-1.569 7.836-4.181 10.448z" />
            <path d="M253.629 437.29h-26.122c-8.882 0-15.673-6.792-15.673-15.673s6.792-15.673 15.673-15.673h26.122c8.882 0 15.673 6.792 15.673 15.673s-6.791 15.673-15.673 15.673z" />
          </g>
        </svg>
        <h1>Please Log in</h1>
        <p>
          Enter your <b>cellphone number</b> below or switch to your mobile network.
        </p>
        {flash ? <div className="flash">{flash}</div> : ''}
        <input
          type="tel"
          pattern="(?:^[0-9\s]{1,9}?$|(?:0|\+27|27)\d{2}[\s-]?\d{3}[\s-]?\d{4})"
          placeholder="Cellphone number"
          autoComplete="off"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus="autofocus"
          aria-label="Enter your cellphone number"
          inputMode="numeric"
          title="Please enter valid cellphone number. e.g. 083 xxx xxxx"
          name="msisdn"
          value={msisdn}
          required
          onChange={this.handleChange}
        />
        <input type="submit" value="Continue" onClick={this.handleSubmit} />
        <Link href="/">
          <a>Cancel</a>
        </Link>
      </form>
    );
  }
}
