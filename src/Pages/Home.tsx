import image from "../Assets/home.jpg";

const Home = () => {
  return (
    <div className="Container">
      <h1 style={{ display: "flex", justifyContent: "center" }}>Home</h1>
      <img
        alt="homeImage"
        style={{ backgroundColor: "transparent", width: "250px" }}
        src={image}
      ></img>
      <p>Description here</p>
    </div>
  );
};

export default Home;
