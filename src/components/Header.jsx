import React, { Component } from 'react'
import {
    Box,
    Flex,
    HStack,
    Image,
  } from '@chakra-ui/react'
import logo from '../assets/icons/logo.png'
import stelara from '../assets/icons/stelara.gif'

export default class Header extends Component {
render() {
  return (
    <>
    <Box
      bg={'linear-gradient(90deg, rgb(185, 216, 219) 15%, rgb(0, 239, 146) 80%)'} 
      w='100%'
      >
        <Flex 
          h={16} 
          align={'center'}
          justify='center'
          >
            <HStack              
              alignItems={'center'}
              >
                <Image 
                  boxSize='56px' 
                  src={logo} 
                  alt='logo' 
                  m='1em'
                />
                <Image 
                  src={stelara}
                  h='16em'
                  alt='logo'
                />
            </HStack>
        </Flex>
    </Box>
  </>
  )
}
}