import React from 'react'
import {data} from '../restApi.json'
const menu = () => {
  return (
    <>
        <section className='ourSpecial' id='ourSpecial'>
          <div className="container">
            {
              data[0].ourSpecial.map(element=>{
                return(
                  <div className='card' key={element.id}>
                      <img src={element.image} alt={element.title} />
                      <p className='title'>{element.title}</p>
                      <p className='description'>{element.description}</p>
                  </div>
                )
              })
            }
          </div>
        </section>
    </>
  )
}

export default menu