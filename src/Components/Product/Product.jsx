import React, { Component } from 'react';
import styles from './style.module.css';
import { connect } from 'react-redux';
import { addToCart } from '../../Store/CartSlice';
import { Navigate } from 'react-router-dom';

class Product extends Component {
  state = {
    select: 0,
    attributes: [],
    noAttributesAlert: '',
    redirect: false,
  };

  addToCart(addToCart, item) {
    const noAttributes = this.state.attributes.find((e) => e.selected === '');
    if (noAttributes) {
      this.setState({ noAttributesAlert: 'Select Attributes!' });
      return;
    } else {
      this.setState({ noAttributesAlert: '' });
      const cartItem = {
        attributes: this.state.attributes,
        item,
      };
      addToCart(cartItem);
      this.setState({ redirect: true });
    }
  }

  imgs = (gallery) => {
    return gallery.map((e, i) => {
      return (
        <img
          onClick={() => this.setState({ select: i })}
          key={e}
          src={e}
          alt='img'
        />
      );
    });
  };

  selectImg = (item) => {
    return <img alt='img' src={item.gallery[this.state.select]} />;
  };

  details = (item, Curency, addToCart, attributes) => {
    const price = item.prices.find((e) => e.currency.label === Curency.label);

    return (
      <div>
        <h3>{item.name}</h3>
        <p>{item.brand}</p>
        {this.state.attributes.length >= 1 &&
          item.attributes.map((e, i) => {
            return (
              <div key={i}>
                <p>{e.name}</p>
                {e.items.map((e, index) => {
                  const selected = e.id;
                  const name = attributes[i].name;
                  const isSelected = e.id === this.state.attributes[i].selected;
                  if (name === 'Color') {
                    return (
                      <button
                        key={index}
                        className={styles.colorAttribute}
                        style={{
                          backgroundColor: e.value,
                          color: e.value,
                          border: isSelected && '1px solid #5ECE7B',
                          scale: isSelected && 'calc(1.25)',
                        }}
                        onClick={() =>
                          this.setState({
                            attributes: this.state.attributes.map((e) =>
                              e.name === name ? { ...e, selected } : e
                            ),
                          })
                        }
                      ></button>
                    );
                  } else
                    return (
                      <div
                        key={index}
                        style={{
                          backgroundColor: isSelected && 'black',
                          color: isSelected && 'white',
                        }}
                        onClick={() =>
                          this.setState({
                            attributes: this.state.attributes.map((e) =>
                              e.name === name ? { ...e, selected } : e
                            ),
                          })
                        }
                        className={styles.attributes}
                      >
                        {e.value}
                      </div>
                    );
                })}
              </div>
            );
          })}
        <p>Price</p>
        <p>
          {price.amount} {Curency.label} {Curency.symbol}
        </p>
        <p style={{ color: 'red' }}>{this.state.noAttributesAlert}</p>
        <button onClick={() => this.addToCart(addToCart, item)}>
          Add to cart
        </button>
        <div dangerouslySetInnerHTML={{ __html: item.description }} />
      </div>
    );
  };

  render() {
    const { products, currentCurency } = this.props.items;
    const { selectItem } = this.props.cart;
    if (this.props.cart.selectItem === '') {
      return <Navigate to='/' replace={true} />;
    }

    const item = products.find((e) => e.id === selectItem);
    // this.attributes(item);
    let attributes;
    if (item.attributes.length >= 1) {
      attributes = JSON.parse(JSON.stringify(item.attributes));
      attributes.forEach((element) => {
        element.selected = '';
      });
      if (this.state.attributes.length < 1) {
        this.setState({ attributes });
      }
    }
    const addToCart = this.props.addToCart;
    return (
      <main className={styles.main}>
        <div className={styles.imgs}>{this.imgs(item.gallery)}</div>
        <div className={styles.img}>{this.selectImg(item)}</div>
        <div className={styles.details}>
          {this.details(item, currentCurency, addToCart, attributes)}
        </div>
        {this.state.redirect && <Navigate to='/cart' replace={true} />}
      </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { cart, items } = state;

  return { cart, items };
};

const actionsCreators = { addToCart };

// function withParams(Product) {
//   return (props) => <Product {...props} navigate={useNavigate()} />;
// }

export default connect(mapStateToProps, actionsCreators)(Product);
// export default withParams(connect(mapStateToProps, actionsCreators)(Product));
