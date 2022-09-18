import { Component } from 'react';
import styles from './styles.module.css';
import { connect } from 'react-redux';
import {
  selectAttributes,
  incrementQuantity,
  decrementQuantity,
  updateQuanity,
  updateTotal,
} from '../../../Store/CartSlice';
import { Link, Navigate } from 'react-router-dom';
import Logo from './Logo.svg';
class CartModal extends Component {
  state = {
    redirect: false,
    numberItemsInCart: this.props.cart.cart.length,
  };

  componentDidUpdate = () => {
    if (this.state.numberItemsInCart !== this.props.cart.cart.length) {
      this.setState({ numberItemsInCart: this.props.cart.cart.length });
    }
  };

  items = () => {
    const cart = this.props.cart.cart;
    const selectedCurrency = this.props.items.currentCurency.label;

    return cart.map((e, index) => {
      const price = e.item.prices.find(
        (e) => e.currency.label === selectedCurrency
      );

      const itemId = e.item.id;
      const quantity = e.quantity;
      return (
        <>
          <div key={index} className={styles.cartItem}>
            <div>
              <p> {e.item.name}</p>
              <p> {e.item.brand}</p>
              <p>
                {price.amount} {price.currency.symbol}
              </p>
              {e.attributes.map((e, i) => {
                const selected = e.selected;
                const name = e.name;
                return (
                  <>
                    <p>{name}</p>
                    {e.items.map((e, i) => {
                      const isSelected = e.id === selected;
                      if (name === 'Color') {
                        return (
                          <button
                            key={i}
                            className={styles.colorAttribute}
                            style={{
                              backgroundColor: e.value,
                              color: e.value,
                              border: isSelected
                                ? '1px solid #5ECE7B'
                                : undefined,
                              scale: isSelected ? 'calc(1.25)' : undefined,
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
                            key={i}
                            style={{
                              backgroundColor: isSelected ? 'black' : undefined,
                              color: isSelected ? 'white' : undefined,
                              scale: isSelected ? 'calc(1.25)' : undefined,
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
                  </>
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
        </>
      );
    });
  };

  render() {
    const cart = this.props.cart.cart;
    const selectedCurrency = this.props.items.currentCurency.label;

    const renderScroll = this.state.numberItemsInCart > 2;
    let totalquanity = 0;
    let totalPrice = 0;

    cart.forEach((element, i) => {
      totalquanity += element.quantity;
      const { amount } = cart[i].item.prices.find(
        (e) => e.currency.label === selectedCurrency
      );
      totalPrice += amount * element.quantity;
    });

    if (totalquanity !== this.props.cart.quantity) {
      this.props.updateQuanity(totalquanity);
    }

    if (totalPrice !== this.props.cart.total) {
      this.props.updateTotal(totalPrice);
    }
    return (
      <div className={styles.dropdown}>
        <button className={styles.dropbtn}>
          <img src={Logo} alt='logo' />
          <div className={styles.logoQuanity}>{this.props.cart.quanity}</div>
        </button>
        <div className={styles.dropdownContent}>
          <p>
            <b>My Bag.</b> {this.props.cart.quanity} items
          </p>

          <div className={renderScroll ? styles.items : undefined}>
            {this.items()}
          </div>
          <div className={styles.totalPrice}>
            <p> total price: </p>
            <p>
              {this.props.cart.total.toFixed(2)}
              {this.props.items.currentCurency.symbol}
            </p>
          </div>
          <div className={styles.btns}>
            <Link className={styles.bagBtn} to='/cart'>
              <p>view bag</p>
            </Link>
            <Link className={styles.checkOutBtn} to='#'>
              Checkout
            </Link>
          </div>
        </div>
        {this.state.redirect && <Navigate to='/cart' replace={true} />}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { items, cart } = state;

  return { items, cart };
};
const actionsCreators = {
  selectAttributes,
  decrementQuantity,
  incrementQuantity,
  updateQuanity,
  updateTotal,
};

export default connect(mapStateToProps, actionsCreators)(CartModal);
