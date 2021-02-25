import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { useHistory, useParams } from "react-router-dom";

// DO STARS YOU DUMBASS
const initalState = {
  director: '',
  metascore: '',
  title: '',
}

function MovieUpdate(props) {
  const {id} = useParams();
  const history = useHistory()
  const [ourDumbState, setOurDumbState] = useState(initalState)


  useEffect(() => {

    axios.get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setOurDumbState(res.data)
      })
      .catch(err => console.log({err}))
    
  },[])

  const onChange = (e) => {
    const {name, value} = e.target
    setOurDumbState({
      ...ourDumbState,
      [name]: value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    
    axios.put(`http://localhost:5000/api/movies/${id}`, ourDumbState)
      .then(res => {
        setOurDumbState(res.data)
        history.goBack()
      })
      .catch(err => console.log({err}))

  }


  return (
    <div>
      <form onSubmit={onSubmit}>

        <label>
          Title:
          <input type="text" name="title" value={ourDumbState.title} onChange={onChange} />
        </label>

        <label>
          Director
          <input type="text" name="director" value={ourDumbState.director} onChange={onChange}/>
        </label>

        <label>
          Metascore:
          <input type="number" name="metascore" value={ourDumbState.metascore} onChange={onChange}/>
        </label>

        <button>Submit</button>

      </form>
    </div>
  )
}

export default MovieUpdate
