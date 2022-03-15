import { cartActions } from './cart-slice';
import { uiActions } from './ui-slice';

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const url =
        'https://react-http-3ec4f-default-rtdb.firebaseio.com/cart.json';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const cart = await response.json();
      return cart;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity || 0,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Error fetching data from server',
        })
      );
    }
  };
};

export const sendCardData = (cart) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      dispatch(
        uiActions.showNotification({
          status: 'pending',
          title: 'Sending..',
          message: 'Fetching products from API..',
        })
      );
      const response = await fetch(
        'https://react-http-3ec4f-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Products sent to API!',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: error,
        })
      );
    }
  };
};
