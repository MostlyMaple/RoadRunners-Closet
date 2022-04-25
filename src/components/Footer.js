import React from 'react'
import { Container } from 'react-bootstrap'
import "../RoadRunner_Closet.png"


function Footer() {
    return (
        <Container 
            style={{
                backgroundColor: '#F15A22', display: 'flex', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', flexDirection: 'column'
            }}
        >
            <h1 >RoadRunners Closet</h1>
            
        </Container>
    )
}

export default Footer