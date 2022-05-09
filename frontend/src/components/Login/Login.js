import React, { useEffect, useState } from 'react';
import AuthenticationService from "../../services/AuthenticationService";
import { useNavigate } from 'react-router'

const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.clear();
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        AuthenticationService
            .signin(username, password)
            .then((user) => {
                const roles = [];
                user.authorities.forEach(authority => {
                    roles.push(authority.authority)
                });
                if (roles.includes("ROLE_JUDGE")) {
                    navigate('/judge');
                } else if (roles.includes("ROLE_MAIN_JUDGE")) {
                    navigate('/main_judge');
                } else if (roles.includes("ROLE_PM")) {
                    navigate('/pm');
                } else if (roles.includes("ROLE_ADMIN"))
                    navigate('/admin');
            },
            error => {
                console.log("Login fail: error = { " + error.toString() + " }");
                setError("Can not signin successfully ! Please check username/password again");
            }
        );
    }


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const changeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        name === 'username'
            ? setUsername(value)
            : setPassword(value)
    }

    return (
        <div className='container mt-5' style={{margin: '20% auto'}}>
            <div className='d-flex justify-content-center'>
                <form className='form' onSubmit={(e) => handleSubmit(e)}>
                    <h1 className='text-center mb-4'>Russian Motocross Freestyle Championship</h1>
                    <div>
                        <label htmlFor="username" className='col-form-label pt-0'><strong>Username</strong></label>
                        <div className="input-group mb-2">
                            <input autoFocus
                                   type="text"
                                   name="username"
                                   id="username"
                                   className='form-control'
                                   value={username}
                                   placeholder="Enter Username"
                                   autoComplete="username"
                                   onChange={(e) => changeHandler(e)}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className='col-form-label pt-0'><strong>Password</strong></label>
                        <div className='input-group mb-2'>
                            <input type="password"
                                   name="password"
                                   id="password"
                                   className='form-control'
                                   value={password}
                                   placeholder="Enter Password"
                                   autoComplete="password"
                                   onChange={(e) => changeHandler(e)}
                            />
                        </div>
                    </div>
                    <button className='btn btn-primary btn-lg mt-4 w-100 text-center' type="submit">
                        Sign In
                    </button>
                    { error && <div className="alert alert-danger" role="alert">{error}</div>}
                </form>
            </div>
        </div>
    );
}

export default Login;