
const API_URL = 'https://jsonplaceholder.typicode.com/posts'

export async function getPosts(){
    const res = await fetch(API_URL);
    const data = await res.json()
    return data;
}

export async function getSinglePost(id){
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json()
    return data;
}