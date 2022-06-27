import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"


const MovieView = () => {
    const dispatch = useDispatch();
    const params = useParams()
    const pageData = useSelector(store => store.setPageData)
   useEffect(() => {
        dispatch({
            type: "SET_PAGE_VIEW",
            payload: params.id
        })
   }, [])
   console.log(pageData)
    return (
        <div>
            {pageData.map(item => (
                <div key={item.id}>
                    <h2>{item.title}</h2>
                    <img src={item.poster}/>
                    <h3>Genres:</h3>
                    {item.name.map(genre => (<h4>{genre}</h4>))}
                    <p>{item.description}</p>
                    
                </div>
            ))}
        </div>
    )
}

export default MovieView