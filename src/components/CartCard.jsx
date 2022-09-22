import React, { Component } from "react";
import { 
    Button, 
    Flex,
    Text,
  } from "@chakra-ui/react"

export default class CartCard extends Component {
    render() {
        return(
            <Flex
              jusitfy='space-between'
              alignItems={'center'}
              textAlign='center'
              >
                <Text>{this.props.quantity}x</Text>
                <Text>{this.props.title}</Text>
                <Text>R${this.props.price},00</Text>
                <Button
                  onClick={() => this.props.removeItemFromCart(this.props.id)}
                  >
                    <span role="img" aria-label="trash">🗑️</span>
                </Button>
            </Flex>
        )
    }
}


