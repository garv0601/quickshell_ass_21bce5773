import React from 'react';
import './Card.css'; // Import the CSS file
import TodoIcon from '../../icons_FEtask/To-do.svg';
import InProgressIcon from '../../icons_FEtask/in-progress.svg';
import BacklogIcon from '../../icons_FEtask/Backlog.svg';
import HighPriorityIcon from '../../icons_FEtask/Img - High Priority.svg';
import LowPriorityIcon from '../../icons_FEtask/Img - Low Priority.svg';
import MidPriorityIcon from '../../icons_FEtask/Img - Medium Priority.svg';
import NoPriorityIcon from '../../icons_FEtask/No-priority.svg';
import UrgentPriorityIcon from '../../icons_FEtask/SVG - Urgent Priority grey.svg';

const Card = ({ task }) => {
  const determineStatusIcon = (status) => {
    switch (status) {
      case 'Todo':
        return <img src={TodoIcon} alt="To-do" />;
      case 'In progress':
        return <img src={InProgressIcon} alt="In Progress" />;
      case 'Backlog':
        return <img src={BacklogIcon} alt="Backlog" />;
      default:
        return null;
    }
  };

  const determinePriorityIcon = (priority) => {
    switch (priority) {
      case 4:
        return <img src={UrgentPriorityIcon} alt="Urgent Priority" />;
      case 3:
        return <img src={HighPriorityIcon} alt="High Priority" />;
      case 2:
        return <img src={MidPriorityIcon} alt="Medium Priority" />;
      case 1:
        return <img src={LowPriorityIcon} alt="Low Priority" />;
      default:
        return <img src={NoPriorityIcon} alt="No Priority" />;
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="task-id">#{task.id}</span>
        {determineStatusIcon(task.status)}
      </div>

      <div className="card-body">
        <h4 className="task-title">{task.title}</h4>
      </div>

      <div className="card-footer">
        {determinePriorityIcon(task.priority)}
        <div className="tag-container">
          <div className="tag-circle" />
          <span className="task-tags">{task.tag.join(', ')}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
