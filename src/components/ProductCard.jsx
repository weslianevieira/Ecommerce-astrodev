import React, { Component } from "react";
import { 
    Box,  
    Image, 
    Flex, 
    Button, 
    Text,
    SimpleGrid
    } from '@chakra-ui/react'
    import { FaCartPlus } from 'react-icons/fa'

export default class ProductCard extends Component {
    render() {
        return(
            <>
                <Box
                  w='100%'
                  minHeight='60vh'
                  bg='#00EF92'
                  rounded={'xl'}
                  overflow='hidden'
                  boxShadow={'dark-lg'}
                  >
                    <Image 
                      w='100%' 
                      h={60} 
                      src={this.props.product.image} 
                      alt={this.props.product.title}
                    />
                    <Box w='100%' h='50%' p={2}>
                        <Text 
                          align='center' 
                          fontWeight={800} 
                          fontSize='lg' 
                          >
                            {this.props.product.title}
                        </Text>
                        <Flex 
                          m={1} 
                          align='center' 
                          minHeight={'4em'}
                          >
                            <Text
                              color='black' 
                              size='md' 
                              bg='none'
                              >
                                {this.props.product.description}
                            </Text>
                        </Flex>
                        <Flex justify='space-between'>
                            <Text fontSize={'1.5em'} color='blue' fontWeight={800}>
                            {this.props.product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL',})}
                            </Text>
                            <Button
                              bg='#00EF92' 
                              boxShadow={'dark-lg'} 
                              color='blue' 
                              mr='3' 
                              p={1} 
                              sixe='xl' 
                              onClick={() => this.props.addItemToCart(this.props.id)}
                              >
                                <Text 
                                  color={'blue'} 
                                  p={1} 
                                  fontWeight={600} 
                                  fontSize='lg'
                                  >
                                    Coloar no
                                </Text>
                                <FaCartPlus size='2em'/>
                            </Button>
                        </Flex>
                    </Box>
                </Box>
            </>
        )
    }
    
}

