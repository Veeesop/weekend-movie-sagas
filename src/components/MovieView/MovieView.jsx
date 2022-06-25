import { useParams } from "react-router-dom"

const MovieView = () => {
    const params = useParams()

    return (
        <h2>this is a view for {params.id}</h2>
    )
}

export default MovieView