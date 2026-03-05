import React, { useEffect, useState } from "react";
import History from "../components/History"
import MovieList from "../components/MovieList"

export default function Home(){

    const [search, setSearch] = useState()
    const storedHistory = localStorage.getItem("search")
    const [history, setHistory] = useState(storedHistory ? JSON.parse(storedHistory) : [])
    const [focused, setFocused] = useState(false)

    const [movies, SetMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    console.log("Denne kommer fra storage", storedHistory)
    
    const baseUrl = `http://www.omdbapi.com/?s=${search}&apikey=`
    
    const apiKey = import.meta.env.VITE_APP_API_KEY

    useEffect(() =>{
        localStorage.setItem("search", JSON.stringify(history))
    },[history])

    useEffect(() => {
        const getBondMovies = async() => {
            try{
                setLoading(true)
                setError(null)

                const response = await fetch('https://www.omdbapi.com/?s=james%20bond&type=movie&apikey=${apiKey}')
                const data = await response.json

                if (data.Response === "True") {
                    SetMovies(data.Search)
                } else {
                    setError("Kunne ikke hente James Bond filmer")
                }
            } catch (err) {
                setError("noe gikk galt med API-kallet")
            } finally {
                setLoading(false)
            }
        }
    })

    const getMovies = async() => {
        try
        {
            const response = await fetch(`${baseUrl}${apiKey}`)
            const data = await response.json()
            console.log(data)
        }
        catch(err){
            console.error(err);
        }
    }

    const handleChange = (e)=>{
        setSearch(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        e.target.reset()
        
        setHistory((prev) => [...prev, search])
    }

    console.log(history )

    return (
        <main>
            <h1>Forside</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Søk etter film: 
                    <input type="search" 
                        placeholder="Jatt James Bond" 
                        onChange={handleChange}
                        onFocus={() => setFocused(true)}
                        /*onBlur={() => setFocused(false)}*/ > 
                    </input>
                </label>
                {focused ? <History history={history} setSearch={setSearch}/> : null }
                <button onClick={getMovies}>Hent Film</button>
            </form>
        </main>
)
}