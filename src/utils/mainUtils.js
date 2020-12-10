export function getTime(time){
  let date = new Date(time*1000);
  return `${new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(date)}`;
}