import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [selectedHobby, setSelectedHobby] = useState(null);
  const [hobbies, setHobbies] = useState([
    "🧘‍♂️ Meditating", 
    "📅 Planning My Day", 
    "🏃‍♂️ Exercising", 
    "🍎 Eating Healthy", 
    "📚 Reading Daily"
  ]);
  
  const [newHobby, setNewHobby] = useState(""); // State for managing input value

  // Create an array of refs for the list items
  const listItemRefs = useRef([]);

  // Handle selecting a hobby
  const handleSelect = (hobby, index) => {
    if (selectedHobby === hobby) {
      setSelectedHobby(null); // Deselect if the same item is clicked
    } else {
      setSelectedHobby(hobby); // Select new item
    }
  };


  // Handle the ADD button click
  const handleAdd = () => {
    if (newHobby.trim()) { // Check if the input is not empty
      setHobbies([...hobbies, newHobby]); // Add the new hobby to the list
      setNewHobby(""); // Clear the input field
    } else {
      alert("Please enter a valid hobby.");
    }
  };

  // Handle the REMOVE button click
  const handleRemove = () => {
    if (selectedHobby) {
      setHobbies(hobbies.filter((hobby) => hobby !== selectedHobby)); // Remove the selected hobby
      setSelectedHobby(null); // Deselect after removal
    } else {
      alert("Please select a hobby to remove.");
    }
  };

    // Update input value as the user types
    const handleInputChange = (event) => {
      setNewHobby(event.target.value); // Update the state with the current input value
    };

  return (
    <div>
      <div id="Hobbies-Container">
        <h1>HABBITS TRACKER</h1>
        <ul>
          {hobbies.map((hobby, index) => (
            <li
              key={hobby}
              ref={(el) => (listItemRefs.current[index] = el)} // Assign ref to each list item
              onClick={() => handleSelect(hobby, index)}
              className={selectedHobby === hobby ? 'selected' : ''}
            >
              {hobby}
            </li>
          ))}
        </ul>
      </div>

      <div id='Habbit-Input'>
          <input 
          className='data-inputs' 
          type='text'
          value={newHobby}
          onChange={handleInputChange}
          placeholder='Enter a new Habbit...'
          ></input>
      </div>

      <div id="Buttons-Container">
        <button className="menu-button" onClick={handleAdd}>ADD</button>
        <button className="menu-button" onClick={handleRemove}>REMOVE</button>
      </div>
    </div>
  );
}

export default App;
