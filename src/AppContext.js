import React, {createContext, useState} from 'react'
import axios from 'axios';

export const AppContext = createContext();

export function AppProvider({ children }){

    const storedUser = localStorage.getItem('user');
    const[user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    

    const loginUser = (userData) => {
        setUser(userData)
        console.log("loginUser")
    }

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem('user')
    };


    const handleLogin = async (username, password) => {
        
        setIsLoading(true)
        try {
          const response = await axios.get(
            `https://sheetdb.io/api/v1/sk7vfec73px3p/search?username=${username}&password=${password}`
          );
          
          const userData = response.data;

          console.log(userData)
    
      
          if (userData.length > 0) {
            loginUser(userData[0]);  // Pass user to parent or store in state
            localStorage.setItem('user', JSON.stringify(userData[0])); // Store user data
            // setShowModal(false)        // Close modal
            setSuccess('Logged in successfully')
            setError('')
            setIsLoading(false)
          } else {
            setError('Invalid username or password');
            setSuccess('')
            setIsLoading(false)
          }
        } catch (err) {
          console.error(err);
          setError('Error logging in');
          setIsLoading(false)
        }
      };

    // Value object to be provided to consuming components
    const value = {user, error, success, isLoading, loginUser, logoutUser, handleLogin};
  return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
  )
}