import React, { Component } from 'react';
import styles from './styles.module.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectAttributes,
  incrementQuantity,
  decrementQuantity,
} from '../../Store/CartSlice';

class Cart extends Component {
  items = () => {
    const cart = this.props.cart.cart;
    const selectedCurrency = this.props.items.currentCurency.label;
    return cart.map((e, i) => {
      const price = e.item.prices.find(
        (e) => e.currency.label === selectedCurrency
      );

      const itemId = e.item.id;
      const quantity = e.quantity;
      return (
        <div key={i}>
          <div className={styles.cartItem}>
            <div>
              <p> {e.item.name}</p>
              <p> {e.item.brand}</p>
              <p>
                {price.amount} {price.currency.symbol}
              </p>
              {e.attributes.map((e, index) => {
                const selected = e.selected;
                const name = e.name;
                return (
                  <div key={index}>
                    <p>{name}</p>
                    {e.items.map((e, itemIndex) => {
                      const isSelected = e.id === selected;
                      if (name === 'Color') {
                        return (
                          <button
                            key={itemIndex}
                            className={styles.colorAttribute}
                            style={{
                              backgroundColor: e.value,
                              color: e.value,
                              border: isSelected && '1px solid #5ECE7B',
                              scale: isSelected && 'calc(1.25)',
                            }}
                            onClick={() =>
                              this.props.selectAttributes([itemId, name, e.id])
                            }
                          >
                            __
                          </button>
                        );
                      } else {
                        return (
                          <button
                            key={itemIndex}
                            style={{
                              backgroundColor: isSelected && 'black',
                              color: isSelected && 'white',
                              scale: isSelected && 'calc(1.25)',
                            }}
                            onClick={() =>
                              this.props.selectAttributes([itemId, name, e.id])
                            }
                            className={styles.attributes}
                          >
                            {e.value}
                          </button>
                        );
                      }
                    })}
                  </div>
                );
              })}
            </div>
            <div className={styles.cartItemRight}>
              <div className={styles.rightButtons}>
                <button
                  className={styles.quantityBtn}
                  onClick={() => this.props.incrementQuantity(itemId)}
                >
                  +
                </button>
                <p>{quantity}</p>
                <button
                  className={styles.quantityBtn}
                  onClick={() => this.props.decrementQuantity(itemId)}
                >
                  -
                </button>
              </div>
              <img
                className={styles.img}
                alt='galery img'
                src={e.item.gallery[0]}
              />
            </div>
          </div>
          <hr />
        </div>
      );
    });
  };

  render() {
    // const { currentCategory, currentCurency } = this.props.items;
    const taxValue = Math.round(
      (this.props.cart.tax / 100) * this.props.cart.total
    );
    const totalPrice = this.props.cart.total;
    const taxProc = this.props.cart.tax;
    const symbol = this.props.items.currentCurency.symbol;
    const quanit = this.props.cart.quanity;
    return (
      <main className={styles.main}>
        <h1>CART</h1>
        <hr />
        {this.items()}
        <div>
          <p>
            Tax {taxProc}%:
            <b>
              {symbol} {taxValue}
            </b>
          </p>
          <p>
            Quanit: <b>{quanit}</b>
          </p>
          <p>
            Total:{' '}
            <b>
              {symbol} {totalPrice.toFixed(2)}
            </b>
          </p>
          <button className={styles.orderBtn}> ORDER</button>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { cart, items } = state;

  return { cart, items };
};

const actionsCreators = {
  selectAttributes,
  incrementQuantity,
  decrementQuantity,
};

export default connect(mapStateToProps, actionsCreators)(Cart);
