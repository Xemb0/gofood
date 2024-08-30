import React from 'react'
import burger from '../assets/burger.jpg'
import french from '../assets/french fries.jpg'
import pasta from '../assets/pasta.jpg'
import pizza from '../assets/pizza.jpg'


export default function Carousal() {
  return (
    <div >
        <div id="carouselExample" className="carousel slide" style={{objectFit:"cover !important"}} data-interval="1000" >
  <div className="carousel-inner" style={{maxHeight:"65vh", }}>
   
    <div className="carousel-item active">

      <img src={burger} alt="..."  />
    </div>
    <div className="carousel-item">
      <img src={pizza} className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <img src={french} className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <img src={pasta} className="d-block w-100" alt="..." />
    </div>
  </div>
  <button
    className="carousel-control-prev"
    type="button"
    data-bs-target="#carouselExample"
    data-bs-slide="prev"
  >
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>
  <button
    className="carousel-control-next"
    type="button"
    data-bs-target="#carouselExample"
    data-bs-slide="next"
  >
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>
</div>

    </div>
  )
}
