
const API_URL = 'https://jsonplaceholder.typicode.com/posts'

export async function getPosts(){
    const res = await fetch(API_URL);
    const data = await res.json()
    return data;
}
