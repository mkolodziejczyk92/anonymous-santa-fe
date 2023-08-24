import image from "../Assets/Profile.png";

const Profile = () => {
  return (
    <div className="Container">
      <h1 style={{ display: "flex", justifyContent: "center" }}>
      <img src={image} alt="Profile"/>
      </h1>
    </div>
  );
};

export default Profile;
