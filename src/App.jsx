import { useEffect, useState } from 'react';
import './App.css';
import UseForms from './components/UseForms';



const API_KEY = 'jkG5-0mQ0wJVAEddTSefGtLVZROp9vEd98nl2dmIJNBNdVUpkw'

function App() {
  const [userList, setTaskLists] = useState([]) 


    useEffect (() => {
      fetch('/api/v1/users', {
        method:"GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
      })
       .then(res => {
        if(!res.ok) throw new Error ("Response failed")
        return res.json()
      })
      .then(data =>setTaskLists(data.items.map(user => {
        return{
          name:user.name,
          isCompleted:user.isCompleted,
          id:user._uuid
        }
      })))
      .catch(err => console.log(err))


    },[])






  const getTasks = () => {
    fetch('/api/v1/users', {
      method:"GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
    })
     .then(res => {
      if(!res.ok) throw new Error ("Response failed")
      return res.json()
    })
    .then(data =>setTaskLists(data.items.map(user => {
      return{
        name:user.name,
        isCompleted:user.isCompleted,
        id:user._uuid
      }
    })))
    .catch(err => console.log(err))
  }



  const onFormSubmit = (name, isCompleted) => {
    fetch('/api/v1/users', {
      method:"post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify([{name, isCompleted}])
    })
    .then(res => {
      if(!res.ok) throw new Error ("Response failed")
      return res.json()
    })
    .then(data => setTaskLists((prev) => [ {
      name:data.items[0].name,
      isCompleted:data.items[0].isCompleted,
      id:data.items[0]._uuid
    },...prev]))
    .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <UseForms onFormSubmit={onFormSubmit}/>
      <button onClick={getTasks}>Get Tasks</button>
      <button onClick={() => setTaskLists([])}>Clear Tasks</button>
      {userList.map((user) =>  <div key={user.id} style={{border: '1px solid black '}} >
        <h3>{user.name}</h3>
        <h3>{user.isCompleted}</h3>
      </div>)}
    </div>
  );
}

export default App;
