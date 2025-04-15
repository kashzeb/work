import React, { useState } from 'react';



const Experiences = ({jobtitle, companyname, startDate, endDate, description, environment}) => {

  const [showModal, setShowModal] = useState(false);
  
  
  return (
    <div className='experience-wrapper'>
        <h3 className='job-title'>{jobtitle} - {companyname} - {startDate} - {endDate}</h3>
        <p className='description'>{description}</p>
        <p className='environment'><b>Environment</b>: {environment}</p>

        
    </div>
  )
}

export default Experiences