// src/RoomList.js
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000'); // Make sure this matches your server's URL

const RoomList = ({ setCurrentRoom }) => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState('');

  useEffect(() => {
    // Set up socket listeners when the component mounts
    socket.on('roomList', (roomArray) => {
      setRooms(roomArray); // Update room list when receiving updated room array
    });

    // Cleanup listener on component unmount
    return () => {
      socket.off('roomList'); // Remove the listener to prevent memory leaks
    };
  }, []); // Empty dependency array to run only once when component mounts

  const joinRoom = (room) => {
    setCurrentRoom(room);
    socket.emit('joinRoom', room);
  };

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (newRoom && newRoom.trim() !== '') {
      socket.emit('createRoom', newRoom); // Emit event to create room
      setNewRoom(''); // Clear the input field
    } else {
      alert("Room name cannot be empty!");
    }
  };

  return (
    <div>
      <h2>Available Rooms</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room}>
            <button onClick={() => joinRoom(room)}>{room}</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateRoom}>
        <input
          type="text"
          value={newRoom}
          onChange={(e) => setNewRoom(e.target.value)}
          placeholder="Enter room name"
          required
        />
        <button type="submit">Create Room</button>
      </form>
    </div>
  );
};

export default RoomList;
