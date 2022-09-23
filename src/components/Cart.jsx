import React, { Component } from "react";
import CartCard from './CartCard'

export default class Cart extends Component {
    render() {
        const cartItem = this.props.cart && 
          this.props.cart.map((item) => {
                          return (
                            <CartCard 
                              key={item.id}
                              id={item.id}
                              removeItemFromCart={() => this.props.removeItemFromCart(item.id)}
                              title={item.title}
                              quantity={item.quantity}
                              price={item.price}
                            />
                            )
                        })
        return(
            <>
                {cartItem} 
            </>
        )
    }
}