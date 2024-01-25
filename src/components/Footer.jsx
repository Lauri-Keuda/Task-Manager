import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer>
      <p className="copyright">Copyright &copy; 2024</p>
      <Link className="link" to="/about">About</Link>
    </footer>
  )
}

export default Footer