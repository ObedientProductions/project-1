import './App.css';
import React, { useState, useRef } from 'react';

function App() {

  const [selectedHobby, setSelectedHobby] = useState(null);

  // Create an array of refs for the list items
  const listItemRefs = useRef([]);

  // Add a new ref for each list item
  const handleSelect = (hobby, index) => {
    // Optionally log the selected item and all the list items using refs
    console.log('Selected hobby:', hobby);
    console.log('All list items:', listItemRefs.current);

    if (selectedHobby === hobby) {
      setSelectedHobby(null); // Deselect if the same item is clicked
    } else {
      setSelectedHobby(hobby); // Select new item
    }
  };


  return (
    <div>
      <div id='Hobbies-Container'>
        <h1>HABBITS TRACKER</h1>
        <ul>
        {["🎨 Drawing", "📚 Reading", "🎮 Gaming", "🚴‍♂️ Cycling", "🎶 Playing Guitar"].map((hobby, index) => (
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

      <div id='Buttons-Container'>
        <button className='menu-button'><p>ADD</p></button>
        <button className='menu-button'><p>REMOVE</p></button>
      </div>
    </div>
  );
};

export default App;
