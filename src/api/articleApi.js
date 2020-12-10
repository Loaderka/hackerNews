export const articleAPI = {
  async fetchById(id) { 
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    const article = await response.json();
    return article;
  }
}
