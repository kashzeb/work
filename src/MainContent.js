import React, { useEffect, useState } from 'react'
import Experiences from './Experiences'
import experiencesData from './experiences.json'
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import SkillSet from './SkillSets';
import Modal from './Modal';

const MainContent = () => {

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [environment, setEnvironment] = useState('');
  const [start_date, setStartDate] = useState('');
  const [end_date, setEndDate] = useState('');
  const [experiences, setExperiences] = useState([]);

  const apiUrl = 'https://67fb4c118ee14a542629a7a0.mockapi.io/experiences';

  const handleAddExperience = () => {
    if (!jobTitle || !companyName || !description) return;
  
    setLoading(true);
    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jobTitle,
        companyName,
        description,
        environment,
        start_date,
        end_date
      })
    })
      .then(res => res.json())
      .then(data => {
        setExperiences(prev => [...prev, data]);
        setShowModal(false);
        // clear form
        setJobTitle('');
        setCompanyName('');
        setDescription('');
        setEnvironment('');
        setStartDate('');
        setEndDate('');
      })
      .finally(() => setLoading(false));
  };


  const handleDeleteExperience = (id) => {
    setLoading(true);
    fetch(`https://67fb4c118ee14a542629a7a0.mockapi.io/experiences/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setExperiences(prev => prev.filter(exp => exp.id !== id));
      })
      .finally(() => setLoading(false));
  };
  


  useEffect(() =>{
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => setExperiences(data));

    console.log(experiences)
  }, [] )

  return (
    <div className='main-content-area'>
      {loading && <div className="modal-overlay">
              <div className="loader"></div>
            </div>}
      {/* <HeroSection /> */}

      <AboutSection />

      <SkillSet />
        

        {/* <Experiences 
        jobtitle={'FrontEnd / UI Lead – Homeville Group Pvt. Ltd. – December 2021 – till date.'}
        description={`Working as Front-End UI Lead. Developing Mobile App using React Native. Maintaining the complete flow of the Mobile Application right from converting design to mobile app screens and then API integration. Also, all the Websites and Admin Portals Frontend Design and Development are gone through me. Technologies used for Frontend Website and Portals are Angular, Bootstrap, SASS, JavaScript, jQuery, Typescript and for Backend are Laravel, PHP. Technologies used for Mobile Application is React Native, Android Studio`} 
        environment={'React Native, Android Studio, HTML5, CSS3, Angular, JavaScript, jQuery, Typescript, SASS, Git.'}/> */}

        <div className='header-section'>
          <h2>PROFESSIONAL EXPERIENCE</h2>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            Add Experience
          </button>
        </div>

        {experiences.map((experience , index) => (
            <div>
              <Experiences 
              key={index}
              jobtitle={experience.jobTitle}
              companyname={experience.companyName}
              startDate={experience.start_date}
              endDate={experience.end_date}
              description={experience.description}
              environment={experience.environment}
              />
              <button onClick={() => handleDeleteExperience(experience.id)}>Delete</button>
            </div>
        )
        )}


        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <h5>Add a Experience</h5>
            <div className='input-wrapper'>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="form-control mb-3"
                placeholder="Enter Job Title"
              />
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="form-control mb-3"
                placeholder="Enter Company Name"
              />
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Enter Job Description'>
                
              </textarea>
              <input
                type="text"
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
                className="form-control mb-3"
                placeholder="Enter Environment"
              />  
              <input
                type="text"
                value={start_date}
                onChange={(e) => setStartDate(e.target.value)}
                className="form-control mb-3"
                placeholder="Enter Start Date"
              />
              <input
                type="text"
                value={end_date}
                onChange={(e) => setEndDate(e.target.value)}
                className="form-control mb-3"
                placeholder="Enter End Date"
              />
            </div>
            <div className="btn-group">
              <button className="btn btn-secondary me-2" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleAddExperience}>
                Add
              </button>
            </div>
            
            {loading && <div className="modal-overlay">
              <div className="loader"></div>
            </div>}
          </Modal>
        )}
    </div>
  )
}

export default MainContent