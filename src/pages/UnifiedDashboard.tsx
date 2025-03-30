
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  LayoutDashboard, 
  AlertCircle, 
  Clock, 
  CheckCircle, 
  BarChartIcon, 
  Cog, 
  ChevronDown, 
  ChevronUp,
  Info,
  DollarSign,
  TrendingDown,
  Calendar,
  Search,
  Filter,
  Plus
} from 'lucide-react';
import StatCard from '@/components/StatCard';
import StatusBadge from '@/components/StatusBadge';
import { Separator } from "@/components/ui/separator";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
      reportedBy: 'JD',
      daysOpen: 18,
      overdueBy: 3
    },
    {
      id: 'F32141',
      carPark: 'Savill Garden',
      equipment: 'Entry 1',
      description: 'Barrier not raising fully',
      status: 'In Progress',
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
  },
  equipmentList: {
    'Overview': [
      {
        id: 'eq1',
        name: 'POF 1',
        type: 'POF',
        carPark: 'Virginia Water',
        location: 'Main building',
        installedDate: '2020-05-15',
        manufacturer: 'Skidata',
        serialNumber: 'SKI-45678-A',
        lastMaintenance: '2023-01-20',
        status: 'Operational',
        faults: [
          {
            id: 'F32145',
            date: '2023-04-12',
            description: 'Display showing error code E45',
            status: 'Outstanding',
            reportedBy: 'JD',
          },
          {
            id: 'F31990',
            date: '2023-03-05',
            description: 'Card reader intermittently not accepting payments',
            status: 'Completed',
            reportedBy: 'KA',
          },
        ],
      },
      {
        id: 'eq2',
        name: 'POF 2',
        type: 'POF',
        carPark: 'Virginia Water',
        location: 'Near exit',
        installedDate: '2020-05-15',
        manufacturer: 'Skidata',
        serialNumber: 'SKI-45679-A',
        lastMaintenance: '2023-02-10',
        status: 'Operational',
        faults: [
          {
            id: 'F32100',
            date: '2023-03-25',
            description: 'Coin acceptor jammed',
            status: 'Completed',
            reportedBy: 'JD',
          },
        ],
      },
      {
        id: 'eq3',
        name: 'Entry 1',
        type: 'Entry',
        carPark: 'Virginia Water',
        location: 'Main entrance',
        installedDate: '2019-11-20',
        manufacturer: 'Skidata',
        serialNumber: 'SKI-34567-B',
        lastMaintenance: '2023-01-15',
        status: 'Needs Attention',
        faults: [
          {
            id: 'F32142',
            date: '2023-04-11',
            description: 'Barrier not raising fully',
            status: 'Parts Ordered',
            reportedBy: 'KA',
          },
        ],
      },
      {
        id: 'eq4',
        name: 'Exit 2',
        type: 'Exit',
        carPark: 'Savill Garden',
        location: 'Secondary exit',
        installedDate: '2021-03-05',
        manufacturer: 'Skidata',
        serialNumber: 'SKI-56789-C',
        lastMaintenance: '2023-03-01',
        status: 'Operational',
        faults: [
          {
            id: 'F32137',
            date: '2023-04-08',
            description: 'Card reader not accepting payments',
            status: 'Completed',
            reportedBy: 'JD',
          },
        ],
      },
      {
        id: 'eq5',
        name: 'POF 1',
        type: 'POF',
        carPark: 'Cranbourne',
        location: 'Main building',
        installedDate: '2020-08-12',
        manufacturer: 'Skidata',
        serialNumber: 'SKI-45680-A',
        lastMaintenance: '2023-02-28',
        status: 'Operational',
        faults: [],
      },
    ],
    'Virginia Water': [
      {
        id: 'eq1',
        name: 'POF 1',
        type: 'POF',
        carPark: 'Virginia Water',
        location: 'Main building',
        installedDate: '2020-05-15',
        manufacturer: 'Skidata',
        serialNumber: 'SKI-45678-A',
        lastMaintenance: '2023-01-20',
        status: 'Operational',
        faults: [
          {
            id: 'F32145',
            date: '2023-04-12',
            description: 'Display showing error code E45',
            status: 'Outstanding',
            reportedBy: 'JD',
          },
        ],
      },
      {
        id: 'eq2',
        name: 'POF 2',
        type: 'POF',
        carPark: 'Virginia Water',
        location: 'Near exit',
        installedDate: '2020-05-15',
        manufacturer: 'Skidata',
        serialNumber: 'SKI-45679-A',
        lastMaintenance: '2023-02-10',
        status: 'Operational',
        faults: [],
      },
      {
        id: 'eq3',
        name: 'Entry 1',
        type: 'Entry',
        carPark: 'Virginia Water',
        location: 'Main entrance',
        installedDate: '2019-11-20',
        manufacturer: 'Skidata',
        serialNumber: 'SKI-34567-B',
        lastMaintenance: '2023-01-15',
        status: 'Needs Attention',
        faults: [],
      },
    ],
    'Cranbourne': [
      {
        id: 'eq5',
        name: 'POF 1',
        type: 'POF',
        carPark: 'Cranbourne',
        location: 'Main building',
        installedDate: '2020-08-12',
        manufacturer: 'Skidata',
        serialNumber: 'SKI-45680-A',
        lastMaintenance: '2023-02-28',
        status: 'Operational',
        faults: [],
      },
    ],
    'Savill Garden': [
      {
        id: 'eq4',
        name: 'Exit 2',
        type: 'Exit',
        carPark: 'Savill Garden',
        location: 'Secondary exit',
        installedDate: '2021-03-05',
        manufacturer: 'Skidata',
        serialNumber: 'SKI-56789-C',
        lastMaintenance: '2023-03-01',
        status: 'Operational',
        faults: [],
      },
    ],
    'Wick': [],
    'Rangers': []
  }
};

