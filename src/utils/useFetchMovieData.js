import { useState, useEffect } from "react";

const useFetchMovieData = (query, endPoint, streamingService) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    console.log(query)
  }, [query, endPoint, streamingService]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching movie data");
      try {
        const response = await fetch(
          `https://horror-movie-app-server-f55a090ce3b2.herokuapp.com/${endPoint}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: query, provider: streamingService }),
          }
        );
        const result = await response.json();
        setData(result);
        console.log("Fetched data:", result);
      } catch (error) {
        console.log("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, endPoint, streamingService]);

  return { data, loading, error };
};

export default useFetchMovieData;