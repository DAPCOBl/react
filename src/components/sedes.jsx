import React from 'react';

function Sedes() {
  return (
    <div className="sedes">
      <h1>NUESTRAS SEDES</h1>
      <div className="cuadro">
        <input type="radio" id="1" name="image-slide" hidden />
        <input type="radio" id="2" name="image-slide" hidden />
        <input type="radio" id="3" name="image-slide" hidden />

        <div className="slide">
          <div className="item-slide">
            <img src="/IMG/img1.jpeg" alt="Slide 1" />
          </div>
          <div className="item-slide">
            <img src="/IMG/img2.jpeg" alt="Slide 2" />
          </div>
          <div className="item-slide">
            <img src="/IMG/img3.jpeg" alt="Slide 3" />
          </div>
        </div>

        <div className="pagination">
          <label className="pagination-item" htmlFor="1">
            <img src="/IMG/img1.jpeg" alt="Slide 1" />
          </label>
          <label className="pagination-item" htmlFor="2">
            <img src="/IMG/img2.jpeg" alt="Slide 2" />
          </label>
          <label className="pagination-item" htmlFor="3">
            <img src="/IMG/img3.jpeg" alt="Slide 3" />
          </label>
        </div>
      </div>
    </div>
  );
}

export default Sedes;
