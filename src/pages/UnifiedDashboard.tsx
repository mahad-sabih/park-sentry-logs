
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, AlertCircle, Clock, CheckCircle, BarChart as BarChartIcon } from 'lucide-react';
import StatCard from '@/components/StatCard';
import StatusBadge from '@/components/StatusBadge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for car parks
const carParks = ['Overview', 'Virginia Water', 'Cranbourne', 'Savill Garden', 'Wick', 'Rangers'];

// Mock data for the dashboard
const mockData = {
  stats: {
    totalAssets: 39,
    healthyAssets: 21,
    faultyAssets: 12,
    overdueAssets: 6,
    maintenanceInProgress: 5
  },
  recentFaults: [
    {
      id: 'F32145',
      carPark: 'Virginia Water',
      equipment: 'POF 3',
      description: 'Display showing error code E45',
      status: 'Outstanding',
      date: '2023-04-12',
    },
    {
      id: 'F32141',
      carPark: 'Savill Garden',
      equipment: 'Entry 1',
      description: 'Barrier not raising fully',
      status: 'In Progress',
      date: '2023-04-10',
    },
    {
      id: 'F32137',
      carPark: 'Cranbourne',
      equipment: 'Exit 2',
      description: 'Card reader not accepting payments',
      status: 'Completed',
      date: '2023-04-08',
    },
    {
      id: 'F32135',
      carPark: 'Virginia Water South',
      equipment: 'POF 1',
      description: 'Coin acceptor jammed',
      status: 'Completed',
      date: '2023-04-07',
    },
  ],
  carParkData: {
    'Overview': { totalAssets: 39, healthyAssets: 21, faultyAssets: 12, overdueAssets: 6, inProgress: 5 },
    'Virginia Water': { totalAssets: 13, healthyAssets: 8, faultyAssets: 3, overdueAssets: 2, inProgress: 1 },
    'Cranbourne': { totalAssets: 8, healthyAssets: 4, faultyAssets: 2, overdueAssets: 1, inProgress: 1 },
    'Savill Garden': { totalAssets: 7, healthyAssets: 3, faultyAssets: 3, overdueAssets: 1, inProgress: 1 },
    'Wick': { totalAssets: 6, healthyAssets: 3, faultyAssets: 2, overdueAssets: 1, inProgress: 1 },
    'Rangers': { totalAssets: 5, healthyAssets: 3, faultyAssets: 2, overdueAssets: 0, inProgress: 1 }
  },
  equipment: {
    'Overview': [
      { type: 'Barrier Systems', total: 12, functional: 10, maintenance: 2 },
      { type: 'Payment Terminals', total: 16, functional: 14, faulty: 1, maintenance: 1 },
      { type: 'ANPR Cameras', total: 8, functional: 6, faulty: 2 }
    ],
    'Virginia Water': [
      { type: 'Barrier Systems', total: 4, functional: 3, maintenance: 1 },
      { type: 'Payment Terminals', total: 6, functional: 5, faulty: 1 },
      { type: 'ANPR Cameras', total: 3, functional: 2, faulty: 1 }
    ],
    'Cranbourne': [
      { type: 'Barrier Systems', total: 2, functional: 2 },
      { type: 'Payment Terminals', total: 3, functional: 3 },
      { type: 'ANPR Cameras', total: 2, functional: 1, faulty: 1 }
    ],
    'Savill Garden': [
      { type: 'Barrier Systems', total: 2, functional: 1, maintenance: 1 },
      { type: 'Payment Terminals', total: 3, functional: 2, maintenance: 1 },
      { type: 'ANPR Cameras', total: 1, functional: 1 }
    ],
    'Wick': [
      { type: 'Barrier Systems', total: 2, functional: 2 },
      { type: 'Payment Terminals', total: 2, functional: 2 },
      { type: 'ANPR Cameras', total: 1, functional: 1 }
    ],
    'Rangers': [
      { type: 'Barrier Systems', total: 2, functional: 2 },
      { type: 'Payment Terminals', total: 2, functional: 2 },
      { type: 'ANPR Cameras', total: 1, functional: 1 }
    ]
  },
  analytics: {
    'Overview': [
      { name: 'Jan', faults: 12 },
      { name: 'Feb', faults: 19 },
      { name: 'Mar', faults: 15 },
      { name: 'Apr', faults: 23 },
      { name: 'May', faults: 29 },
      { name: 'Jun', faults: 18 }
    ],
    'Virginia Water': [
      { name: 'Jan', faults: 5 },
      { name: 'Feb', faults: 8 },
      { name: 'Mar', faults: 6 },
      { name: 'Apr', faults: 10 },
      { name: 'May', faults: 12 },
      { name: 'Jun', faults: 7 }
    ],
    'Cranbourne': [
      { name: 'Jan', faults: 2 },
      { name: 'Feb', faults: 4 },
      { name: 'Mar', faults: 3 },
      { name: 'Apr', faults: 5 },
      { name: 'May', faults: 7 },
      { name: 'Jun', faults: 4 }
    ],
    'Savill Garden': [
      { name: 'Jan', faults: 3 },
      { name: 'Feb', faults: 4 },
      { name: 'Mar', faults: 3 },
      { name: 'Apr', faults: 4 },
      { name: 'May', faults: 5 },
      { name: 'Jun', faults: 3 }
    ],
    'Wick': [
      { name: 'Jan', faults: 1 },
      { name: 'Feb', faults: 2 },
      { name: 'Mar', faults: 2 },
      { name: 'Apr', faults: 3 },
      { name: 'May', faults: 3 },
      { name: 'Jun', faults: 2 }
    ],
    'Rangers': [
      { name: 'Jan', faults: 1 },
      { name: 'Feb', faults: 1 },
      { name: 'Mar', faults: 1 },
      { name: 'Apr', faults: 1 },
      { name: 'May', faults: 2 },
      { name: 'Jun', faults: 2 }
    ]
  }
};

const UnifiedDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [activeSection, setActiveSection] = useState('faults');
  
  // Get stats for the selected car park
  const currentStats = mockData.carParkData[activeTab as keyof typeof mockData.carParkData];
  
  // Filter faults based on the selected car park
  const filteredFaults = useMemo(() => {
    if (activeTab === 'Overview') {
      return mockData.recentFaults;
    }
    return mockData.recentFaults.filter(fault => fault.carPark === activeTab);
  }, [activeTab]);
  
  // Get equipment for the selected car park
  const currentEquipment = mockData.equipment[activeTab as keyof typeof mockData.equipment];
  
  // Get analytics data for the selected car park
  const currentAnalytics = mockData.analytics[activeTab as keyof typeof mockData.analytics];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            {activeTab === 'Overview' 
              ? 'Overview of all car parks' 
              : `Information for ${activeTab} car park`}
          </p>
        </div>
        <Button>
          <AlertCircle className="mr-2 h-4 w-4" />
          Report New Fault
        </Button>
      </div>

      {/* Car Park Tabs */}
      <Tabs defaultValue="Overview" onValueChange={setActiveTab} className="w-full">
        <TabsList className="h-10 mb-4 w-full justify-start">
          {carParks.map((carPark) => (
            <TabsTrigger
              key={carPark}
              value={carPark}
              className="px-4 py-2"
            >
              {carPark}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Stats Cards (shown for each tab) */}
        <TabsContent key={activeTab} value={activeTab} className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatCard
              title="Total Assets"
              value={currentStats.totalAssets}
              icon={<LayoutDashboard className="h-4 w-4 text-primary" />}
              description="All assets"
              className="animate-slide-up"
            />
            <StatCard
              title="Healthy Assets"
              value={currentStats.healthyAssets}
              icon={<CheckCircle className="h-4 w-4 text-success" />}
              description="Operational assets"
              className="animate-slide-up animation-delay-100"
            />
            <StatCard
              title="Faulty Assets"
              value={currentStats.faultyAssets}
              icon={<AlertCircle className="h-4 w-4 text-destructive" />}
              description="Equipment requiring attention"
              className="animate-slide-up animation-delay-200"
            />
            <StatCard
              title="Overdue Maintenance"
              value={currentStats.overdueAssets}
              icon={<Clock className="h-4 w-4 text-warning" />}
              description="Past scheduled maintenance"
              className="animate-slide-up animation-delay-300"
            />
            <StatCard
              title="In Progress"
              value={currentStats.inProgress}
              icon={<BarChartIcon className="h-4 w-4 text-info" />}
              description="Maintenance in progress"
              className="animate-slide-up animation-delay-400"
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Section Tabs for Faults, Equipment and Analytics */}
      <Tabs defaultValue="faults" onValueChange={setActiveSection} className="w-full">
        <TabsList className="bg-muted mb-6">
          <TabsTrigger value="faults">Fault Reports</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Faults Section */}
        <TabsContent value="faults" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {activeTab === 'Overview' 
                  ? 'Fault Reports Overview' 
                  : `Fault Reports for ${activeTab}`}
              </CardTitle>
              <CardDescription>
                {activeTab === 'Overview' 
                  ? 'All reported faults across car parks' 
                  : `Reported faults for ${activeTab} car park`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 border-b py-3 px-4 bg-muted/50">
                  <div className="col-span-1 font-medium text-sm">ID</div>
                  <div className="col-span-2 font-medium text-sm">Equipment</div>
                  <div className="col-span-3 font-medium text-sm">Fault Description</div>
                  <div className="col-span-2 font-medium text-sm">Carpark</div>
                  <div className="col-span-1 font-medium text-sm">Detection Date</div>
                  <div className="col-span-1 font-medium text-sm">Expected Resolution</div>
                  <div className="col-span-1 font-medium text-sm">Actual Resolution</div>
                  <div className="col-span-1 font-medium text-sm">Status</div>
                </div>
                {filteredFaults.length > 0 ? (
                  filteredFaults.map((fault) => (
                    <div key={fault.id} className="grid grid-cols-12 border-b py-3 px-4 hover:bg-muted/20 transition-colors">
                      <div className="col-span-1 text-sm font-medium text-primary">{fault.id}</div>
                      <div className="col-span-2 text-sm">{fault.equipment}</div>
                      <div className="col-span-3 text-sm truncate">{fault.description}</div>
                      <div className="col-span-2 text-sm">{fault.carPark}</div>
                      <div className="col-span-1 text-sm text-muted-foreground">{fault.date}</div>
                      <div className="col-span-1 text-sm text-muted-foreground">12/05/2023</div>
                      <div className="col-span-1 text-sm text-muted-foreground">14/05/2023</div>
                      <div className="col-span-1">
                        <StatusBadge status={fault.status as any} />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    No fault reports found for this car park
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Equipment Section */}
        <TabsContent value="equipment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === 'Overview' 
                  ? 'Equipment Overview' 
                  : `Equipment in ${activeTab}`}
              </CardTitle>
              <CardDescription>
                {activeTab === 'Overview' 
                  ? 'View and manage equipment inventory across all car parks' 
                  : `Equipment inventory for ${activeTab} car park`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {currentEquipment.map((equipment, index) => (
                  <Card key={`${equipment.type}-${index}`}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{equipment.type}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{equipment.total}</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {equipment.functional} functional
                        {equipment.faulty ? `, ${equipment.faulty} faulty` : ''}
                        {equipment.maintenance ? `, ${equipment.maintenance} in maintenance` : ''}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Section */}
        <TabsContent value="analytics" className="space-y-6">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {activeTab === 'Overview' 
                  ? 'Monthly Fault Trends Across All Car Parks' 
                  : `Monthly Fault Trends for ${activeTab}`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="faults" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UnifiedDashboard;
