import axios from "axios";
import { useEffect, useState } from "react";
import { auth } from "../FireBase/FireBase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [news, setNews] = useState([]);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signOut(auth);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  const handleFetch = async () => {
    try {
      const url =
        "https://newsapi.org/v2/top-headlines?" +
        "country=us&" +
        "apiKey=9523d483047740d3b05c474258120777";

      const data = await axios.get(url);
      setNews(data.data.articles);
    } catch (error) {}
  };

  useEffect(() => {
    handleFetch();
  }, []);

  console.log(news);

  return (
    <>
      <div className="heading">
        <h1>Top Trending News</h1>
      </div>

      <button type="button" className="button" onClick={handleSubmit}>
        Log Out
      </button>

      <div className="newscontainer">
        {news.map((v, i) => (
          <>
            <div key={i} className="news" onClick={() => setFile(v)}>
              <img src={v.urlToImage} alt="" />
              {v.description}
            </div>
          </>
        ))}
      </div>

      {file ? (
        <div className="fullNews">
          <span className="cross" onClick={() => setFile(null)}>
            &times;
          </span>

          <br />
          <br />
          <h1>{file.title}</h1>
          <img src={file.urlToImage} alt="" />
          <h2>Content</h2>
          <p>{file.content}</p>
          <h2>Description</h2>
          <p>{file.description}</p>
          <span>PublishedAt: {file.publishedAt}</span>
          <p>
            <a href={file.url}>Link To Page</a>
          </p>
        </div>
      ) : null}
    </>
  );
}
