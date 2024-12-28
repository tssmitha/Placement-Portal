import React, {useState} from "react";
import { useHistory } from "react-router";
import axios from "axios";
import './AdminLogin.css';

const AdminLogin = () =>{
    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');
    const [error , setError] = useState('');
    const history = useHistory();

    const handleLogin = async (e) =>{
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:5000/api/admin/admin-login',{
                username,
                password,
            });

            const {token} = response.data;
            localStorage.setItem('admin-token' , token);
            history.push('/admin-dashboard');
        }catch(error){
            setError("Invalid credentials or not an admin");
        }
    };

    return(
        <div className="login-page">
            <div className="card">
                <div className="card-header">
                        Admin Login
                    </div>
                    <div className="card-body">
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                id = "usename"
                                name="username"
                                value={username}
                                onChange = {(e) => setUsername(e.target.value)}    
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input 
                                type="password" 
                                id="password"
                                name="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                    </div>
            </div>
        </div>
    );
};

export default AdminLogin;