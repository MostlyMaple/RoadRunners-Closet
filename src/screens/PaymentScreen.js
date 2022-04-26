import React from "react";
import { useEffect, useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <div className="payment">
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend" className="formL">
              Select Payment Method
            </Form.Label>
            <Col>
              <Form.Check 
                type="radio"
                label="Paypal or CreditCard"
                id="paypal"
                name="paymentMethod"
                className="label"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{display: 'flex', justifyContent: 'center'}}
              ></Form.Check>
            </Col>
          </Form.Group>

          <Button type="submit" variant="primary" className="myBtn">
            Continue
          </Button>
        </Form>
      </div>
    </FormContainer>
  );
}
export default PaymentScreen;
