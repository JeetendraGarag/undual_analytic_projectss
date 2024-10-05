import { Provider } from 'react-redux';
import store from '../store';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;


// App.js or ProductsPage.js

// Limitations:
// 1. The app doesn't implement infinite scrolling. Users have to manually click 'Load more' to fetch additional products. 
//    A better approach would be to load more products automatically as the user scrolls down the page (infinite scrolling).
// 2. There are no advanced filters for the products (like price range, ratings, etc.). This could improve user experience significantly.
// 3. When changing category or performing a new search, the product list resets but there's no visual loading state or progress indicator, which could impact UX.
// 4. There's limited error handling (e.g., what happens if the API request fails? The app doesn't currently handle that).
// 5. No caching of already fetched products. If the user switches categories and comes back to a previously loaded category, it fetches the data again instead of reusing it from Redux.

