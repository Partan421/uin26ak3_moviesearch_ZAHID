import { useParams } from "react-router-dom"

export default function Movie(){
    const {movie} = useParams()
    return (<h3>{movie}</h3>)
}