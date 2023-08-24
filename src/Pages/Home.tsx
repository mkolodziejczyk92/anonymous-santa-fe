import image from "../Assets/hometrans.png";

const Home = () => {
  return (
    <div className="Container">
      <img
        alt="homeImage"
        style={{ backgroundColor: "transparent", height:"130%" }}
        src={image}
      ></img>
    </div>
  );
};

export default Home;
