import React, { Component } from "react";
import ProductCard from './components/ProductCard'
import { productsList } from "./data/products";
import { 
    Flex, 
    Box, 
    Input, 
    Text, 
    Select, 
    SimpleGrid, 
    Heading,
} from '@chakra-ui/react'
import Cart from "./components/Cart";
import Header from "./components/Header";
import Footer from './components/Footer'

export default class App extends Component {
    state = {
        query: '',
        minPrice: '',
        maxPrice: '',
        sortingParameter: 'price',
        order: 1,
        cart: [],
        totalValue: 0,
        productsList: productsList, 
    }

    handleQuery = (e) => this.setState({query: e.target.value})
    handleMinPrice = (e) => this.setState({minPrice: e.target.value})
    handleMaxPrice = (e) => this.setState({maxPrice: e.target.value})
    handleSortingParameter = (e) => this.setState({sortingParameter: e.target.value})
    handleOrder = (e) => this.setState({order: e.target.value})

    componentDidUpdate() {
    }

    componentDidMount() {
        let listCart = localStorage.getItem('list')
        const convertedCart = JSON.parse(listCart)
        convertedCart && this.setState({ cart: convertedCart})
    }

    addItemToCart = (clickedItem) => {
        const cartItem = this.state.cart.find((item) => clickedItem === item.id)

        if(cartItem) {
            const newCartItem = this.state.cart.map((item) => {
                if(clickedItem === item.id) {
                    return {...item, quantity: item.quantity + 1}
                }
                return item
            })
            this.setState({cart: newCartItem})
            console.log(newCartItem);
            localStorage.setItem('list', JSON.stringify(newCartItem))
        } else {
            const addedItem = this.state.productsList.find((item) => clickedItem === item.id)

            const newCartItem = [...this.state.cart, {...addedItem, quantity: 1}]
            console.log(newCartItem);
            this.setState({cart: newCartItem})
            localStorage.setItem('list', JSON.stringify(newCartItem))
        }
    }

    removeItemFromCart = (clickedItem) => {
        const newProducts = this.state.cart.map((item) => {
            if(item.id === clickedItem) {
                return { ...item, quantity: item.quantity - 1, }
            }
            return item 
        })
        .filter((item) => item.quantity > 0)
        this.setState({cart: newProducts})
        localStorage.setItem('list', JSON.stringify(newProducts))
    }

    totalValue = () => {
        let totalValue = 0

        for (let product of this.state.cart) {
        totalValue += product.price * product.quantity
       }
       return totalValue
    }

    render() {
        return(
            <Box bg='whitesmoke'>
                <Header 
                  cart={this.state.cart}
                />
                <Flex justify='center' p='1em' >
                    <Box w={['full', '35vw']}>
                        <Input
                          type='text' 
                          placeholder='Pesquisar...'
                          value={this.state.query}
                          onChange={this.handleQuery}
                          bg={'white'}
                        />
                    </Box>
                </Flex>
                <Flex justify='center' paddingRight={'10px'} paddingLeft={'10px'}  >
                    <Box>
                        <Text>Preço Mínimo:</Text>
                        <Input 
                          type={'number'}
                          min='0'
                          max='1000'
                          name={'minimo'}
                          placeholder='R$ 50,00'
                          value={this.state.minPrice}
                          onChange={this.handleMinPrice}
                          bg={'white'}
                        />
                    </Box>
                    <Box>
                        <Text>Preço Máximo:</Text>
                        <Input 
                          type='number'
                          min='0'
                          max='1000'
                          name={'maximo'}
                          placeholder='R$ 1.000,00'
                          value={this.state.maxPrice}
                          onChange={this.handleMaxPrice}
                          bg={'white'}
                        />
                    </Box>
                </Flex>
                <Flex 
                  p='1em'
                  justify='center' 
                  align={'baseline'}
                  >
                    <Box>
                        <Select
                          placeholder='Oredenar por:'
                          value={this.state.sortingParameter}
                          onChange={this.handleSortingParameter}
                          bg={'white'}
                          >
                            <option value={'price'}>Preço</option>
                        </Select>
                    </Box>
                    <Box>
                        <Select
                          value={this.state.order}
                          onChange={this.handleOrder}
                          bg={'white'}
                          >
                            <option value={1}>Crescente</option>
                            <option value={-1}>Decrescente</option>
                        </Select>
                    </Box>
                  </Flex>

                <Heading bg='whitesmoke' size='lg' marginRight={'10px'} textAlign={'center'} p={'1em'}>
                  Todos os Produtos 
                   <span> |{productsList.length}| </span>
                </Heading>

                <Flex 
                  display={{ base: '', md: 'flex' }}
                  bg='whitesmoke'
                  >
                <Box
                  w={['full', '19%']}
                  border='1px' 
                  borderColor={'gray.200'}
                  margin={['', '1em']}
                  >
                    <Heading
                      size='md'
                      textAlign={'center'}
                      p='1em'
                      color='orange'
                      >
                      Carrinho:
                    </Heading>
                    <Cart 
                      cart={this.state.cart}
                      removeItemFromCart={this.removeItemFromCart}
                    />
                    <Heading
                      borderTop='2px'
                      borderColor='black'
                      borderTopStyle={"dotted"}
                      as='h3'
                      size='md'
                      textAlign={'center'}
                      marginTop='1em'
                      >
                      Valor Total: <Text color='orange'>R${this.totalValue()},00</Text>
                    </Heading>
                </Box>
                
                <SimpleGrid 
                  templateColumns={['repeat(1, 1fr)', 'repeat(3, 1fr)']} //responsivity
                  size='lg' 
                  align='center' 
                  pos="absolute" 
                  right={['5', '0']}
                  spacing='40px' 
                  w='80%'  
                  p='1em'
                  >
                    {
                        productsList
                        .filter((product) => {
                          return product.title.toLowerCase().includes(this.state.query.toLowerCase()) 
                          || product.description.toLowerCase().includes(this.state.query.toLowerCase())
                        })
                        .filter((product) => {
                          return this.state.minPrice === '' || product.price >= this.state.minPrice 
                        })
                        .filter((product) => {
                          return this.state.maxPrice === '' || product.price <= this.state.maxPrice
                        })
                        .sort((currentProduct, nextProduct) => {
                          if(this.state.sortingParameter) {
                              return this.state.order * (currentProduct.price - nextProduct.price)
                          }
                        })
                        .map((product) => {
                           return(
                            <ProductCard 
                                key={product.id} 
                                product={product}
                                addItemToCart={() => this.addItemToCart(product.id)}
                            />
                          )
                        })
                        }
                </SimpleGrid>            
                </Flex>
                <Footer /> 
            </Box>
        )
    }
}