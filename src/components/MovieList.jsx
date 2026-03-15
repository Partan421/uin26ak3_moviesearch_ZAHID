import MovieListItem from './MovieListItem'
import '../styles/ListStyle.scss'


export default function MovieList({movies}){
    return(
        <section>
            <h2>Filmer</h2>
            <ul className='movie-list'>
                {movies?.map(movie => (
                    <MovieListItem key={movie.imdbID} movie={movie} />
                ))}
            </ul>
        </section>
    )
}