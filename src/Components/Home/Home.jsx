import axios from "axios";
import { useEffect, useState } from "react";
import { auth } from "../FireBase/FireBase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [news, setNews] = useState([]);
  const [file, setFile] = useState(null);

  // const [demo, setDemo] = useState(false); //Extra
  // const [page, setPage] = useState(null); //Extra

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
      // const url =
      //   "https://newsapi.org/v2/top-headlines?" +
      //   "country=us&" +
      //   "apiKey=6b0dba7d193044bd89f186d9603a81f9";

      const url = "https://jsonplaceholder.typicode.com/users"; //Extra

      const data = await axios.get(url);
      // setNews(data.data.articles);
      setNews(data.data); //Extra
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

      {/* <button type="button" onClick={() => setDemo(true)}>
        Click
      </button> */}

      {/* <div className="fullNews" style={{ display: demo ? "block" : "none" }}>
        <span className="cross" onClick={() => setDemo(false)}>
          &times;
        </span>
        <br />
        <br />
        <h1>
          "Tesla Model 3 standard range $35480 + $7500 rebate + 6 months of free
          supercharging"
        </h1>
        <img
          src="https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc4/cybertruck-gear-shifter.jpg"
          alt=""
        />
        <h2>Content</h2>
        <p>
          "None Charlie Munger bemoaned not investing in Amazon early, and
          wished he bet bigger on Apple.None Warren Buffett's late sidekick, who
          passed on Tesla, said Elon Musk is talented but takes big risks.…
          [+294 chars]"
        </p>
        <h2>Description</h2>
        <p>
          "Tesla Cybertruck's interior has been reworked to match its angular
          exterior and offers some features that other Teslas don't have. It
          does have manual gear selector and manual door release handles for
          emergencies, albeit at some different places than usual."
        </p>
        <span>PublishedAt: "2023-12-06T03:32:06Z"</span>
        <p>
          <a href="https://www.notebookcheck.net/Cybertruck-manual-gear-selector-and-emergency-door-release-handles-get-interactive-preview.778935.0.html">
            Link To Page
          </a>
        </p>
      </div> */}

      <div className="newscontainer">
        {news.map((v, i) => (
          <>
            {/* <div key={i} className="news" onClick={() => setFile(v)} key={i}> */}
            {/* <img src={v.urlToImage} alt="" /> */}
            {/* {v.description} */}
            {/* </div> */}
          </>
        ))}
      </div>






      {/* <div className="newscontainer">
        {news.map((v, i) => (
            <p key={i} className="news" onClick={() => setPage(v)}>
              {v.name}
            </p>
        ))}
      </div>

 */}



      {/* {page ? (
        <div className="fullNews">
          <span className="cross" onClick={() => setPage(null)}>
            &times;
          </span>

          <br />
          <br />
          <h1>{page.name}</h1>
        </div>
      ) : null}
 */}




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


      {/* <div className="fullNews" style={{ display: file ? "block" : "none" }}>
        <span  className="cross" onClick={() => setFile(null)}>&times;</span>

        <br />
        <br />
        <h1>{file.title}</h1>
        <img src={file.urlToImage} />
        <h2>Content</h2>
        <p>{file.content}</p>
        <h2>Description</h2>
        <p>{file.description}</p>
        <span>PublishedAt: {file.publishedAt}</span>
        <p>
          <a href={file.url}>Link To Page</a>
        </p>
      </div> */}
    </>
  );
}
