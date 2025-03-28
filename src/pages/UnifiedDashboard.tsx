
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LayoutDashboard, 
  AlertCircle, 
  Clock, 
  CheckCircle, 
  BarChartIcon, 
  Cog, 
  ChevronDown, 
  ChevronUp,
  Info
} from 'lucide-react';
import StatCard from '@/components/StatCard';
import StatusBadge from '@/components/StatusBadge';
import { Separator } from "@/components/ui/separator";
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
  },
  // Adding equipment list data
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

const UnifiedDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [activeSection, setActiveSection] = useState('faults');
  const [expandedEquipment, setExpandedEquipment] = useState<string | null>(null);
  
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
  
  // Get equipment list for the selected car park
  const currentEquipmentList = mockData.equipmentList[activeTab as keyof typeof mockData.equipmentList] || [];
  
  // Get analytics data for the selected car park
  const currentAnalytics = mockData.analytics[activeTab as keyof typeof mockData.analytics];

  const toggleExpandedEquipment = (id: string) => {
    if (expandedEquipment === id) {
      setExpandedEquipment(null);
    } else {
      setExpandedEquipment(id);
    }
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
          {/* Equipment Overview */}
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

          {/* Equipment List */}
          <Card>
            <CardHeader>
              <CardTitle>Equipment List</CardTitle>
              <CardDescription>
                Click on any equipment to view more details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentEquipmentList.length === 0 ? (
                  <div className="py-8 flex flex-col items-center justify-center">
                    <Info className="h-10 w-10 text-muted-foreground/50 mb-3" />
                    <p className="text-center text-muted-foreground">No equipment found for this car park.</p>
                  </div>
                ) : (
                  currentEquipmentList.map((equipment, index) => (
                    <Card 
                      key={equipment.id} 
                      className={`overflow-hidden animate-scale-in animation-delay-${index * 100}`}
                    >
                      <CardHeader className="pb-3">
                        <div 
                          className="flex items-center justify-between cursor-pointer"
                          onClick={() => toggleExpandedEquipment(equipment.id)}
                        >
                          <div className="flex items-center">
                            <div className="mr-3">
                              <div className="p-2 rounded-full bg-primary/10">
                                <Cog className="h-5 w-5 text-primary" />
                              </div>
                            </div>
                            <div>
                              <CardTitle>{equipment.name}</CardTitle>
                              <CardDescription className="mt-1">
                                {equipment.type} • {equipment.carPark} • {equipment.location}
                              </CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-sm">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                equipment.status === 'Operational' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                              }`}>
                                {equipment.status}
                              </span>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              {expandedEquipment === equipment.id ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      {expandedEquipment === equipment.id && (
                        <>
                          <CardContent className="pb-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Manufacturer</p>
                                <p className="font-medium">{equipment.manufacturer}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Serial Number</p>
                                <p className="font-medium">{equipment.serialNumber}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Installed Date</p>
                                <p className="font-medium">{equipment.installedDate}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Last Maintenance</p>
                                <p className="font-medium">{equipment.lastMaintenance}</p>
                              </div>
                            </div>
                            
                            <Separator className="my-4" />
                            
                            <div>
                              <h4 className="font-medium mb-2">Fault History</h4>
                              {equipment.faults.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No fault history for this equipment.</p>
                              ) : (
                                <div className="rounded-md border">
                                  <div className="grid grid-cols-12 border-b py-2 px-3 bg-muted/50">
                                    <div className="col-span-2 font-medium text-xs">Reference</div>
                                    <div className="col-span-2 font-medium text-xs">Date</div>
                                    <div className="col-span-5 font-medium text-xs">Description</div>
                                    <div className="col-span-2 font-medium text-xs">Status</div>
                                    <div className="col-span-1 font-medium text-xs">By</div>
                                  </div>
                                  {equipment.faults.map((fault) => (
                                    <div key={fault.id} className="grid grid-cols-12 border-b py-2 px-3 hover:bg-muted/20 transition-colors">
                                      <div className="col-span-2 text-xs font-medium text-primary">{fault.id}</div>
                                      <div className="col-span-2 text-xs">{fault.date}</div>
                                      <div className="col-span-5 text-xs truncate">{fault.description}</div>
                                      <div className="col-span-2">
                                        <StatusBadge status={fault.status as any} />
                                      </div>
                                      <div className="col-span-1 text-xs">{fault.reportedBy}</div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </CardContent>
                          <CardFooter className="border-t pt-3 flex justify-end gap-2">
                            <Button variant="outline" size="sm">Edit Equipment</Button>
                            <Button size="sm">
                              <AlertCircle className="mr-2 h-3.5 w-3.5" />
                              Report Fault
                            </Button>
                          </CardFooter>
                        </>
                      )}
                    </Card>
                  ))
                )}
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
