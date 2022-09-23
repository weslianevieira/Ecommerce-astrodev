import React, { Component } from "react";
import {  
    Flex,
    Box
  } from "@chakra-ui/react"
  import { FaRegTrashAlt } from "react-icons/fa";

export default class CartCard extends Component {
    render() {
        return(
            <Flex
              justify='space-between'
              textAlign='center'
              border='1px' 
              borderColor='gray.300'
              width={'98%'}
              marginBottom='20px'
              boxShadow={'dark-lg'}
              bg={'white'}
              >
                <Box color='orange' fontWeight={700}>{this.props.quantity}x</Box>
                <Box>{this.props.title}</Box>
                <Box fontWeight={700} >R${this.props.price},00</Box>
                <Box>
                <button
                  onClick={() => this.props.removeItemFromCart(this.props.id)}
                  >
                    <FaRegTrashAlt/>
                </button>
                </Box>
            </Flex>
        )
    }
}


