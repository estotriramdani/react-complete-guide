import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const [btnHiglighted, setBtnHighlited] = useState(false);

  const numberOfItems = cartCtx.items.reduce(
    (currNumber, curr) => currNumber + curr.amount,
    0
  );

  const btnClasses = `${classes.button} ${btnHiglighted ? classes.bump : ''}`;

  useEffect(() => {
    if (cartCtx.items === 0) return;
    setBtnHighlited(true);
    const timer = setTimeout(() => {
      setBtnHighlited(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [cartCtx.items]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
