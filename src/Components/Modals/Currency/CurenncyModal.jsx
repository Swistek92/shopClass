import { Component } from 'react';
import styles from './styles.module.css';
import { changeCurrency } from '../../../Store/ItemsSlice';
import { connect } from 'react-redux';

class CurenncyModal extends Component {
  render() {
    const { currentCurency } = this.props.items;
    const filteredCurrency = this.props.items.currency.filter(
      (e) => e.label !== currentCurency.label
    );
    // console.log(this.props);
    return (
      <div className={styles.dropdown}>
        <button className={styles.dropbtn}>{currentCurency.symbol}</button>
        <div className={styles.dropdownContent}>
          {filteredCurrency.map((e) => {
            return (
              <button
                className={styles.btn}
                key={e.label}
                onClick={() => this.props.changeCurrency(e)}
              >
                {e.symbol} {e.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { items } = state;

  return { items };
};
const actionsCreators = {
  changeCurrency,
};

export default connect(mapStateToProps, actionsCreators)(CurenncyModal);
