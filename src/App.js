import { ArticlesList } from './components/ArticlesList/ArticlesList';
import { Article } from './components/Article/Article';
import { BrowserRouter, Route } from 'react-router-dom';
import { store } from './fileStore/store';
import { Provider } from 'react-redux'
import { Container } from '@material-ui/core';


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Container maxWidth='md'>
          <Route exact path='/' component={ArticlesList}/>
          <Route exact path='/:itemId' component={Article}/>
        </Container>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
