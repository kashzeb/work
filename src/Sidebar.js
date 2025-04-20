import React, { useContext, useState } from 'react'
import Modal from './Modal';
import {AppContext} from './AppContext';
// import { Link, Route, Router, Routes } from 'react-router-dom';
import AboutSection from './AboutSection';
import Experiences from './Experiences';
import SkillSet from './SkillSets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {

  const {user, isLoading, handleLogin, logoutUser, error, success}= useContext(AppContext)

  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    console.log('handleSubmit function called!');
    e.preventDefault();
    await handleLogin(username, password);
  };
  


  return (
    <div className='sidebar'>

      <div>
        <div className='thumbnail'>
            <img src={`${process.env.PUBLIC_URL}/kashif-khan-front-end-developer-profile-pic.jpg`} alt='thumbnail' />
        </div>
        {/* <h2>Kashif Khan</h2>
        <p>Front-end Developer</p> */}

        <nav className='menu'>
          <NavLink  to="/" className='menu-item'>Home</NavLink >
          <NavLink  to="/about-me" className='menu-item'>About Me</NavLink >
          <NavLink  to="/skills" className='menu-item'>Skills</NavLink >
          <NavLink  to="/experience" className='menu-item'>Work Experience</NavLink >
        </nav>
      </div>

      <div>
      {!user && (
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          Login
        </button>
      )}

        {user && (
        <div>
          <p>Logged in as: {user.username}</p>
          <button className="btn-primary" onClick={logoutUser}>
          Logout
        </button>
        </div>
      )}
      </div>



     

        {showModal && (
          <Modal onClose={() => setShowModal(false)}>

            
            <h5>Login to Edit Profile</h5>
            <div className='input-wrapper'>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control mb-3"
                placeholder="Enter Username"
              />
              <input
                type="text"
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
              <button className="btn btn-secondary me-2" onClick={() => setShowModal(false)}>
                Close
              </button>
              <button className="btn-primary" onClick={handleSubmit}>
                Login
              </button>
            </div>
          </Modal>
        )}
    </div>
  )
}

export default Sidebar