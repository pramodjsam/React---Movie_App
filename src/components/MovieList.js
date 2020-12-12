import React from 'react';

const MovieList = (props)=>{
	const FavouriteComponent=props.AddToFavourites;
	return(
		<>
			{props.movies.map((movie)=>(
				<div key={movie.imdbID} className=' image-container d-flex m-3 justify-content-start'>
					<img src={movie.Poster} alt="movie" />
					<div onClick={()=>props.handleFavouritesClick(movie)}
					className='overlay d-flex justify-content-center align-items-center'>
						<FavouriteComponent />
					</div>
				</div>
			))}
		</>
	)
}

export default MovieList;