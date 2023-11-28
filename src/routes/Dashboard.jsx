import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Dashboard() {
    const location = useLocation();
    const message = location.state?.message || 'No message received';
    console.log(message)
  return (
    <div>Dashboard</div>
  )
}
