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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSubmit = async (e) => {
    console.log('handleSubmit function called!');
    e.preventDefault();
    await handleLogin(username, password);
  };

  function toggleSidebar () {
    setIsSidebarOpen(!isSidebarOpen)
  }
  


  return (
    <div>
      <nav className='mob-menu' >
        <div className='thumbnail cursor-pointer' onClick={toggleSidebar}>
            <img src={`${process.env.PUBLIC_URL}/kashif-khan-front-end-developer-profile-pic.jpg`} alt='thumbnail' />
        </div>

        {!user && (
        <NavLink  to="/login" className='btn-primary-link w-auto'>Login</NavLink >
      )}

        {user && (
        <div onClick={logoutUser}>
          {/* <button className="btn-primary" >
          Logout
        </button> */}

        
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
        </div>
      )}
          {/* <svg onClick={toggleSidebar} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg> */}
    </nav>

    {/* Overlay */}
    {isSidebarOpen && <div className="overlay" onClick={() => setIsSidebarOpen(false)}></div>}

    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>

      <div>
        <div className='thumbnail'>
            <img src={`${process.env.PUBLIC_URL}/kashif-khan-front-end-developer-profile-pic.jpg`} alt='thumbnail' />
        </div>
        {/* <h2>Kashif Khan</h2>
        <p>Front-end Developer</p> */}

        <nav className='menu'>
          <NavLink  to="/work" className='menu-item' onClick={toggleSidebar}>Home</NavLink >
          <NavLink  to="/about-me" className='menu-item' onClick={toggleSidebar}>About Me</NavLink >
          <NavLink  to="/skills" className='menu-item' onClick={toggleSidebar}>Skills</NavLink >
          <NavLink  to="/experience" className='menu-item' onClick={toggleSidebar}>Work Experience</NavLink >
        </nav>

        

      </div>

      <div className='hide-on-mob'>
      {!user && (
        <NavLink  to="/login" className='btn-primary-link'>Login</NavLink >
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
    </div>
  )
}

export default Sidebar