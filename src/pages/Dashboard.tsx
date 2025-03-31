
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  BarChart as BarChartIcon, 
  AlertCircle, 
  Clock, 
  CheckCircle, 
  Filter, 
  Package,
  Search,
  X
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StatCard from '@/components/StatCard';
import StatusBadge from '@/components/StatusBadge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
    },
    {
      id: 'F32141',
      carPark: 'Savill Garden',
      equipment: 'Entry 1',
      description: 'Barrier not raising fully',
      status: 'Parts Ordered',
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
    {
      id: 'F32130',
      carPark: 'Wick',
      equipment: 'Entry 2',
      description: 'Ticket printer out of paper',
      status: 'Completed',
      date: '2023-04-05',
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

// List of unique car parks for filtering
const carParks = ['Virginia Water', 'Virginia Water South', 'Savill Garden', 'Wick', 'Rangers', 'Cranbourne'];

// List of statuses for filtering
const statuses = ['Outstanding', 'Parts Ordered', 'Completed'];

const Dashboard: React.FC = () => {
  const [selectedCarPark, setSelectedCarPark] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter function for recent faults
  const filteredFaults = mockData.recentFaults.filter(fault => {
    const matchesCarPark = selectedCarPark ? fault.carPark === selectedCarPark : true;
    const matchesStatus = selectedStatus ? fault.status === selectedStatus : true;
    const matchesSearch = searchQuery 
      ? fault.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
        fault.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fault.equipment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fault.carPark.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    return matchesCarPark && matchesStatus && matchesSearch;
  });

  // Function to reset filters
  const resetFilters = () => {
    setSelectedCarPark(null);
    setSelectedStatus(null);
    setSearchQuery('');
  };

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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 animate-scale-in animation-delay-200">
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
        
        <Card className="animate-scale-in animation-delay-300">
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
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <CardTitle className="text-lg">Recent Faults</CardTitle>
            
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search faults..."
                  className="pl-9 w-full md:w-[200px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="h-10 gap-1"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                Filters
                {(selectedCarPark || selectedStatus) && (
                  <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                    {(selectedCarPark ? 1 : 0) + (selectedStatus ? 1 : 0)}
                  </span>
                )}
              </Button>
              
              {(selectedCarPark || selectedStatus || searchQuery) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="h-10"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>
          
          {showFilters && (
            <div className="mt-4 flex flex-wrap gap-4 pt-4 border-t">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Car Park</span>
                <Select 
                  value={selectedCarPark || ""}
                  onValueChange={(value) => setSelectedCarPark(value !== "all" ? value : null)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Car Parks" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Car Parks</SelectItem>
                    {carParks.map((carPark) => (
                      <SelectItem key={carPark} value={carPark}>
                        {carPark}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Status</span>
                <Select 
                  value={selectedStatus || ""}
                  onValueChange={(value) => setSelectedStatus(value !== "all" ? value : null)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-12 border-b py-3 px-4 bg-muted/50">
              <div className="col-span-2 font-medium text-sm">Reference</div>
              <div className="col-span-2 font-medium text-sm">Car Park</div>
              <div className="col-span-2 font-medium text-sm">Equipment</div>
              <div className="col-span-3 font-medium text-sm">Description</div>
              <div className="col-span-2 font-medium text-sm">Status</div>
              <div className="col-span-1 font-medium text-sm">Date</div>
            </div>
            {filteredFaults.length > 0 ? (
              filteredFaults.map((fault) => (
                <div key={fault.id} className="grid grid-cols-12 border-b py-3 px-4 hover:bg-muted/20 transition-colors">
                  <div className="col-span-2 text-sm font-medium text-primary">{fault.id}</div>
                  <div className="col-span-2 text-sm">{fault.carPark}</div>
                  <div className="col-span-2 text-sm">{fault.equipment}</div>
                  <div className="col-span-3 text-sm truncate">{fault.description}</div>
                  <div className="col-span-2">
                    <StatusBadge status={fault.status as any} />
                  </div>
                  <div className="col-span-1 text-sm text-muted-foreground">{fault.date}</div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                No faults found matching your filters.
              </div>
            )}
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
