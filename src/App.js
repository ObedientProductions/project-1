import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [selectedHobby, setSelectedHobby] = useState(null);
  const [hobbies, setHobbies] = useState([
    "🐌 Threatening a snail", 
    "🪞 Offering a chair to your reflection", 
    "🥿 Writing a letter to your left shoe", 
    "🔆 Staring at a lamp and telling it it's not bright enough", 
    "🪨 Trying to teach a rock how to roll", 
    "🌿 Giving your houseplant a pep talk", 
    "✏️ Arguing with a pencil about its purpose", 
    "🧱 Complimenting a wall on its stability", 
    "🥄 Apologizing to a spoon for not using it enough", 
    "🌑 Pretending your shadow has feelings and apologizing for stepping on it"
  ]);
  
  const [newHobby, setNewHobby] = useState("");

  // Create an array of refs for the list items
  const listItemRefs = useRef([]);

  const habbit_input = useRef();

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
      
      if(habbit_input.current)
        {
          habbit_input.current.style.borderColor = 'red';
        }
    }
  };

  // Handle the REMOVE button click
  const handleRemove = () => {
    if (selectedHobby) {
      setHobbies(hobbies.filter((hobby) => hobby !== selectedHobby)); // Remove the selected hobby
      setSelectedHobby(null); // Deselect after removal
    }
  };

  // Update input value as the user types
  const handleInputChange = (event) => {
    setNewHobby(event.target.value); // Update the state with the current input value

    if(habbit_input.current)
      {
        habbit_input.current.style.borderColor = '#ffffff00'; // Change CSS
      }
  };

  return (
    <div>
      <div id="Hobbies-Container">
        <h1>HABBIT TRACKER</h1>
        
        {/* Render this if hobbies array is empty */}
        {hobbies.length === 0 ? (
          <h1 id='Empty-Message'>You have no habbits...</h1>
        ) : (
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
        )}
      </div>

      <div id='Habbit-Input'>
        <input 
          className='data-inputs' 
          type='text'
          value={newHobby}
          onChange={handleInputChange}
          placeholder='Enter a new Habbit...'
          ref={habbit_input}
        />
      </div>

      <div id="Buttons-Container">
        <button className="menu-button" onClick={handleAdd}><p>ADD</p></button>
        <button className="menu-button" onClick={handleRemove}><p>REMOVE</p></button>
      </div>
    </div>
  );
}

export default App;
