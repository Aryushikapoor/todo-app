import axios from "axios";

const baseURL = "http://localhost:5000";

const getAllToDo = (setToDo) => {
  axios
    .get(baseURL)
    .then(({ data }) => {
      console.log('Received data from GET:', data);
      // Ensure data is an array
      if (Array.isArray(data)) {
        setToDo(data);
      } else {
        console.error('Data is not an array:', data);
        setToDo([]); // Default to an empty array if data is not in the expected format
      }
    })
    .catch((err) => {
      console.error('Error fetching todos:', err);
      setToDo([]); // Ensure state is handled even if there's an error
    });
};

const addToDo = (text, setText, setToDo) => {
  axios
    .post(`${baseURL}/save`, { text })
    .then(({ data }) => {
      console.log('Add response:', data);
      setText("");
      getAllToDo(setToDo);
    })
    .catch((err) => {
      console.error('Error adding todo:', err);
    });
};

const updateToDo = (toDoId, text, setText, setToDo, setIsUpdating) => {
    console.log('Updating:', toDoId, text);

    axios
    .post(`${baseURL}/update`, { _id: toDoId, text })
    .then(({ data }) => {
      console.log('Update response:', data);
      
      setText("");
    
      setIsUpdating(false);
     
      getAllToDo(setToDo);
    
    })
    .catch((err) => {
      console.error('Error updating todo:', err);
    });
};

const deleteToDo = (_id, setToDo) => {
  
    axios
      .post(`${baseURL}/delete`, { _id })
      .then(({ data }) => {
        console.log(data)
        
        getAllToDo(setToDo)
      
      })
      .catch((err) => {
        console.error('Error updating todo:', err);
      });
  };

export { getAllToDo, addToDo, updateToDo, deleteToDo };
