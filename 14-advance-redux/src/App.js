import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { uiActions } from './store/ui-slice';

let isInitial = true;

function App() {
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    const sendCardData = async () => {
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
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Products sent to API!',
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCardData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: error.message,
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <Layout>
      {notification && <Notification {...notification} />}
      {cartIsVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
