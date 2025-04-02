
import React, { useState } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatsGrid from '@/components/dashboard/StatsGrid';
import TabsSection from '@/components/dashboard/TabsSection';
import MonthlyFaultTrends from '@/components/dashboard/MonthlyFaultTrends';
import FaultsByLocation from '@/components/dashboard/FaultsByLocation';
import RecentFaults from '@/components/dashboard/RecentFaults';

// Mock data for the dashboard
const mockData = {
  stats: {
    totalFaults: 78,
    activeFaults: 23,
    resolvedFaults: 49,
    partsOrdered: 6,
  },
  recentFaults: [
    {
      id: 'F32145',
      carPark: 'Virginia Water',
      equipment: 'POF 3',
      description: 'Display showing error code E45',
      status: 'Outstanding',
      date: '2023-04-12',
      daysOpen: 18,
      overdueBy: 3,
      expectedResolution: '12/05/2023'
    },
    {
      id: 'F32141',
      carPark: 'Savill Garden',
      equipment: 'Entry 1',
      description: 'Barrier not raising fully',
      status: 'Parts Ordered',
      date: '2023-04-10',
      daysOpen: 20,
      expectedResolution: '12/05/2023'
    },
    {
      id: 'F32137',
      carPark: 'Cranbourne',
      equipment: 'Exit 2',
      description: 'Card reader not accepting payments',
      status: 'Completed',
      date: '2023-04-08',
      daysOpen: 5,
      expectedResolution: '12/05/2023'
    },
    {
      id: 'F32135',
      carPark: 'Virginia Water South',
      equipment: 'POF 1',
      description: 'Coin acceptor jammed',
      status: 'Completed',
      date: '2023-04-07',
      daysOpen: 3,
      expectedResolution: '12/05/2023'
    },
    {
      id: 'F32130',
      carPark: 'Wick',
      equipment: 'Entry 2',
      description: 'Ticket printer out of paper',
      status: 'Completed',
      date: '2023-04-05',
      daysOpen: 2,
      expectedResolution: '12/05/2023'
    },
  ],
  monthlyFaults: [
    { name: 'Jan', faults: 12 },
    { name: 'Feb', faults: 19 },
    { name: 'Mar', faults: 15 },
    { name: 'Apr', faults: 23 },
    { name: 'May', faults: 29 },
    { name: 'Jun', faults: 18 },
  ],
  carParkDistribution: [
    { name: 'Virginia Water', value: 32 },
    { name: 'Virginia Water South', value: 14 },
    { name: 'Savill Garden', value: 18 },
    { name: 'Wick', value: 8 },
    { name: 'Rangers', value: 10 },
    { name: 'Cranbourne', value: 16 },
  ],
};

const carParks = [
  'All',
  'Virginia Water',
  'Virginia Water South',
  'Savill Garden',
  'Wick',
  'Rangers',
  'Cranbourne',
];

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Fault Reports');
  
  return (
    <div className="space-y-6">
      <DashboardHeader />
      
      <StatsGrid stats={mockData.stats} />

  
      
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <MonthlyFaultTrends data={mockData.monthlyFaults} />
        <FaultsByLocation 
          data={mockData.carParkDistribution} 
          totalFaults={mockData.stats.totalFaults} 
        />
      </div>
      
      <RecentFaults 
        faults={mockData.recentFaults}
        carParks={carParks}
      />
    </div>
  );
};

export default Dashboard;
