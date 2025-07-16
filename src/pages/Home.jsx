import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Home.css";

function Home() {
  return (
    <div>
      <div className="slogan-wrapper">
       <h2 className="slogan">Play Beautifully, Wear Beautifully</h2>
      </div>
      <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/assets/jersey1.jpeg" className="d-block w-100" alt="Slide 1" />
          </div>
          <div className="carousel-item">
            <img src="/assets/jersey4.jpeg" className="d-block w-100" alt="Slide 2" />
          </div>
          <div className="carousel-item">
            <img src="/assets/jersey3.jpeg" className="d-block w-100" alt="Slide 3" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>
      <div className="welcome-section text-center my-5">
      <h2>Welcome to JOGO BONITO</h2>
       <p>Find the best football jerseys for your favorite teams.</p>
        <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
      </div>

    </div>
  );
}

export default Home;
