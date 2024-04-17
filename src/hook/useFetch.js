import { useState, useEffect, useContext } from 'react';
// import { LoginContext } from '../context/LoginContext';

const useFetch = (url) => {
    // const { 
    //     setLoading,
    //     setError,
    //     setSuccess,
    // } = useContext( LoginContext )

  const [data, setData] = useState(null);

  const fetchData = async () => {
    // setLoading(true);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
    //   setError(true);
    } finally {
    //   setLoading(false);
    }
  };

  fetchData();

  return { data };
};

export default useFetch;