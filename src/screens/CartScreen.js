import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  addToCart,
  removeFromCart,
  saveDiscountCode,
} from "../actions/cartActions";
import { applyDiscount } from "../actions/discountActions";

function CartScreen({ match, location, history }) {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  const [discountName, setDiscountName] = useState("");

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const discountApply = useSelector((state) => state.discountApply);
  const { loading, error, success, discount } = discountApply;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty, discountApply]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const submitDiscount = (e) => {
    e.preventDefault();
    if (discountName !== "") {
      dispatch(applyDiscount(discountName));
    }
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <div className="cart">
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty! <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item.image}
                        alt={item.item_name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>
                        <h5>
                          {item.name}
                        </h5>
                      </Link>
                    </Col>
                    <Col md={2}>
                      <h3>${item.price}</h3>
                    </Col>
                    <Col md="3">
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.stock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={1}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush" className="info">
              <ListGroup.Item>
                <h2>
                  ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                </h2>
                <Row>
                  <Col md={6}>
                      <h2>Subtotal:</h2>
                  </Col>
                  <Col md={6}>
                      <h2>${cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}</h2>
                  </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <h2>
                            Tax:
                        </h2>
                    </Col>
                    <Col md={6}>
                        <h2>
                            ${cartItems
                            .reduce(
                              (acc, item) => acc + item.qty * item.price * 0.0825,
                              0
                            )
                            .toFixed(2)}
                        </h2>
                    </Col>              
                
                </Row>
                <Row>
                  <Col>
                      <h2>
                        Total:
                      </h2>
                  </Col>
                  <Col>
                  {success ? (
                  <h2>
                    ${cartItems
                      .reduce(
                        (acc, item) =>
                          acc +
                          item.qty * item.price * 0.0825 +
                          item.qty * item.price,
                        0
                      )
                      .toFixed(2)}{" "}
                    - $
                    {(
                      cartItems.reduce(
                        (acc, item) =>
                          acc +
                          item.qty * item.price,
                        0
                      ) * Number(discount.discount)
                    ).toFixed(2)}
                    {" "}
                    = ${(
                      cartItems.reduce(
                        (acc, item) =>
                          acc +
                          item.qty * item.price * 0.0825 +
                          item.qty * item.price,
                        0
                      ) -
                      cartItems.reduce(
                        (acc, item) =>
                          acc +
                          item.qty * item.price,
                        0
                      ) *
                        Number(discount.discount)
                    ).toFixed(2)}
                  </h2>
                ) : (
                  <h2>
                    ${cartItems
                      .reduce(
                        (acc, item) =>
                          acc +
                          item.qty * item.price * 0.0825 +
                          item.qty * item.price,
                        0
                      )
                      .toFixed(2)}
                  </h2>
                )}
                  </Col>
                </Row>
                
                {success ? (
                  <h2>
                    Discount Code: {discount.name} = %
                    {Number(100) * Number(discount.discount)}
                  </h2>
                ) : !discount ? (
                  <h2>Discount Code: {discount}</h2>
                ) : (
                  <h2>Discount Code:</h2>
                )}
              </ListGroup.Item>
              <ListGroup.Item className="info">
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitDiscount}>
                  <Form.Group controlId="name">
                    <Form.Control
                      type="name"
                      placeholder="Enter Discount Code"
                      value={discountName}
                      onChange={(e) => setDiscountName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="primary"
                    onClick={submitDiscount}
                    className="myBtn"
                  >
                    Submit Discount
                  </Button>
                </Form>
              </ListGroup.Item>
              <ListGroup.Item className="info">
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CartScreen;
