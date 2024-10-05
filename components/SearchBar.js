import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchProducts } from '../src/slices/productSlice';
import { useRouter } from 'next/router';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { categories, products } = useSelector((state) => state.products);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [skip, setSkip] = useState(0);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts({ category, limit: 10, skip, search }));
  }, [dispatch, category, skip, search]);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setSkip(0); // Reset pagination when category changes
    router.push(`/?category=${cat}`);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setSkip(0); // Reset pagination when search changes
    router.push(`/?search=${e.target.value}`);
  };

  return (
    <div>
      <div>
        <h1>Product Categories</h1>
        <select onChange={(e) => handleCategoryChange(e.target.value)}>
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input type="text" placeholder="Search products..." onChange={handleSearch} />
      </div>

      <div>
        <h2>Products</h2>
        <div>
          {products.map((product) => (
            <div key={product.id}>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
        <button onClick={() => setSkip(skip + 10)}>Load more</button>
      </div>
    </div>
  );
};

export default ProductsPage;
