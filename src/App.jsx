import React, { Component } from "react";
import CartCard from './components/CartCard'
import ProductCard from './components/ProductCard'
import { productsList } from "./data/products";
import { 
    Flex, 
    Box, 
    Input, 
    Text, 
    Select, 
    SimpleGrid, 
    Heading 
} from '@chakra-ui/react'

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
            <>
                <Flex justify='center'>
                    <Box w='52%'>
                        <Input
                          type='text' 
                          placeholder='Olá, o que você está procurando hoje?'
                          value={this.state.query}
                          onChange={this.handleQuery}
                        />
                    </Box>
                </Flex>
                <Flex justify='center'>
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
                        />
                    </Box>
                    <Box>
                        <Text>Preço Máximo:</Text>
                        <Input 
                          type='number'
                          min='0'
                          max='1000'
                          name={'maximo'}
                          placeholder='R$ 10.000,00'
                          value={this.state.maxPrice}
                          onChange={this.handleMaxPrice}
                        />
                    </Box>
                </Flex>
                <Flex 
                  justify='space-between' 
                  align={'baseline'}
                  >
                    <Box>
                        <Select
                          placeholder='Oredenar por:'
                          value={this.state.sortingParameter}
                          onChange={this.handleSortingParameter}
                          >
                            <option value={'price'}>Preço</option>
                        </Select>
                    </Box>
                    <Box>
                        <Text color='black'>Quantidade: {productsList.lenght}</Text>
                    </Box>
                    <Box>
                        <Select
                          value={this.state.order}
                          onChange={this.handleOrder}
                          >
                            <option value={1}>Crescente</option>
                            <option value={-1}>Decrescente</option>
                        </Select>
                    </Box>
                  </Flex>

                <Heading size='lg'>Todos os Produtos</Heading>
                <Flex>
                <SimpleGrid 
                  templateColumns={['repeat(1, 1fr)', 'repeat(3, 1fr)']} //responsivity
                  size='lg' 
                  align='center' 
                  spacing='40px' 
                  w='80%'  
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
                          switch (this.state.sortingParameter) {
                            case 'title':
                              return this.state.order * ( currentProduct.title.sort() - nextProduct.title.sort())
                            default:
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
                <Box
                  w='20%'
                  bg='whitesmoke'
                  >
                    <Heading
                      size='lg'
                      textAlign={'center'}
                      paddingBottom='1em'
                      >
                      Carrinho:
                    </Heading>
                    {
                        this.state.cart.map((item) => {
                          return (
                            <CartCard 
                              key={item.id}
                              id={item.id}
                              cart={this.state.cart}
                              removeItemFromCart={() => this.removeItemFromCart(item.id)}
                              title={item.title}
                              quantity={item.quantity}
                              price={item.price}
                            />
                            )
                        })
                    }
                    <Heading
                      as='h3'
                      size='md'
                      textAlign={'center'}
                      paddingBottom='1em'
                      >
                      Valor Total: R${this.totalValue()},00
                    </Heading>
                </Box>
                </Flex>
            </>
        )
    }
}