export const articleListAPI = {
  async fetchIds() { 
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/newstories.json`);
    const ids = await response.json();
    return ids.slice(0, 100);
  }
}