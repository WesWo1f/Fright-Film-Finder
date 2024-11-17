export default async function fetchMovieData (query, endPoint, streamingService) {

    async function movieTrailerCall() {
      console.log(`Fetching ${endPoint} data`);
      try {
        const response = await fetch(
          `http://localhost:8000/${endPoint}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({movieId: query.movieId, query: query, provider: streamingService }),
          }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.log("Error fetching data:", error);
        return null;
    }
  }
  return movieTrailerCall().then(data => data).catch(() => null);
};