const monthlyFaultData = [
  { name: 'Jan', faults: 28, resolved: 24 },
  { name: 'Feb', faults: 32, resolved: 30 },
  { name: 'Mar', faults: 35, resolved: 32 },
  { name: 'Apr', faults: 30, resolved: 25 },
  { name: 'May', faults: 40, resolved: 35 },
  { name: 'Jun', faults: 45, resolved: 38 },
  { name: 'Jul', faults: 42, resolved: 40 },
  { name: 'Aug', faults: 38, resolved: 36 },
  { name: 'Sep', faults: 50, resolved: 45 },
  { name: 'Oct', faults: 55, resolved: 48 },
  { name: 'Nov', faults: 48, resolved: 44 },
  { name: 'Dec', faults: 42, resolved: 40 },
];

const equipmentTypeData = [
  { name: 'Barriers', value: 35 },
  { name: 'Ticket Machines', value: 25 },
  { name: 'Payment Terminals', value: 20 },
  { name: 'CCTV', value: 15 },
  { name: 'Lighting', value: 5 },
];

const faultStatusData = [
  { name: 'Outstanding', value: 32 },
  { name: 'Parts Ordered', value: 18 },
  { name: 'Completed', value: 50 },
];

const carParkUsageData = [
  { name: 'Mon', central: 80, north: 65, west: 70 },
  { name: 'Tue', central: 85, north: 68, west: 75 },
  { name: 'Wed', central: 90, north: 72, west: 78 },
  { name: 'Thu', central: 88, north: 70, west: 76 },
  { name: 'Fri', central: 95, north: 75, west: 80 },
  { name: 'Sat', central: 100, north: 90, west: 95 },
  { name: 'Sun', central: 75, north: 60, west: 65 },
];

