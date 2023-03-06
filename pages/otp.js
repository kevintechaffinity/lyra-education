import React, { useEffect, useRef, useState } from 'react';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { oneTimePassword } from '../services/User';

export default function Otp({ login }) {
  const [otp, setOtp] = useState('');
  const [flash, setFlash] = useState(undefined);
  const formRef = useRef(null);

  useEffect(() => {
    window.document.body.classList.add('login');
    window.scrollTo(0, 0);

    return () => {
      window.document.body.classList.remove('login');
    };
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    setOtp(value);
  };

  const handleSubmit = async () => {
    const valid = formRef.current.reportValidity();

    if (!valid) return;

    try {
      setFlash(undefined);

      const { status, token } = await oneTimePassword({
        msisdn: getCookie('sanitizedMsisdn'),
        otp,
      });

      if (status !== 200) {
        setFlash('Login failed, please try again');
        return;
      }

      login(token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={(event) => event.preventDefault()}
      className={flash ? 'error' : ''}
    >
      <svg className="svg__filler" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 429.453 429.453">
        <circle cx="214.727" cy="214.727" r="199.053" className="fill-primary" fill="#4dcfe0" />
        <g fill="#363F3D">
          <path d="M214.727 429.453C96.131 429.453 0 333.322 0 214.727S96.131 0 214.727 0s214.727 96.131 214.727 214.727-96.132 214.726-214.727 214.726zm0-398.106c-101.355 0-183.38 82.024-183.38 183.38s82.024 183.38 183.38 183.38 183.38-82.024 183.38-183.38-82.025-183.38-183.38-183.38z" />
          <path d="M287.869 246.073h-83.592c-8.882 0-15.673-6.792-15.673-15.673V120.686c0-8.882 6.792-15.673 15.673-15.673s15.673 6.792 15.673 15.673v94.041h67.918c8.882 0 15.673 6.792 15.673 15.673s-6.79 15.673-15.672 15.673z" />
        </g>
      </svg>
      <h1>Enter your OTP</h1>
      <p>Please enter the OTP sent to your cellphone.</p>
      {flash && <div className="flash">{flash}</div>}
      <input
        type="text"
        name="otp"
        pattern="[0-9]*"
        placeholder="Enter OTP"
        inputMode="numeric"
        autoComplete="off"
        aria-label="Enter OTP"
        maxLength="4"
        value={otp}
        onChange={handleChange}
        required
      />
      <input type="submit" value="Login" onClick={handleSubmit} />
      <Link href="/login">Resend OTP</Link>
    </form>
  );
}

Otp.propTypes = {
  login: PropTypes.func.isRequired,
};
