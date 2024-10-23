import React, { useState } from 'react';
import './Navbar.css'; // Import the CSS file
import Display from '../../icons_FEtask/Display.svg';
import Down from '../../icons_FEtask/down.svg';

function Navbar({ onGroupingChange, onOrderingChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [grouping, setGrouping] = useState('Status');
  const [ordering, setOrdering] = useState('Priority');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleGroupingChange = (event) => {
    const selectedValue = event.target.value;
    setGrouping(selectedValue);
    onGroupingChange(selectedValue); // Notify the Home component
  };

  const handleOrderingChange = (event) => {
    const selectedOrdering = event.target.value;
    setOrdering(selectedOrdering);
    onOrderingChange(selectedOrdering); // Notify the Home component
  };

  return (
    <div className="navbar-wrapper">
      <div style={{ position: 'relative' }}>
        <button className="button" onClick={toggleDropdown}>
          <img src={Display} alt="Display" />
          <span>Display</span>
          <img src={Down} alt="Down" />
        </button>

        {isOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-content">
              {/* Grouping Section */}
              <div className="dropdown-item">
                <label className="label">Grouping</label>
                <select
                  className="select"
                  onChange={handleGroupingChange}
                  value={grouping}
                >
                  <option>Status</option>
                  <option>User</option>
                  <option>Priority</option>
                </select>
              </div>

              {/* Ordering Section */}
              <div className="dropdown-item">
                <label className="label">Ordering</label>
                <select
                  className="select"
                  onChange={handleOrderingChange}
                  value={ordering}
                >
                  <option>Priority</option>
                  <option>Title</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
