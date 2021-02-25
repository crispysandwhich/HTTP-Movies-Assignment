import Axios from 'axios'
import React,{ useState } from 'react'
import { useHistory } from 'react-router-dom'



const initOffering = {
  title: '',
  director: '',
  metascore: '',
  // Dont foget the stars
  stars: [],
}

function AddingMovie() {
  let history = useHistory()
  const [initalValue, setInitalValue] = useState(initOffering)

  // On change handler
  const onChange = (e) => {
    let {name} = e.target

    let value = name === 'stars' ? e.target.value.split(',') : e.target.value

    setInitalValue({
      ...initalValue,
      [name]: value
    })
    console.log(value, name, 'onChange')
  }

  // On submit handler
  const onSubmit = (e) => {
    e.preventDefault()

    Axios.post('http://localhost:5000/api/movies', initalValue)
      .then(res => {
        console.log(res.data)
        history.push('/')
      })
      .catch(err => console.log({err}))


    console.log(initalValue,'submited ')
  }




  return (
    <div>
      <h2>Adding a new moview? </h2>
      <form onSubmit={onSubmit}>
        
        <label>
          Title:
          <input type="text" name="title" onChange={onChange} value={initalValue.title}/>
        </label>

        <label>
          director:
          <input type="text" name="director" onChange={onChange} value={initalValue.director}/>
        </label>

        <label>
          metascore:
          <input type="number" name="metascore" onChange={onChange} value={initalValue.metascore}/>
        </label>

        <label>
          stars:
          <input type="text" name="stars" onChange={onChange} value={initalValue.stars}/>
        </label>
        <p>Add a comma after each word</p>

        <button>Submit</button>
      </form>
    </div>
  )
}

export default AddingMovie
