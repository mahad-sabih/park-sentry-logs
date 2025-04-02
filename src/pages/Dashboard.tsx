
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart as BarChartIcon, 
  AlertCircle, 
  CheckCircle, 
  Filter,
  Package
} from 'lucide-react';
import StatCard from '@/components/StatCard';
import StatusBadge from '@/components/StatusBadge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";

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
  const [selectedCarPark, setSelectedCarPark] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('Fault Reports');
  
  // Filter function for recent faults
  const filteredFaults = selectedCarPark && selectedCarPark !== 'All'
    ? mockData.recentFaults.filter(fault => fault.carPark === selectedCarPark)
    : mockData.recentFaults;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <Button>
          <AlertCircle className="mr-2 h-4 w-4" />
          Report New Fault
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Faults" 
          value={mockData.stats.totalFaults} 
          icon={<BarChartIcon className="h-4 w-4 text-primary" />}
          description="All time recorded faults"
          className="animate-slide-up"
        />
        <StatCard 
          title="Active Faults" 
          value={mockData.stats.activeFaults} 
          icon={<AlertCircle className="h-4 w-4 text-destructive" />}
          description="Faults requiring attention"
          change={{ value: 5, positive: false }}
          className="animate-slide-up animation-delay-100"
        />
        <StatCard 
          title="Parts Ordered" 
          value={mockData.stats.partsOrdered} 
          icon={<Package className="h-4 w-4 text-warning" />}
          description="Waiting for delivery"
          className="animate-slide-up animation-delay-200"
        />
        <StatCard 
          title="Resolved This Month" 
          value={mockData.stats.resolvedFaults} 
          icon={<CheckCircle className="h-4 w-4 text-success" />}
          description="Successfully fixed"
          change={{ value: 12, positive: true }}
          className="animate-slide-up animation-delay-300"
        />
      </div>

      <Card>
        <CardHeader className="pb-0">
          <Tabs defaultValue="Fault Reports" className="w-full" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="Fault Reports">Fault Reports</TabsTrigger>
              <TabsTrigger value="Equipment">Equipment</TabsTrigger>
              <TabsTrigger value="Analytics">Analytics</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <Card className="col-span-1 lg:col-span-4 animate-scale-in animation-delay-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Monthly Fault Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.monthlyFaults}>
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
        
        <Card className="col-span-1 lg:col-span-3 animate-scale-in animation-delay-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Faults by Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.carParkDistribution.map((carPark, index) => (
                <div key={carPark.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{carPark.name}</span>
                    <span className="text-sm text-muted-foreground">{carPark.value}</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary"
                      style={{ width: `${(carPark.value / mockData.stats.totalFaults) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="animate-scale-in animation-delay-400">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Recent Faults</CardTitle>
              <CardDescription>Latest reported faults across car parks</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Filter:</span>
              <Filter className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-wrap space-x-1">
                {carParks.map((carPark) => (
                  <Button
                    key={carPark}
                    variant={selectedCarPark === carPark ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedCarPark(carPark)}
                    className="text-xs h-7 px-2"
                  >
                    {carPark}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Reference</TableHead>
                  <TableHead>Car Park</TableHead>
                  <TableHead>Equipment</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFaults.map((fault) => (
                  <TableRow key={fault.id}>
                    <TableCell className="font-medium text-primary">{fault.id}</TableCell>
                    <TableCell>{fault.carPark}</TableCell>
                    <TableCell>{fault.equipment}</TableCell>
                    <TableCell>{fault.description}</TableCell>
                    <TableCell>
                      <StatusBadge status={fault.status as any} />
                    </TableCell>
                    <TableCell>{fault.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="outline" size="sm">
              View All Faults
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
