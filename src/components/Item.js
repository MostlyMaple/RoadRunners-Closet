import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Item({ item }) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${item.id}`}>
                <Card.Img src={item.image} />
            </Link>

            <Card.Body>
                <Link to={`/product/${item.id}`}>
                    <Card.Title as="div">
                        <strong>{item.item_name}</strong>
                    </Card.Title>
                </Link>



                <Card.Text as="h3">
                    ${item.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Item