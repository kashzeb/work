import React, { useContext, useEffect, useState } from 'react'
import {AppContext} from './AppContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const {user, isLoading, handleLogin, logoutUser, error, success}= useContext(AppContext)
    
      const [showModal, setShowModal] = useState(false);
      const [username, setUsername] = useState('kashif');
      const [password, setPassword] = useState('123456');
      const navigate = useNavigate();
    
      const handleSubmit = async (e) => {
        console.log('handleSubmit function called!');
        e.preventDefault();
        await handleLogin(username, password);
      };

      useEffect(()=>{
        if(success){
          navigate('/work')
        }
      },[success, navigate])

  return (
    <div className='login-section'>
        <div className='content-area'>
        <h2>Login to Edit Profile</h2>
            <div className='input-wrapper'>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control mb-3"
                placeholder="Enter Username"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control mb-3"
                placeholder="Enter Password"
              />
            </div>
            {isLoading && (
                <div className="loader"></div>
              )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <div className="btn-group">
              <button className="btn-primary w-100" onClick={handleSubmit}>
                Login
              </button>
            </div>
        </div>
    </div>
  )
}

export default Login