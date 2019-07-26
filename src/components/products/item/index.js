import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
// передача линка - перебор!!!

export default function(props){
    let btn;
    let spinner;

    if(props.disabled){
        spinner = <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
        />
    }

    if(props.inCart){
        btn = <Button variant="danger"
                      onClick={props.onRemove}
                      disabled={props.disabled}>
            {spinner}
            {" "}
            Remove from cart
        </Button>
    }
    else{
        btn = <Button variant="success"
                      onClick={props.onAdd}
                      disabled={props.disabled}
        >
            {spinner}
            {" "}
            Add to cart
        </Button>
    }

    return (
        <div>
            <h1>{props.title}</h1>
            <hr/>
            <div>
                <strong>Price: {props.price}</strong> 
            </div>
            <props.linkComponent to={props.backUrl}>Back to list</props.linkComponent>
            <p>Text about product</p>
            {btn}
        </div>
    );
}