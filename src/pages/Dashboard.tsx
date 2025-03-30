
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart as BarChartIcon, 
  AlertCircle, 
  Clock, 
  CheckCircle, 
  Filter, 
  Package,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
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
      reportedBy: 'JD',
      daysOpen: 18,
      overdueBy: 3
    },
    {
      id: 'F32141',
      carPark: 'Savill Garden',
      equipment: 'Entry 1',
      description: 'Barrier not raising fully',
      status: 'Parts Ordered',
      date: '2023-04-10',
      reportedBy: 'KA',
      daysOpen: 20
    },
    {
      id: 'F32137',
      carPark: 'Cranbourne',
      equipment: 'Exit 2',
      description: 'Card reader not accepting payments',
      status: 'Completed',
      date: '2023-04-08',
      reportedBy: 'TS',
      daysOpen: 5
    },
    {
      id: 'F32135',
      carPark: 'Virginia Water South',
      equipment: 'POF 1',
      description: 'Coin acceptor jammed',
      status: 'Completed',
      date: '2023-04-07',
      reportedBy: 'JD',
      daysOpen: 3
    },
    {
      id: 'F32130',
      carPark: 'Wick',
      equipment: 'Entry 2',
      description: 'Ticket printer out of paper',
      status: 'Completed',
      date: '2023-04-05',
      reportedBy: 'KA',
      daysOpen: 2
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
  equipmentList: [
    {
      id: 'eq1',
      name: 'POF 1',
      type: 'POF',
      carPark: 'Virginia Water',
      location: 'Main building',
      status: 'Operational',
    },
    {
      id: 'eq2',
      name: 'POF 2',
      type: 'POF',
      carPark: 'Virginia Water',
      location: 'Near exit',
      status: 'Operational',
    },
    {
      id: 'eq3',
      name: 'Entry 1',
      type: 'Entry',
      carPark: 'Virginia Water',
      location: 'Main entrance',
      status: 'Needs Attention',
    },
    {
      id: 'eq4',
      name: 'Exit 2',
      type: 'Exit',
      carPark: 'Savill Garden',
      location: 'Secondary exit',
      status: 'Operational',
    },
    {
      id: 'eq5',
      name: 'POF 1',
      type: 'POF',
      carPark: 'Cranbourne',
      location: 'Main building',
      status: 'Operational',
    },
  ],
};

// Equipment types and car parks for filters
const equipmentTypes = ['POF', 'Entry', 'Exit'];
const carParks = [
  'Virginia Water',
  'Virginia Water South',
  'Savill Garden',
  'Wick',
  'Rangers',
  'Cranbourne',
];

const statuses = ['Outstanding', 'Parts Ordered', 'Completed'];

