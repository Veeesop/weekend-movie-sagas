import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory} from 'react-router-dom';
import './MovieList.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function MovieList() {
    const history = useHistory()
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <h1>MovieList</h1>
            <section className='movies'>
            {movies.map((movie) => {
                return (
                    <div className='movie-card'  key={movie.id}>
                    <Card sx={{ maxWidth: 345 }} >
                    <CardMedia
                      component="img"
                      height="140"
                      image={movie.poster}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {movie.title}
                      </Typography>
        
                    </CardContent>
                    <CardActions>
                      <Button size="small">Edit</Button>
                      <Button size="small" onClick={() => history.push(`/movieView/${movie.id}`)}>Learn More</Button>
                    </CardActions>
                  </Card>
                  </div>
                )
            })}
            
            </section>
        </main>

    );
}

export default MovieList;