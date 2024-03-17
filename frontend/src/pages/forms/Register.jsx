import { Link , useNavigate} from "react-router-dom";
import "./form.css"
import { useState } from "react";
import {toast} from "react-toastify"
import {useDispatch , useSelector} from "react-redux"
import { registerUser } from "../../redux/apiCalls/authApiCall";
import swal from "sweetalert"


const Register = () => {

  const dispatch = useDispatch()
  const {registerMessage} = useSelector(state => state.auth)

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (username.trim() === "") return toast.error("Username is required");
        if (email.trim() === "") return toast.error("Email is required");
        if (password.trim() === "") return toast.error("Password is required");
    
        dispatch(registerUser({ username, email, password }))
      };

     const navigate = useNavigate();

      if(registerMessage){
        swal({
          title : registerMessage ,
          icon : "success"
        }).then(isOK => {
          if (isOK) {
            navigate("/login")
          }
        })
      }


    return ( 
        <section className="form-container">
        <h1 className="form-title">Create new account</h1>
        <form onSubmit={formSubmitHandler} className="form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-input"
            />
          </div>
          <button type="submit" className="form-btn">
            Register
          </button>
        </form>
        <div className="form-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </section>
    
  
     );
}
 
export default Register;