const Dashboard: React.FC = () => {
  const [selectedCarPark, setSelectedCarPark] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // For fault reports filtering
  const [faultCarParkFilter, setFaultCarParkFilter] = useState<string | null>(null);
  const [faultStatusFilter, setFaultStatusFilter] = useState<string | null>(null);
  const [faultSearchQuery, setFaultSearchQuery] = useState('');
  
  // For equipment filtering
  const [equipmentCarParkFilter, setEquipmentCarParkFilter] = useState<string | null>(null);
  const [equipmentTypeFilter, setEquipmentTypeFilter] = useState<string | null>(null);
  const [equipmentSearchQuery, setEquipmentSearchQuery] = useState('');
  
  // For fault details dialog
  const [selectedFault, setSelectedFault] = useState<any | null>(null);
  const [isAddEquipmentDialogOpen, setIsAddEquipmentDialogOpen] = useState(false);
  
  // Filter function for recent faults
  const filteredFaults = mockData.recentFaults.filter((fault) => {
    const matchesCarPark = faultCarParkFilter ? fault.carPark === faultCarParkFilter : true;
    const matchesStatus = faultStatusFilter ? fault.status === faultStatusFilter : true;
    const matchesSearch = faultSearchQuery 
      ? fault.id.toLowerCase().includes(faultSearchQuery.toLowerCase()) || 
        fault.description.toLowerCase().includes(faultSearchQuery.toLowerCase()) ||
        fault.equipment.toLowerCase().includes(faultSearchQuery.toLowerCase())
      : true;
    
    return matchesCarPark && matchesStatus && matchesSearch;
  });
  
  // Filter function for equipment
  const filteredEquipment = mockData.equipmentList.filter((equipment) => {
    const matchesCarPark = equipmentCarParkFilter ? equipment.carPark === equipmentCarParkFilter : true;
    const matchesType = equipmentTypeFilter ? equipment.type === equipmentTypeFilter : true;
    const matchesSearch = equipmentSearchQuery 
      ? equipment.name.toLowerCase().includes(equipmentSearchQuery.toLowerCase()) || 
        equipment.location.toLowerCase().includes(equipmentSearchQuery.toLowerCase())
      : true;
    
    return matchesCarPark && matchesType && matchesSearch;
  });

  // For car park distribution chart
  const filteredCarParks = selectedCarPark 
    ? mockData.carParkDistribution.filter(cp => cp.name === selectedCarPark)
    : mockData.carParkDistribution;

  const handleViewFault = (fault: any) => {
    setSelectedFault(fault);
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
              {filteredCarParks.map((carPark, index) => (
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
            <CardTitle className="text-lg">Recent Faults</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Fault filtering controls */}
          <div className="flex flex-col md:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by reference, description or equipment..."
                className="pl-9"
                value={faultSearchQuery}
                onChange={(e) => setFaultSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground mr-2">Filter:</span>
              <Select value={faultCarParkFilter || ''} onValueChange={(value) => setFaultCarParkFilter(value || null)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Car Park" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Car Parks</SelectItem>
                  {carParks.map((carPark) => (
                    <SelectItem key={carPark} value={carPark}>
                      {carPark}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={faultStatusFilter || ''} onValueChange={(value) => setFaultStatusFilter(value || null)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
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
              <div className="col-span-1 font-medium text-sm">Days Open</div>
              <div className="col-span-2 font-medium text-sm">Status</div>
            </div>
            {filteredFaults.map((fault) => (
              <div 
                key={fault.id} 
                className="grid grid-cols-12 border-b py-3 px-4 hover:bg-muted/20 transition-colors cursor-pointer"
                onClick={() => handleViewFault(fault)}
              >
                <div className="col-span-2 text-sm font-medium text-primary">{fault.id}</div>
                <div className="col-span-2 text-sm">{fault.carPark}</div>
                <div className="col-span-2 text-sm">{fault.equipment}</div>
                <div className="col-span-3 text-sm truncate">{fault.description}</div>
                <div className="col-span-1 text-sm">
                  {fault.daysOpen} {fault.overdueBy && (
                    <span className="text-destructive font-medium">+{fault.overdueBy}</span>
                  )}
                </div>
                <div className="col-span-2">
                  <StatusBadge status={fault.status as any} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="outline" size="sm">
              View All Faults
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Equipment Section */}
      <Card className="animate-scale-in animation-delay-500">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Equipment Overview</CardTitle>
            <Button size="sm" onClick={() => setIsAddEquipmentDialogOpen(true)}>
              <Package className="mr-2 h-4 w-4" />
              Add Equipment
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Equipment filtering controls */}
          <div className="flex flex-col md:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search equipment..."
                className="pl-9"
                value={equipmentSearchQuery}
                onChange={(e) => setEquipmentSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground mr-2">Filter:</span>
              <Select value={equipmentCarParkFilter || ''} onValueChange={(value) => setEquipmentCarParkFilter(value || null)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Car Park" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Car Parks</SelectItem>
                  {carParks.map((carPark) => (
                    <SelectItem key={carPark} value={carPark}>
                      {carPark}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={equipmentTypeFilter || ''} onValueChange={(value) => setEquipmentTypeFilter(value || null)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  {equipmentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border">
            <div className="grid grid-cols-12 border-b py-3 px-4 bg-muted/50">
              <div className="col-span-2 font-medium text-sm">Name</div>
              <div className="col-span-2 font-medium text-sm">Type</div>
              <div className="col-span-2 font-medium text-sm">Car Park</div>
              <div className="col-span-3 font-medium text-sm">Location</div>
              <div className="col-span-3 font-medium text-sm">Status</div>
            </div>
            {filteredEquipment.map((equipment) => (
              <div 
                key={equipment.id} 
                className="grid grid-cols-12 border-b py-3 px-4 hover:bg-muted/20 transition-colors cursor-pointer"
              >
                <div className="col-span-2 text-sm font-medium text-primary">{equipment.name}</div>
                <div className="col-span-2 text-sm">{equipment.type}</div>
                <div className="col-span-2 text-sm">{equipment.carPark}</div>
                <div className="col-span-3 text-sm truncate">{equipment.location}</div>
                <div className="col-span-3 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    equipment.status === 'Operational' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                  }`}>
                    {equipment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="outline" size="sm">
              View All Equipment
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Fault Details Dialog */}
      <Dialog open={!!selectedFault} onOpenChange={(open) => !open && setSelectedFault(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Fault Report Details</DialogTitle>
            <DialogDescription>
              Reference: {selectedFault?.id} 
            </DialogDescription>
          </DialogHeader>
          {selectedFault && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Car Park</label>
                  <p className="font-medium">{selectedFault.carPark}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Equipment</label>
                  <p className="font-medium">{selectedFault.equipment}</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Description</label>
                <p className="font-medium">{selectedFault.description}</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Date Reported</label>
                  <p className="font-medium">{selectedFault.date}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Reported By</label>
                  <p className="font-medium">{selectedFault.reportedBy}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Days Open</label>
                  <p className="font-medium">
                    {selectedFault.daysOpen} {selectedFault.overdueBy && (
                      <span className="text-destructive font-medium">+{selectedFault.overdueBy} overdue</span>
                    )}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Status</label>
                <div className="mt-1">
                  <StatusBadge status={selectedFault.status as any} />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedFault(null)}>Close</Button>
            <Button onClick={() => setSelectedFault(null)}>Update Fault</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Equipment Dialog */}
      <Dialog open={isAddEquipmentDialogOpen} onOpenChange={setIsAddEquipmentDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Equipment</DialogTitle>
            <DialogDescription>
              Enter the details for the new equipment.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input placeholder="e.g. POF 3" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {equipmentTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Car Park</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select car park" />
                </SelectTrigger>
                <SelectContent>
                  {carParks.map((carPark) => (
                    <SelectItem key={carPark} value={carPark}>
                      {carPark}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input placeholder="e.g. Main building" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Manufacturer</label>
                <Input placeholder="e.g. Skidata" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Serial Number</label>
                <Input placeholder="e.g. SKI-12345-X" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Installation Date</label>
              <Input type="date" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddEquipmentDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAddEquipmentDialogOpen(false)}>Save Equipment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
