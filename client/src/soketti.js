import io from 'socket.io-client';

// const socket = io('http://localhost:3001');
const socket = io();

socket.on('connect', () => {
  console.log('connected');
});

export default socket;
