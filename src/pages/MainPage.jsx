import React from 'react'
import useFetch  from '../hooks/useFetch'
const MainPage = () => {

    const { response, loading, error } = useFetch('/api/v1/users', 'GET');
    const userList = response?.items.map(user => ({
      name: user.name,
      isCompleted: user.isCompleted,
      id: user._uuid
    })) || [];

 
    if (loading) return <div className="App">Loading . . .</div>;
    if (error) return <div className="App">Error: {error.message}</div>;
    



  return (
    <div className="App">
      {userList.map(user => (
         <div key={user.id} style={{ border: '1px solid black' }}>
        <h3>{user.name}</h3>
        <h3>{user.isCompleted}</h3>
      </div>
    ))}
  </div>
  )
}

export default MainPage
