import { Link } from "react-router-dom"

const About = () => {
  return (
    <div className="container">
      <div className="about-container">
        <h2>About this</h2>
        <p>This is task tracker created by me. I created this as a practice project to learn react.</p>
        <p>I made another version of this with MySQL database and backend but I haven deployed it.</p>
        <Link className="link" to="/Task-Manager">← Back</Link>
      </div>
    </div>
  )
}

export default About