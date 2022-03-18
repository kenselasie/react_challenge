import { useState, useCallback } from 'react';
import './App.css';
import { useFetch } from './hooks/useFetch'

function App() {
  const url1 = 'https://jsonplaceholder.typicode.com/users/1'
  const url2 = 'https://jsonplaceholder.typicode.com/users/5'
  const [name, setName] = useState('')
  const {data, error, loading, setUrl, setData} = useFetch(url1, (response) => {
    console.log('Successfully called callback function', response)
  })
 
  const setNewUrl = () => {
    setUrl(() => url2)
  }
  

  const setNewData = useCallback(() => {
    if (error) return
    if (!name) return
    setData((prevData) => { return {...prevData, name: name} })
    // return setName(() => '')
  }, [name])

  return (
    <div className="App">

      {loading && <h1>Loading..</h1> }
      {error && <h1>An error occured</h1> }
      { data && 
        <div>
          <h1>User Profile</h1>
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
          <button onClick={setNewUrl}>Set User Two</button>
          <div style={{margin: '40px'}}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            <button onClick={setNewData}>Update Name</button>
          </div>
        </div>}
    </div>
  );
}

export default App;
