import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "./app.css";

const BASE_URL = "https://api.chucknorris.io/jokes";

const fetchRandomJokeFromApi = async () => {
  return axios.get(`${BASE_URL}/random`);
};

function App() {
  const [joke, setJoke] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const handleFetchJoke = async () => {
    const response = await fetchRandomJokeFromApi();
    setJoke(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    handleFetchJoke();
  }, []);

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    );

  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <span>
        Joke Creation Date: {dayjs(joke?.created_at).format("DD/MM/YYYY")}
      </span>
      <span>
        Joke Update Date: {dayjs(joke?.updated_at).format("DD/MM/YYYY")}
      </span>
      <span>Joke: {joke?.value}</span>
      <div>
        <a href={joke?.url}>
          <span>Would you like to visit joke's url?</span>
        </a>
      </div>
    </div>
  );
}

export default App;
