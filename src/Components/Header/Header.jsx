/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from 'react';
import styles from './style.module.css';
import { connect } from 'react-redux';
import { changeCategory, changeCurrency } from '../../Store/ItemsSlice';
import CurenncyModal from '../Modals/Currency/CurenncyModal';
import CartModal from '../Modals/Cart/CartModal';
import { Link } from 'react-router-dom';
import Logo from './Logo.svg';

export class Header extends Component {
  categories = () => {
    if (this.props.items.categories === []) return;
    return this.props.items.categories.map((e) => {
      const isCurrentCategory = e === this.props.items.currentCategory;

      return (
        <li
          key={e}
          style={{
            color: isCurrentCategory ? 'green' : undefined,
            textDecoration: isCurrentCategory ? 'underline' : undefined,
          }}
          onClick={() => this.props.changeCategory(e)}
        >
          {e}
        </li>
      );
    });
  };

  render() {
    return (
      <header className={styles.container}>
        <p className={styles.links}>{this.categories()}</p>

        <Link to='/'>
          <img src={Logo} alt='logo' />
        </Link>
        <div className={styles.buttons}>
          <CurenncyModal />
          <CartModal />
        </div>
      </header>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { cart, items } = state;

  return { cart, items };
};
const actionsCreators = {
  changeCategory,
  changeCurrency,
};

export default connect(mapStateToProps, actionsCreators)(Header);