const commonMaintenanceFaults = [
  { name: 'Barrier Malfunction', value: 32 },
  { name: 'Ticket Printer Error', value: 26 },
  { name: 'Payment Terminal', value: 22 },
  { name: 'Camera Issues', value: 15 },
  { name: 'Lighting Problems', value: 12 },
  { name: 'Others', value: 8 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28AF9', '#FB6962'];

const revenueLossByAsset = [
  { name: 'Barrier A', revenue: 3200, downtime: 24 },
  { name: 'Ticket Machine B', revenue: 2800, downtime: 18 },
  { name: 'Payment Terminal C', revenue: 4500, downtime: 36 },
  { name: 'Barrier D', revenue: 1900, downtime: 12 },
  { name: 'CCTV System E', revenue: 800, downtime: 8 },
];

const monthlyRevenueLoss = [
  { name: 'Jan', loss: 2800 },
  { name: 'Feb', loss: 3200 },
  { name: 'Mar', loss: 4500 },
  { name: 'Apr', loss: 3800 },
  { name: 'May', loss: 5200 },
  { name: 'Jun', loss: 4100 },
  { name: 'Jul', loss: 3600 },
  { name: 'Aug', loss: 2900 },
  { name: 'Sep', loss: 4700 },
  { name: 'Oct', loss: 5500 },
  { name: 'Nov', loss: 4900 },
  { name: 'Dec', loss: 3700 },
];

// Equipment types for the dropdown
const equipmentTypes = ['POF', 'Entry', 'Exit'];

const UnifiedDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [activeSection, setActiveSection] = useState('faults');
  const [expandedEquipment, setExpandedEquipment] = useState<string | null>(null);
  const [selectedFault, setSelectedFault] = useState<any | null>(null);
  const [isFaultDialogOpen, setIsFaultDialogOpen] = useState(false);
  const [analyticsTab, setAnalyticsTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('year');
  
  // Add new state variables for filtering
  const [faultSearchQuery, setFaultSearchQuery] = useState('');
  const [faultStatusFilter, setFaultStatusFilter] = useState<string | null>(null);
  const [equipmentSearchQuery, setEquipmentSearchQuery] = useState('');
  const [equipmentTypeFilter, setEquipmentTypeFilter] = useState<string | null>(null);
  const [equipmentCarParkFilter, setEquipmentCarParkFilter] = useState<string | null>(null);
  const [isAddEquipmentDialogOpen, setIsAddEquipmentDialogOpen] = useState(false);
  
  const currentStats = mockData.carParkData[activeTab as keyof typeof mockData.carParkData];
  
  // Filter faults based on search query and status filter
  const filteredFaults = useMemo(() => {
    let faults = activeTab === 'Overview' 
      ? mockData.recentFaults 
      : mockData.recentFaults.filter(fault => fault.carPark === activeTab);
    
    // Apply search query filter
    if (faultSearchQuery) {
      faults = faults.filter(fault => 
        fault.id.toLowerCase().includes(faultSearchQuery.toLowerCase()) ||
        fault.equipment.toLowerCase().includes(faultSearchQuery.toLowerCase()) ||
        fault.description.toLowerCase().includes(faultSearchQuery.toLowerCase())
      );
    }
    
    // Apply status filter
    if (faultStatusFilter) {
      faults = faults.filter(fault => fault.status === faultStatusFilter);
    }
    
    return faults;
  }, [activeTab, faultSearchQuery, faultStatusFilter]);
  
  const currentEquipment = mockData.equipment[activeTab as keyof typeof mockData.equipment];
  
  // Filter equipment based on search query, type filter, and car park filter
  const filteredEquipmentList = useMemo(() => {
    let equipment = mockData.equipmentList[activeTab as keyof typeof mockData.equipmentList] || [];
    
    // Apply search query filter
    if (equipmentSearchQuery) {
      equipment = equipment.filter(item => 
        item.name.toLowerCase().includes(equipmentSearchQuery.toLowerCase()) ||
        item.serialNumber.toLowerCase().includes(equipmentSearchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(equipmentSearchQuery.toLowerCase())
      );
    }
    
    // Apply type filter
    if (equipmentTypeFilter) {
      equipment = equipment.filter(item => item.type === equipmentTypeFilter);
    }
    
    // Apply car park filter (only when on Overview tab)
    if (activeTab === 'Overview' && equipmentCarParkFilter) {
      equipment = equipment.filter(item => item.carPark === equipmentCarParkFilter);
    }
    
    return equipment;
  }, [activeTab, equipmentSearchQuery, equipmentTypeFilter, equipmentCarParkFilter]);
  
  const currentAnalytics = mockData.analytics[activeTab as keyof typeof mockData.analytics];

  const toggleExpandedEquipment = (id: string) => {
    if (expandedEquipment === id) {
      setExpandedEquipment(null);
    } else {
      setExpandedEquipment(id);
    }
  };

  const handleFaultClick = (fault: any) => {
    setSelectedFault(fault);
    setIsFaultDialogOpen(true);
  };

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

      <Tabs defaultValue="faults" onValueChange={setActiveSection} className="w-full">
        <TabsList className="bg-muted mb-6">
          <TabsTrigger value="faults">Fault Reports</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

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
            <CardContent className="space-y-4">
              {/* Add filtering options */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search faults..."
                    className="pl-9"
                    value={faultSearchQuery}
                    onChange={(e) => setFaultSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground mr-2">Filter:</span>
                  <Select value={faultStatusFilter || ''} onValueChange={(value) => setFaultStatusFilter(value || null)}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Statuses</SelectItem>
                      <SelectItem value="Outstanding">Outstanding</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Parts Ordered">Parts Ordered</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="rounded-md border">
                <div className="grid grid-cols-12 border-b py-3 px-4 bg-muted/50">
                  <div className="col-span-1 font-medium text-sm">ID</div>
                  <div className="col-span-2 font-medium text-sm">Equipment</div>
                  <div className="col-span-3 font-medium text-sm">Fault Description</div>
                  <div className="col-span-2 font-medium text-sm">Carpark</div>
                  <div className="col-span-1 font-medium text-sm">Detection Date</div>
                  <div className="col-span-1 font-medium text-sm">Days Open</div>
                  <div className="col-span-1 font-medium text-sm">Expected Resolution</div>
                  <div className="col-span-1 font-medium text-sm">Status</div>
                </div>
                {filteredFaults.length > 0 ? (
                  filteredFaults.map((fault) => (
                    <div 
                      key={fault.id} 
                      className="grid grid-cols-12 border-b py-3 px-4 hover:bg-muted/20 transition-colors cursor-pointer"
                      onClick={() => handleFaultClick(fault)}
                    >
                      <div className="col-span-1 text-sm font-medium text-primary">{fault.id}</div>
                      <div className="col-span-2 text-sm">{fault.equipment}</div>
                      <div className="col-span-3 text-sm truncate">{fault.description}</div>
                      <div className="col-span-2 text-sm">{fault.carPark}</div>
                      <div className="col-span-1 text-sm text-muted-foreground">{fault.date}</div>
                      <div className="col-span-1 text-sm">
                        {fault.daysOpen} {fault.overdueBy && (
                          <span className="text-destructive font-medium">+{fault.overdueBy}</span>
                        )}
                      </div>
                      <div className="col-span-1 text-sm text-muted-foreground">12/05/2023</div>
                      <div className="col-span-1 text-sm">
                        <StatusBadge status={fault.status as any} />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    No faults found matching your criteria.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Equipment tab content */}
        <TabsContent value="equipment" className="space-y-6">
          {/* Equipment content would go here */}
        </TabsContent>
        
        {/* Analytics tab content */}
        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics content would go here */}
        </TabsContent>
      </Tabs>

      {/* Fault Detail Dialog */}
      <Dialog open={isFaultDialogOpen} onOpenChange={setIsFaultDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Fault Details: {selectedFault?.id}</DialogTitle>
            <DialogDescription>
              Reported on {selectedFault?.date} by {selectedFault?.reportedBy}
            </DialogDescription>
          </DialogHeader>
          {selectedFault && (
            <>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Status</Label>
                  <div className="col-span-3">
                    <StatusBadge status={selectedFault.status as any} />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Car Park</Label>
                  <div className="col-span-3">{selectedFault.carPark}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Equipment</Label>
                  <div className="col-span-3">{selectedFault.equipment}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Description</Label>
                  <div className="col-span-3">{selectedFault.description}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Days Open</Label>
                  <div className="col-span-3">
                    {selectedFault.daysOpen} {selectedFault.overdueBy && (
                      <span className="text-destructive font-medium">
                        (+{selectedFault.overdueBy} days overdue)
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsFaultDialogOpen(false)}>
                  Close
                </Button>
                <Button>Update Status</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Equipment Dialog */}
      <Dialog open={isAddEquipmentDialogOpen} onOpenChange={setIsAddEquipmentDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Equipment</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new equipment to the system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="equipmentName" className="text-right">
                Name
              </Label>
              <Input id="equipmentName" className="col-span-3" placeholder="Enter equipment name" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="equipmentType" className="text-right">
                Type
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {equipmentTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="carPark" className="text-right">
                Car Park
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select car park" />
                </SelectTrigger>
                <SelectContent>
                  {carParks.filter(cp => cp !== 'Overview').map((cp) => (
                    <SelectItem key={cp} value={cp}>{cp}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input id="location" className="col-span-3" placeholder="e.g., Main entrance" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="manufacturer" className="text-right">
                Manufacturer
              </Label>
              <Input id="manufacturer" className="col-span-3" placeholder="e.g., Skidata" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="serialNumber" className="text-right">
                Serial Number
              </Label>
              <Input id="serialNumber" className="col-span-3" placeholder="Enter serial number" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddEquipmentDialogOpen(false)}>
              Cancel
            </Button>
            <Button>Add Equipment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UnifiedDashboard;
