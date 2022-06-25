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
    return (
        <div>
            <h2>this is a view for {params.id}</h2>
            {pageData.map(item => (
                <div key={item.id}>
                    <h2>{item.title}</h2>
                    <img src={item.poster}/>
                    <p>{item.description}</p>
                </div>
            ))}
        </div>
    )
}

export default MovieView