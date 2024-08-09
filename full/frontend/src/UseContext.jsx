import { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState('');
  const [cuisines, setCuisines] = useState('');

  return (
    <AppContext.Provider value={{
      location,
      setLocation,
      rating,
      setRating,
      cuisines,
      setCuisines,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };