import React, { useState } from "react";

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Blog",
      content: "This is my first blog post built using React."
    },
    {
      id: 2,
      title: "Learning React",
      content: "React helps build dynamic user interfaces easily."
    }
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addPost = () => {
    if (title.trim() === "" || content.trim() === "") return;

    const newPost = {
      id: posts.length + 1,
      title,
      content
    };

    setPosts([...posts, newPost]);
    setTitle("");
    setContent("");
  };

  return (
    <div style={styles.container}>
      <h1>Simple Blogging App</h1>

      <div style={styles.form}>
        <input
          type="text"
          placeholder="Enter Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        <textarea
          placeholder="Enter Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={styles.textarea}
        />

        <button onClick={addPost} style={styles.button}>
          Add Post
        </button>
      </div>

      <div style={styles.posts}>
        {posts.map((post) => (
          <div key={post.id} style={styles.card}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    fontFamily: "Arial"
  },
  form: {
    marginBottom: "30px"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    fontSize: "16px"
  },
  textarea: {
    width: "100%",
    padding: "10px",
    height: "100px",
    marginBottom: "10px",
    fontSize: "16px"
  },
  button: {
    padding: "10px 15px",
    fontSize: "16px",
    cursor: "pointer"
  },
  posts: {
    marginTop: "20px"
  },
  card: {
    border: "1px solid #ccc",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "5px"
  }
};

export default App;
