import { Fragment, useEffect } from 'react';
import { ArticleBlock } from '../ArticleBlock/ArticleBlock';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticlesList } from '../../thunk/fetchArticlesList';
import { Box, Button, CircularProgress } from '@material-ui/core';

export function ArticlesList() {
  const dispatch = useDispatch();
  const articlesList = useSelector(state => state.ids);

  console.log(articlesList);

  useEffect(() => {
    if (articlesList?.status === "success") {
      return;
    }
    dispatch(fetchArticlesList());
    // раз в минуту перезапрашивать список айдишников
  }, [])

  function refreshArticlesList() {
    dispatch(fetchArticlesList());
  }

  if (!articlesList.data || articlesList.status === "loading") {
    return (
      <Box 
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100vh'
        marginTop='75px'
      >
        <CircularProgress status='loading'></CircularProgress>
      </Box>
    ); 
  }

  if (!articlesList.data || articlesList.status === "failure") {
    return (
      <Box 
        textAlign="center" 
        fontWeight="700"
      >
        Error, refresh that page!
        <Button 
          variant="outlined"
          onClick={refreshArticlesList}
          style={{display: 'block', margin: "5px auto"}}
        >
          refresh
        </Button>
      </Box>
    );
  }

  return (
    <Fragment>
      
      <Box 
        display='flex' 
        justifyContent='flex-end'
        padding='20px 0'
      >
        <Button 
          variant="outlined" 
          onClick={refreshArticlesList}
          size="small"
        >
          refresh
        </Button>
      </Box>
      <main className='articleList'>
        {articlesList.data.map(id => <ArticleBlock key={id} id={id} />)}
      </main>
    </Fragment>
    
    )
}