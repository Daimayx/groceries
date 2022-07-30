import React, {useRef, useState} from 'react';
import {useAuth} from "../../context/AuthContext";
import {Link, Navigate} from "react-router-dom"
import {useNavigate} from 'react-router-dom';


const Signup = () => {
    let navigate = useNavigate();
    const usernameRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {currentUser, signup} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const userAgreement = useRef()

    async function handleSubmit(e) {
        e.preventDefault()
        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const confPassword = e.target[3].value;
        const role = e.target[4].value;
        console.log(e)
        if (password !== confPassword) {
            return setError("Passwords do not match")
        }
        setError("")
        setLoading(true)
        signup(email, password, role).then((cred) => {
            console.log(cred)
            navigate("/dashboard")
        }).catch((err) => console.log(err))
        setLoading(false)
    }

    return (
        <>{currentUser ? <Navigate to={"/dashboard"}/> :
            <div className="overflow-hidden">

                <div className="row d-flex justify-content-center pt-2 m-0 ">
                    <div className="col-md-4 card p-5" style={{minWidth:"500px"}}>
                        <form onSubmit={handleSubmit}>
                            <h2>Sign Up</h2>
                            <p>Please fill in this form to create an account!</p>
                            <hr/>
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text">
                                    <i className="fa fa-user"></i>
                                        </span>
                                    </div>
                                    <input type="text" style={{margin: "0px"}} className="form-control" name="username"
                                           placeholder="Username" required="required"/>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                        <i className="fa fa-paper-plane"></i>
                                        </span>
                                    </div>
                                    <input type="email" className="form-control" name="email"
                                           placeholder="Email Address" required="required"/>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                        <i className="fa fa-lock"></i>
                                        </span>
                                    </div>
                                    <input type="password" style={{margin: "0px"}} className="form-control" name="password"
                                           placeholder="Password"
                                           required="required"/>
                                </div>
                            </div>


                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                        <i className="fa fa-lock"></i>
                                        </span>
                                    </div>
                                    <input type="text" style={{margin: "0px"}} className="form-control"
                                           name="confirm_password"
                                           placeholder="Confirm Password" required="required"/>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                        <i className="fa fa-user"></i>
                                        </span>
                                    </div>
                                    <select style={{margin: "0px"}} className="form-control" name="role"
                                           placeholder="Role"
                                            required="required">
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                {error && <div className="row alert-danger px-1"> {error} </div>}
                            </div>

                            <div className="form-group">
                                <label className="form-check-label">
                                    <input type="checkbox" onSubmit={() => false}
                                           ref={userAgreement} required/> I
                                    accept
                                    the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
                            </div>

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
                            </div>
                        </form>
                        <div className="text-center">Already have an account? <a href="login">Login here</a></div>
                    </div>
                </div>

            </div>}
        </>);
}
export default Signup;

