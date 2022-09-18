import React, { Component } from 'react';
import styles from './style.module.css';
import { connect } from 'react-redux';
import logo from './Logo.svg';
import { Link } from 'react-router-dom';
import { selectItem } from '../../Store/CartSlice';

class ListPage extends Component {
  items = () => {
    const { products, currentCategory } = this.props.items;
    if (!products) return;
    let filtered = products;

    if (currentCategory !== 'all') {
      filtered = filtered.filter((e) => e.category === currentCategory);
    }
    return filtered.map((e) => {
      const selectedCurrency = this.props.items.currentCurency.label;
      const price = e.prices.find((e) => e.currency.label === selectedCurrency);
      return (
        <div key={e.id} className={styles.card}>
          <img className={styles.img} src={e.gallery[0]} alt={e.id} />
          <Link
            onClick={() => this.props.selectItem(e.id)}
            to={`/product/${e.id}`}
            className={styles.link}
          >
            <img className={styles.btnDetails} src={logo} alt='logo' />
          </Link>
          <p className={styles.title}> {e.name}</p>
          <p className={styles.price}>
            {price.currency.symbol} {price.amount}
          </p>
        </div>
      );
    });
  };

  render() {
    const { currentCategory } = this.props.items;
    return (
      <main className={styles.main}>
        <h1 className={styles.header}>Category {currentCategory}</h1>
        <div className={styles.cards}>{this.items()}</div>
      </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { cart, items } = state;

  return { cart, items };
};

const actionsCreators = { selectItem };

export default connect(mapStateToProps, actionsCreators)(ListPage);
