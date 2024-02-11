import './App.css';
import UseForms from './components/UseForms';
import useFetch from './hooks/useFetch';




function App() {



  
  const {response,loading,error} = useFetch({url:'/api/v1/users', method:'GET' })
  
  const userList = response?.items.map(user => {
    return{
      name:user.name,
      isCompleted:user.isCompleted,
      id:user._uuid
    }
  }) || []







  const onFormSubmit = (name, isCompleted) => {
    fetch('/api/v1/users', {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.REACT_APP_API_KEY}`
      },
      body: JSON.stringify([{name, isCompleted}])
    })
    .then(res => {
      if(!res.ok) throw new Error ("Response failed")
      return res.json()
    })
    // .then(data => setTaskLists((prev) => [ {
    //   name:data.items[0].name,
    //   isCompleted:data.items[0].isCompleted,
    //   id:data.items[0]._uuid
    // },...prev]))
    .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <UseForms onFormSubmit={onFormSubmit}/>
 
      {userList.map((user) =>  <div key={user.id} style={{border: '1px solid black '}} >
        <h3>{user.name}</h3>
        <h3>{user.isCompleted}</h3>
      </div>)}
    </div>
  );
}

export default App;
