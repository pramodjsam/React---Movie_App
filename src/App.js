import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddToFavourites from './components/AddToFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
  const [movies,setMovies]=useState([]);
  const [favourites,setFavourites]=useState([]);
  const [searchValue,setSearchValue]=useState("");

  const getMovieRequest=async (searchValue)=>{
    const url=`http://www.omdbapi.com/?s=${searchValue}&apikey=396832c`
    const response=await fetch(url);
    const responseJson=await response.json();
    if(responseJson.Search){
      setMovies(responseJson.Search);
    }    
  }

  useEffect(()=>{
    getMovieRequest(searchValue);
  },[searchValue])

  useEffect(()=>{
    const movieFavourites=JSON.parse(localStorage.getItem('favmovie'));
    if(movieFavourites){
      setFavourites(movieFavourites);
    }    
  },[])

  const saveToLocalStorage=(item)=>{
    localStorage.setItem("favmovie",JSON.stringify(item));
  }

  const addFavouriteMovie =(movie)=>{
    const newFavourites=[...favourites,movie];
    setFavourites(newFavourites);
    saveToLocalStorage(newFavourites);
  }

  const removeFavouriteMovie=(movie)=>{
    const newFavourites=favourites.filter((favourite)=>favourite.imdbID!==movie.imdbID);
    setFavourites(newFavourites);
    saveToLocalStorage(newFavourites);
  }

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <MovieList movies={movies} AddToFavourites={AddToFavourites} 
          handleFavouritesClick={addFavouriteMovie}
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favourites' />
      </div>
      {favourites && <div className='row'>
        <MovieList movies={favourites} AddToFavourites={RemoveFavourites} 
          handleFavouritesClick={removeFavouriteMovie}
        />
      </div>}
    </div>
  )
}

export default App;
