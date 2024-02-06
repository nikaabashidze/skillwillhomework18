import React from 'react'
import { useState } from 'react'

const UseForms = ({onFormSubmit}) => {
    const [name, setname] = useState()
    const [isCompleted, setisCompleted] = useState()

    const onSubmit = (e) => {
        e.preventDefault()
        onFormSubmit(name,isCompleted)
    }

  return (
   <form onSubmit={onSubmit}>
    <input
        type="text"
        placeholder='name'
        onChange={ e => setname(e.target.value)}
        />


    <input
        type="text"
        placeholder='isCompleted'
        onChange={ e => setisCompleted(e.target.value)}
        />
        
        <button>submit</button>

   </form>
  )
}

export default UseForms
