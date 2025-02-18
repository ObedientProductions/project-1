import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [selectedHobby, setSelectedHobby] = useState(null);
  const [hobbies, setHobbies] = useState([]);
  const [newHobby, setNewHobby] = useState("");

  // Create an array of refs for the list items
  const listItemRefs = useRef([]);
  const habbit_input = useRef();

  //default hobbies aka Habbits
  const defaultHobbies = [
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
  ];

  // Load hobbies from sessionStorage or use the default if not present
  useEffect(() => {
    const storedHobbies = sessionStorage.getItem('hobbies');
    if (storedHobbies) {
      setHobbies(JSON.parse(storedHobbies)); // Load stored hobbies
    } else {
      setHobbies(defaultHobbies); // Use default hobbies if nothing is stored
    }
  }, []);

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
    if (newHobby.trim()) {
      const updatedHobbies = [...hobbies, newHobby];
      setHobbies(updatedHobbies); // Add the new hobby to the list
      sessionStorage.setItem('hobbies', JSON.stringify(updatedHobbies)); // Store updated list in sessionStorage
      setNewHobby(""); // Clear the input field
    } else {
      if(habbit_input.current) {
        habbit_input.current.style.borderColor = 'red';
      }
    }
  };

  // Handle the REMOVE button click
  const handleRemove = () => {
    if (selectedHobby) {
      const updatedHobbies = hobbies.filter((hobby) => hobby !== selectedHobby);
      setHobbies(updatedHobbies); // Remove the selected hobby
      sessionStorage.setItem('hobbies', JSON.stringify(updatedHobbies)); // Update sessionStorage
      setSelectedHobby(null); // Deselect after removal
    }
  };

  // Update input value as the user types
  const handleInputChange = (event) => {
    setNewHobby(event.target.value); // Update the state with the current input value

    if(habbit_input.current) {
      habbit_input.current.style.borderColor = '#ffffff00'; // Change CSS
    }
  };

  return (
    <div>
      <div id="Hobbies-Container">
        <h1>HABBIT LIST</h1>
  
        {/* Render this if hobbies array is empty */}
        {hobbies.length === 0 ? (
          <h1 id='Empty-Message'>You have no habbits...</h1>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Habit</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {hobbies.map((hobby, index) => (
                <tr key={hobby}>
                  <td>
                    <li
                      ref={(el) => (listItemRefs.current[index] = el)} // Assign ref to each list item
                      onClick={() => handleSelect(hobby, index)}
                      className={selectedHobby === hobby ? 'selected' : ''}
                    >
                      {hobby}
                    </li>
                  </td>
                  
                  <td>{new Date().toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
  
      <div id='Habbit-Input'>
        <input 
          id="habit-input"
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
