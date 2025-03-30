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
} from 'lucide-react';
import StatCard from '@/components/StatCard';
import StatusBadge from '@/components/StatusBadge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  equipment: [
    { 
      id: 'E001',
      name: 'POF 1', 
      type: 'POF', 
      carPark: 'Virginia Water',
      status: 'Operational', 
      lastMaintenance: '2023-03-15' 
    },
    { 
      id: 'E002',
      name: 'Entry 2', 
      type: 'Entry', 
      carPark: 'Virginia Water',
      status: 'Needs Attention', 
      lastMaintenance: '2023-02-20' 
    },
    { 
      id: 'E003',
      name: 'Exit 1', 
      type: 'Exit', 
      carPark: 'Savill Garden',
      status: 'Operational', 
      lastMaintenance: '2023-04-01' 
    },
    { 
      id: 'E004',
      name: 'POF 2', 
      type: 'POF', 
      carPark: 'Cranbourne',
      status: 'Under Repair', 
      lastMaintenance: '2023-01-10' 
    },
    { 
      id: 'E005',
      name: 'Entry 1', 
      type: 'Entry', 
      carPark: 'Wick',
      status: 'Operational', 
      lastMaintenance: '2023-03-22' 
    },
  ],
};

// Constants for filter options
const carParks = ['Virginia Water', 'Virginia Water South', 'Savill Garden', 'Wick', 'Rangers', 'Cranbourne'];
const statuses = ['Outstanding', 'Parts Ordered', 'Completed'];
const equipmentTypes = ['POF', 'Entry', 'Exit'];

const Dashboard: React.FC = () => {
  // Original state
  const [selectedCarPark, setSelectedCarPark] = useState<string | null>(null);
  
  // New states for filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // New states for equipment filtering
  const [equipmentSearchQuery, setEquipmentSearchQuery] = useState('');
  const [equipmentTypeFilter, setEquipmentTypeFilter] = useState<string | null>(null);
  const [equipmentCarParkFilter, setEquipmentCarParkFilter] = useState<string | null>(null);
  
  // Filter function for recent faults using useMemo for better performance
  const filteredFaults = useMemo(() => {
    return mockData.recentFaults.filter(fault => {
      // Match selected car park
      const matchesSelectedCarPark = selectedCarPark ? fault.carPark === selectedCarPark : true;
      
      // Match search query
      const matchesSearch = searchQuery 
        ? fault.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
          fault.equipment.toLowerCase().includes(searchQuery.toLowerCase()) || 
          fault.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      
      // Match status filter
      const matchesStatus = statusFilter ? fault.status === statusFilter : true;
      
      return matchesSelectedCarPark && matchesSearch && matchesStatus;
    });
  }, [selectedCarPark, searchQuery, statusFilter]);
  
  // Filter function for equipment
  const filteredEquipment = useMemo(() => {
    return mockData.equipment.filter(item => {
      // Match search query
      const matchesSearch = equipmentSearchQuery 
        ? item.name.toLowerCase().includes(equipmentSearchQuery.toLowerCase()) || 
          item.type.toLowerCase().includes(equipmentSearchQuery.toLowerCase())
        : true;
      
      // Match equipment type filter
      const matchesType = equipmentTypeFilter ? item.type === equipmentTypeFilter : true;
      
      // Match car park filter
      const matchesCarPark = equipmentCarParkFilter ? item.carPark === equipmentCarParkFilter : true;
      
      return matchesSearch && matchesType && matchesCarPark;
    });
  }, [equipmentSearchQuery, equipmentTypeFilter, equipmentCarParkFilter]);

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
      
      {/* Fault Reports Card with Enhanced Filtering */}
      <Card className="animate-scale-in animation-delay-400">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Recent Faults</CardTitle>
            <Button variant="outline" size="sm">
              View All Faults
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Enhanced filtering options */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search faults..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground mr-2">Filter:</span>
              <Select value={statusFilter || ''} onValueChange={(value) => setStatusFilter(value || null)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedCarPark || ''} onValueChange={(value) => setSelectedCarPark(value || null)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Car Park" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Car Parks</SelectItem>
                  {carParks.map((carPark) => (
                    <SelectItem key={carPark} value={carPark}>{carPark}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

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
                No fault reports found matching your criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Equipment Card with Filtering */}
      <Card className="animate-scale-in animation-delay-500">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Equipment</CardTitle>
            <Button variant="outline" size="sm">
              View All Equipment
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Equipment filtering options */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search equipment..."
                className="pl-9"
                value={equipmentSearchQuery}
                onChange={(e) => setEquipmentSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground mr-2">Filter:</span>
              <Select value={equipmentTypeFilter || ''} onValueChange={(value) => setEquipmentTypeFilter(value || null)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  {equipmentTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={equipmentCarParkFilter || ''} onValueChange={(value) => setEquipmentCarParkFilter(value || null)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Car Park" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Car Parks</SelectItem>
                  {carParks.map((carPark) => (
                    <SelectItem key={carPark} value={carPark}>{carPark}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <div className="grid grid-cols-12 border-b py-3 px-4 bg-muted/50">
              <div className="col-span-1 font-medium text-sm">ID</div>
              <div className="col-span-2 font-medium text-sm">Name</div>
              <div className="col-span-2 font-medium text-sm">Type</div>
              <div className="col-span-3 font-medium text-sm">Car Park</div>
              <div className="col-span-2 font-medium text-sm">Status</div>
              <div className="col-span-2 font-medium text-sm">Last Maintenance</div>
            </div>
            {filteredEquipment.length > 0 ? (
              filteredEquipment.map((equipment) => (
                <div key={equipment.id} className="grid grid-cols-12 border-b py-3 px-4 hover:bg-muted/20 transition-colors">
                  <div className="col-span-1 text-sm font-medium text-primary">{equipment.id}</div>
                  <div className="col-span-2 text-sm">{equipment.name}</div>
                  <div className="col-span-2 text-sm">{equipment.type}</div>
                  <div className="col-span-3 text-sm">{equipment.carPark}</div>
                  <div className="col-span-2 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      equipment.status === 'Operational' ? 'bg-green-100 text-green-800' :
                      equipment.status === 'Needs Attention' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {equipment.status}
                    </span>
                  </div>
                  <div className="col-span-2 text-sm text-muted-foreground">{equipment.lastMaintenance}</div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                No equipment found matching your criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
