const Profile = ({ name, position }) => {
  return (
    <div className="profile">
      <h2>{name}</h2>
      <p>{position}</p>
    </div>
  )
}

export default Profile 