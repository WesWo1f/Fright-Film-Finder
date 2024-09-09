



// export default async function FetchMovieData(dataToFetch) {
//     if (dataToFetch === undefined || dataToFetch === null) {
//         return null;
//     }
//     else{
//         try {
//             let fetchedMovieData;
//             if (Array.isArray(dataToFetch) && dataToFetch?.length > 0) {
//                 const apiCallList = dataToFetch;
//                 console.log("Fetching main categories");
//                 fetchedMovieData = await fetchMovieCategoriesData(apiCallList);
//                 return fetchedMovieData;
//             } else {
//                 if (dataToFetch !== undefined && dataToFetch !== null) {
//                     console.log("Fetching user input movie data");
//                     fetchedMovieData = await fetchUserInputData(dataToFetch);
//                     return fetchedMovieData;
//                 }
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }


//     async function fetchUserInputData(userInput){
//       console.log("Fetching user movie request");
//       try {
//         const response = await fetch(
//           "https://horror-movie-app-server-f55a090ce3b2.herokuapp.com/userquery",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ query: userInput }),
//           }
//         );
//         const data = await response.json();
//         return data;
//       } catch (error) {
//         console.log("Error fetching data:", error);
//         return null;
//       }
//     };

//     const fetchMovieCategoriesData = async (apiCallList) => {
//         let categoryMoviesList = [];
//         try {
//             for (let i = 0; i < apiCallList.length; i++) {
//                 const response = await fetch(
//                     "https://horror-movie-app-server-f55a090ce3b2.herokuapp.com/discover",
//                     {
//                         method: "POST",
//                         headers: {
//                             "Content-Type": "application/json",
//                         },
//                         body: JSON.stringify(apiCallList[i]),
//                     }
//                 );
//                 const data = await response.json();
//                 categoryMoviesList = [...categoryMoviesList, data];
//             }
//         } catch (error) {
//             console.log("Error fetching data:", error);
//             return null;
//         }
//         return categoryMoviesList;
//     };


