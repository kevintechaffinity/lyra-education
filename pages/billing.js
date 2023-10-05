import axios from 'axios';
import React, { useState } from 'react';
import { choosePlan } from '../services/Payment';
import ReactHtmlParser from 'react-html-parser';

const Billing = () => {
  const [selectedBilling, setSelectedBilling] = useState(null);
  const [htmlContent, setHTMLContent] = useState('');

  const choosePlan = async (payload) => {
    const result = await axios.post('http://localhost:8081/v1/payment-initialize');
    setHTMLContent(result.data);
  };

  return (
    <div className="container mt-md-5">
      {ReactHtmlParser(htmlContent)}
      <div className="row">
        <div className="col-md-6 px-5">
          <h3>Select a Plan</h3>
          <h6>
            <small className="text-muted">Select one plan of the three to go with</small>
          </h6>
          <div className="my-5">
            <div className="my-3">
              <div className="d-flex align-items-center justify-content-between shadow p-3">
                <div>
                  <span className="p-0 m-0">
                    <small className="text-muted">Duration</small>
                  </span>
                  <h5 className="p-0 my-2">
                    <small>
                      1 Month -{' '}
                      <span>
                        <small className="font-weight-bold">$16</small>
                      </span>
                    </small>
                  </h5>
                </div>
                <div>
                  <button
                    onClick={() => choosePlan({ plan: '1 month', amount: 19, currency: 'USD' })}
                    className="btn btn-sm btn-outline-secondary rounded-pill"
                  >
                    <small>Get Started</small>
                  </button>
                </div>
              </div>
            </div>
            <div className="my-3">
              <div className="d-flex align-items-center justify-content-between shadow p-3">
                <div>
                  <span className="p-0 m-0">
                    <small className="text-muted">Duration</small>
                  </span>
                  <h5 className="p-0 my-2">
                    <small>
                      6 Months -{' '}
                      <span>
                        <small className="font-weight-bold">$68</small>
                      </span>
                    </small>
                  </h5>
                </div>
                <div>
                  <button className="btn btn-sm btn-outline-secondary rounded-pill">
                    <small>Get Started</small>
                  </button>
                </div>
              </div>
            </div>
            <div className="my-3">
              <div className="d-flex align-items-center justify-content-between shadow p-3">
                <div>
                  <span className="p-0 m-0">
                    <small className="text-muted">Duration</small>
                  </span>
                  <h5 className="p-0 my-2">
                    <small>
                      1 Year -{' '}
                      <span>
                        <small className="font-weight-bold">$168</small>
                      </span>
                    </small>
                  </h5>
                </div>
                <div>
                  <button className="btn btn-sm btn-outline-secondary rounded-pill">
                    <small>Get Started</small>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-5 p-5 bg-light">
          <h5 className="font-weight-bold">Payment</h5>
          <form className="my-4">
            <div class="form-group">
              <label for="exampleInputEmail1">
                <small>credit card number</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="XXXX - XXXX - XXXXX - XXXX"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">
                <small>name (as it appears on the card)</small>
              </label>
              <input type="text" className="form-control" placeholder="John Doe" />
            </div>
            <div className="row">
              <div className="col-md-5">
                <div class="form-group">
                  <label for="exampleInputEmail1">
                    <small>CVC</small>
                  </label>
                  <input type="number" className="form-control" placeholder="XXX" />
                </div>
              </div>
              <div className="col-md-7">
                <label>
                  <small>expiry date</small>
                </label>
                <div className="row">
                  <div className="col-md-6 px-2">
                    <input type="number" className="form-control" placeholder="mm" />
                  </div>
                  <div className="col-md-6 px-2">
                    <input type="number" className="form-control" placeholder="yy" />
                  </div>
                </div>
              </div>
            </div>
            <button className="btn btn-sm btn-outline-primary btn-block mt-4 py-2">
              Check out
            </button>
            <button className="btn btn-sm btn-primary btn-block mt-4 py-2">Pay with Paypal</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Billing;
