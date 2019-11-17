import React, { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:3333"
});

function App() {
  const [state, setState] = useState({
    newPostContent: "",
    posts: []
  });

  useEffect(() => {
    const getPosts = async () => {
        const { data: posts } = await api.get("/posts");

        setState({ posts });
    };
    getPosts()
  }, []);

  const handlePostSave = async e => {
    e.preventDefault();

    const { data: post } = await api.post("/posts", {
      content: state.newPostContent
    });
    setState({ posts: [...state.posts, post] });
  };

  const handleDelete = async id => {
    await api.delete(`/posts/${id}`);

    setState({ posts: state.posts.filter(item => item.id !== id) });
  };

  return (
    <div className="App">
      <form onSubmit={handlePostSave}>
        <textarea
          onChange={e =>
            setState({
              posts: [...state.posts],
              newPostContent: e.target.value
            })
          }
          value={state.newPostContent}
        />
        <button type="submit">Postar</button>
      </form>

      <ul>
        {state.posts.map(post => (
          <li onClick={() => handleDelete(post.id)} key={post.id}>
            {post.id} - {post.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
