import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';


const Form = () => {

    const [moviesData, setMoviesData] = useState([])
    const [search, setSearch] = useState("films")
    const [sorting, setSorting] = useState(null)
    // const [vintageSearch, setVintageSearch] = useState([])
    const [genres, setGenres] = useState([]);

    const [genreData, setGenreData] = useState("")

    useEffect(() => {

        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=eee5052f80218fbb33d3368694940bf1&query=${search}&language=fr-FR`).then((res) => setMoviesData(res.data.results)
        )

    }, [search])

    // useEffect pour récupérer les genres
    useEffect(() => {


        // if (genres.length === 0){
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=eee5052f80218fbb33d3368694940bf1&query=${genres}&language=fr-FR`).then((res) => setGenres(res.data.genres)
        )
        // }




    }, [genres]) //Ne refait la requête que si genres est vide




    // Filtrer les films en fonction de la recherche et du genre
    const filteredMovies = moviesData.filter((movie) => {
        // Filtrage par recherche
        const matchSearch = movie.title.toLowerCase().includes(search.toLowerCase());

        // Filtrage par genre (optionnel)
        const matchGenre = genreData === '' || movie.genre_ids.includes(parseInt(genreData));

        // Les films doivent correspondre à la recherche et (optionnellement) au genre
        return matchSearch && matchGenre;
    });




    return (
        <div className='form-component'>
            <div className="form-container">
                <form>



                    <input type="text" placeholder='Cherchez un film'
                        // value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)

                            if (e.target.value === "") {
                                setSearch("a")
                            }

                        }

                        } />

                    <div className="dropdown">
                        <select className='dropbtn' onChange={(e) => setGenreData(e.target.value)} value={genreData}>
                            <option value="">Genres</option><option value="12">Aventure</option><option value="14">Fantaisie</option><option value="16">Animation</option><option value="18">Drama</option><option value="27">Horreur</option><option value="28">Action</option><option value="35">Comedie</option><option value="36">Histoire</option><option value="37">Western</option><option value="53">Thriller</option><option value="80">Crime</option><option value="99">Documentaire</option><option value="878">Science Fiction</option><option value="9648">Mystérieux</option><option value="10402">Music</option><option value="10749">Romance</option><option value="10751">Famille</option><option value="10752">Guerre</option><option value="10770">TV Movie</option>
                            {genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}


                        </select>

                    </div>

                    <div className="btn-sort-container">
                        <div className="btn-sort" id="top" onClick={() => setSorting("top")}><h2>Top</h2> <span>👍🏻</span> </div>
                        <div className="btn-sort" id="flop" onClick={() => setSorting("flop")}><h2>Flop </h2><span> 👎🏻</span> </div>
                    </div>
                </form>


            </div>
            <div className="result">
                {
                    filteredMovies.slice(0, 12)
                        .sort((a, b) => {

                            if (sorting === "top") {
                                return b.vote_average - a.vote_average;
                            }
                            else if (sorting === "flop") {
                                return a.vote_average - b.vote_average
                            }
                        }

                        )

                        .map((movie) => (
                            <Card key={movie.id} movie={movie} />)
                        )
                }

            </div>

        </div>
    );
};

export default Form;