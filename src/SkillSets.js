import React, { useState, useEffect, useContext } from 'react';
import Modal from './Modal';
import { AppContext } from './AppContext';

const SkillSet = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const {user} = useContext(AppContext)


  const apiURL = 'https://67fb4c118ee14a542629a7a0.mockapi.io/skills';

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setLoading(true); // Start loader
    fetch(apiURL)
      .then(res => res.json())
      .then(data => {
        const skillNames = data.map(item => item.name);
        setSkills(skillNames);
        console.log(skills)
        setLoading(false); // stop loader
      });
  }, []);


// Add new skill to API and update state
  const handleAddSkill = () => {
    if (newSkill.trim() === '') return;

    setLoading(true); // Start loader

    fetch(apiURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newSkill })
    })
      .then(res => res.json())
      .then(data => {
        setSkills(prev => [...prev, data.name]);
        setNewSkill('');
        setShowModal(false); // close modal after adding
      })
      .finally(() => {
        setLoading(false); // Stop loader
      });;
    console.log(skills)
  };


  // Delete skill
  const handleDeleteSkill = (skillName) => {
    setLoading(true);
    fetch(apiURL)
      .then(res => res.json())
      .then(data => {
        const skillToDelete = data.find(item => item.name === skillName);
        if (skillToDelete) {
          fetch(`${apiURL}/${skillToDelete.id}`, {
            method: 'DELETE'
          }).then(() => {
            setSkills(prev => prev.filter(skill => skill !== skillName));
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });;
  };

  return (
    <div className='skillset-section'>
        <div className='content-area'>
        <div className='header-section'>
          <h2>Skillsets</h2>
          {user && (
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            Add Skills
          </button>
          )}
        </div>
        <div className='skills-wrapper'>
          {skills.map((skill, index) => (
            <span key={index} className='skills-item'>{skill}

            {user && (
              <span className='remove-btn' onClick={() => handleDeleteSkill(skill)}>-</span>
            )}
            
            </span>
            
          ))}
        </div>
        {loading && <div className="modal-overlay">
              <div className="loader"></div>
            </div>}


        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <h5>Add a Skill</h5>
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="form-control mb-3"
              placeholder="Enter a skill"
            />
            <div className="btn-group">
              <button className="btn btn-secondary me-2" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleAddSkill}>
                Add
              </button>
            </div>
            {loading && <div className="modal-overlay">
              <div className="loader"></div>
            </div>}
          </Modal>
        )}
        </div>
    </div>
    // <div className="skillset-container">
    //   <h3>Add Your Skills</h3>
    //   <div className="input-group mb-3">
    //     <input
    //       type="text"
    //       value={skill}
    //       onChange={(e) => setSkill(e.target.value)}
    //       onKeyDown={handleKeyPress}
    //       placeholder="Enter a skill"
    //       className="form-control"
    //     />
    //     <button className="btn-primary" onClick={handleAddSkill}>
    //       Add Skill
    //     </button>
    //   </div>

    //   <ul className="list-group">
    //     {skills.map((sk, index) => (
    //       <li key={index} className="list-group-item">
    //         {sk}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default SkillSet;
