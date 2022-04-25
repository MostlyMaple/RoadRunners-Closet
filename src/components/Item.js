import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Item({ item }) {
    return (
        <Card className="my-3 p-3 " style={{borderRadius: '20px', backgroundColor: '#00294f'}}>
            <Link to={`/product/${item.id}`}>
                <Card.Img src={item.image} />
            </Link>

            <Card.Body>
                <Link to={`/product/${item.id}`} style={{textDecoration: 'none'}}>
                    <Card.Title as="div">
                        <strong style={{color: '#F15A22', textDecoration: 'none'}}>{item.item_name}</strong>
                    </Card.Title>
                </Link>



                <Card.Text as="h3" style={{color: 'white'}}>
                    ${item.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Item