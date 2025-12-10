
export default function Ads(){
    return(
       <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="src/assets/ads/26f6b82e-6578-4991-a88c-e2ad93ed3735_VN-1976-688.jpg_2200x2200q80.jpg_.avif" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="src/assets/ads/72333a0f-ffa1-4657-b32d-9a54ef3e332d_VN-1976-688.jpg_2200x2200q80.jpg_.avif" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="src/assets/ads/f7be5c72-44aa-4a23-96ac-d54bd7c1e98f_VN-1976-688.jpg_2200x2200q80.jpg_.avif" className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    );
}