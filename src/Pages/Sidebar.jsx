import React, { useEffect, useState } from 'react';
import  * as localForage from  "localforage";
import '../Sidebar.css';

// for getting initials
const getInitials = (name) => {
    const words = name.split(' ').filter(Boolean); 
    const initials = words.map(word => word[0].toUpperCase()).slice(0, 2); 
    return initials.join('');
};

// modal
export const Sidebar = ({ setActiveNote }) => { 
  const [notes, setNotes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

   // for saving data 
   useEffect(() => {
    localforage.getItem('notes')
        .then((storedNotes) => {
            if (storedNotes) {
                setNotes(storedNotes);
            }
        })
        .catch((error) => {
            console.error("Error loading stored notes", error);
        });
    }, []);

// Save notes through localforage 
useEffect(() => {
    if (notes.length > 0) {
        localforage.setItem('notes', notes)
            .catch((error) => {
                console.error("Error saving notes", error);
            });
    }
}, [notes]);



  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setGroupName('');
    setSelectedColor('');
  };

  const createGroup = () => {
    if (groupName && selectedColor) {
      setNotes([...notes, { name: groupName, color: selectedColor }]);
      closeModal();
    } else {
      alert('Please enter a group name and choose a color');
    }
  };

  // click track
  const handleNoteClick = (note) => {
    console.log(note); 
    setActiveNote(note); 
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h2>Pocket Notes</h2>
      </div>

      <div className="notes-list">
        {notes.map((note, index) => (
          <div key={index} className="note-group" onClick={() => handleNoteClick(note)}>
            <div className="note-group-content">
              <div className="note-group-circle" style={{ backgroundColor: note.color }}>
                {getInitials(note.name)}
              </div>
              <h3 className="note-group-title">{note.name}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="add-note-button" onClick={openModal}>
        <img src="./addimg.png" alt="Add Note" className="add-btn-img" />
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Note Group</h2>

            <label style={{ display: 'flex', alignItems: 'center' }}>
              Group Name:
              <input className="input-bar" type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="Enter group name"/>
            </label>

            <div className="color-options">
              <label style={{ display: 'flex', alignItems: 'center' }}>
                Choose Color:
                <div className="color-buttons">
                  {['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'].map(color => (
                    <button
                      key={color}
                      className={`color-button ${selectedColor === color ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </label>
            </div>

            <div className="modal-actions">
              <button className="create-button" onClick={createGroup}>Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
