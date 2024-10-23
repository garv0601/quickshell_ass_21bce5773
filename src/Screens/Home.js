import React, { useEffect, useState } from 'react';
import './Home.css';
import Card from './components/Card';
import addIcon from '../icons_FEtask/add.svg';
import menuIcon from '../icons_FEtask/3 dot menu.svg';
import Navbar from './components/Navbar';
import TodoIcon from '../icons_FEtask/To-do.svg';
import InProgressIcon from '../icons_FEtask/in-progress.svg';
import BacklogIcon from '../icons_FEtask/Backlog.svg';
import HighPriorityIcon from '../icons_FEtask/Img - High Priority.svg';
import MidPriorityIcon from '../icons_FEtask/Img - Medium Priority.svg';
import LowPriorityIcon from '../icons_FEtask/Img - Low Priority.svg';
import UrgentIcon from '../icons_FEtask/SVG - Urgent Priority grey.svg';
import NoPriorityIcon from '../icons_FEtask/No-priority.svg';

const Home = () => {
  const [data, setData] = useState({ tickets: [], users: [] });
  const [grouping, setGrouping] = useState('Status');
  const [ordering, setOrdering] = useState('Priority');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const organizeTickets = (criterion) => {
    if (criterion === 'User') {
      return data.users.map((user) => ({
        user,
        tickets: data.tickets.filter((ticket) => ticket.userId === user.id),
      }));
    } else if (criterion === 'Priority') {
      const priorities = [...new Set(data.tickets.map((ticket) => ticket.priority))];
      return priorities.map((priority) => ({
        priority,
        tickets: data.tickets.filter((ticket) => ticket.priority === priority),
      }));
    } else {
      const statuses = [...new Set(data.tickets.map((ticket) => ticket.status))];
      return statuses.map((status) => ({
        status,
        tickets: data.tickets.filter((ticket) => ticket.status === status),
      }));
    }
  };

  const arrangeTickets = (tickets) => {
    if (ordering === 'Title') {
      return tickets.sort((a, b) => a.title.localeCompare(b.title));
    } else if (ordering === 'Priority') {
      return tickets.sort((a, b) => b.priority - a.priority);
    }
    return tickets;
  };

  const groupedTickets = organizeTickets(grouping).map((group) => ({
    ...group,
    tickets: arrangeTickets(group.tickets),
  }));

  const renderStatusIcon = (status) => {
    switch (status) {
      case 'Todo':
        return <img src={TodoIcon} alt="Todo" />;
      case 'In progress':
        return <img src={InProgressIcon} alt="In Progress" />;
      case 'Backlog':
        return <img src={BacklogIcon} alt="Backlog" />;
      default:
        return null;
    }
  };

  const renderPriorityIcon = (priority) => {
    switch (priority) {
      case 3:
        return <img src={HighPriorityIcon} alt="High Priority" />;
      case 2:
        return <img src={MidPriorityIcon} alt="Medium Priority" />;
      case 1:
        return <img src={LowPriorityIcon} alt="Low Priority" />;
      case 4:
        return <img src={UrgentIcon} alt="Urgent Priority" />;
      default:
        return <img src={NoPriorityIcon} alt="No Priority" />;
    }
  };

  return (
    <div>
      <Navbar onGroupingChange={setGrouping} onOrderingChange={setOrdering} />
      <div className="page-container">
        <div className="ticket-grid">
          {groupedTickets.map((group, idx) => (
            <div className="group-column" key={idx}>
              <div className="header">
                <div className="header-details">
                  <div className="icon-holder">
                    {grouping === 'User' ? (
                      <div className="user-circle" />
                    ) : grouping === 'Priority' ? (
                      renderPriorityIcon(group.priority)
                    ) : (
                      renderStatusIcon(group.status)
                    )}
                  </div>
                  <h3>
                    {grouping === 'User'
                      ? `${group.user.name} `
                      : grouping === 'Priority'
                      ? `${group.priority === 4 ? 'Urgent' : group.priority === 3 ? 'High' : group.priority === 2 ? 'Medium' : group.priority === 1 ? 'Low' : 'No Priority'} `
                      : `${group.status} `}
                  </h3>
                </div>
                <div className="action-icons">
                  <img className="action-icon" src={menuIcon} alt="Options" />
                  <img className="action-icon" src={addIcon} alt="Add task" />
                </div>
              </div>

              <div className="ticket-list">
                {group.tickets.map((ticket) => (
                  <Card key={ticket.id} task={ticket} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
