import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    price: 9,
    title: 'Test Product 1',
    description: 'This is a first product - amazing!',
  },
  {
    id: 'p2',
    price: 12,
    title: 'Test Product 2',
    description: 'This is a second product - amazing!',
  },
  {
    id: 'p3',
    price: 15,
    title: 'Test Product 3',
    description: 'This is a third product - amazing!',
  },
  {
    id: 'p4',
    price: 18,
    title: 'Test Product 4',
    description: 'This is a fourth product - amazing!',
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            id={product.id}
            key={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
