function getMovieApiCallList(decade) {

  let newApiCallList = [];

  if(decade){
    newApiCallList = [
      { genreName: "alien", genreNumber: 27, decade: decade, keywords: 9951 },
      { genreName: "post-apocalyptic", genreNumber: 27, decade: decade, keywords: "285366|4458" },
      { genreName: "werewolf", genreNumber: 27, decade: decade, keywords: 12564 },
      { genreName: "horrorComedy", genreNumber: "27,35", decade: decade },
      { genreName: "sci-fi", genreNumber: "27,878", decade: decade },
      { genreName: "slasher", genreNumber: 27, decade: decade, keywords: 12339 },
      { genreName: "zombie", genreNumber: 27, decade: decade, keywords: 12377 },
      { genreName: "creature", genreNumber: 27, decade: decade, keywords: 13031 },
      { genreName: "cannibal", genreNumber: 27, decade: decade, keywords: 14895 },
      { genreName: "vampire", genreNumber: 27, decade: decade, keywords: 3133 }
    ];
    return newApiCallList;
  }
  else{
    return null;
  }
}

export default getMovieApiCallList;
