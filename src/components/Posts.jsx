import React, { useEffect, useState } from "react";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, onError] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");

        const data = await res.json();

        setPosts(data);

        setIsLoading(false);
      } catch (e) {
        onError(true);
      }
    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading!!!</div>
      ) : (
        posts.map((post) => {
          return (
            <div role="listitem">
              <div style={{ fontWeight: "bold" }}>{post.title}</div>
              <div>{post.body}</div>
              <br></br>
              <br></br>
              <br></br>
            </div>
          );
        })
      )}

      {error || !posts[0] ? <div>Error Occured</div> : ""}
    </>
  );
}
