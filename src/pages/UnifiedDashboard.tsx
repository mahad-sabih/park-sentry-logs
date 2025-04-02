import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LayoutDashboard, AlertCircle, Clock, CheckCircle, BarChartIcon, Cog, ChevronDown, ChevronUp, Info, DollarSign, TrendingDown } from 'lucide-react';
import StatCard from '@/components/StatCard';
import StatusBadge from '@/components/StatusBadge';
import { Separator } from "@/components/ui/separator";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";

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
  recentFaults: [{
    id: 'F32145',
    carPark: 'Virginia Water',
    equipment: 'POF 3',
    description: 'Display showing error code E45',
    status: 'Outstanding',
    date: '2023-04-12',
    reportedBy: 'JD',
    daysOpen: 18,
    overdueBy: 3
  }, {
    id: 'F32141',
    carPark: 'Savill Garden',
    equipment: 'Entry 1',
    description: 'Barrier not raising fully',
    status: 'In Progress',
    date: '2023-04-10',
    reportedBy: 'KA',
    daysOpen: 20
  }, {
    id: 'F32137',
    carPark: 'Cranbourne',
    equipment: 'Exit 2',
    description: 'Card reader not accepting payments',
    status: 'Completed',
    date: '2023-04-08',
    reportedBy: 'TS',
    daysOpen: 5
  }, {
    id: 'F32135',
    carPark: 'Virginia Water South',
    equipment: 'POF 1',
    description: 'Coin acceptor jammed',
    status: 'Completed',
    date: '2023-04-07',
    reportedBy: 'JD',
    daysOpen: 3
  }],
  carParkData: {
    'Overview': {
      totalAssets: 39,
      healthyAssets: 21,
      faultyAssets: 12,
      overdueAssets: 6,
      inProgress: 5
    },
    'Virginia Water': {
      totalAssets: 13,
      healthyAssets: 8,
      faultyAssets: 3,
      overdueAssets: 2,
      inProgress: 1
    },
    'Cranbourne': {
      totalAssets: 8,
      healthyAssets: 4,
      faultyAssets: 2,
      overdueAssets: 1,
      inProgress: 1
    },
    'Savill Garden': {
      totalAssets: 7,
      healthyAssets: 3,
      faultyAssets: 3,
      overdueAssets: 1,
      inProgress: 1
    },
    'Wick': {
      totalAssets: 6,
      healthyAssets: 3,
      faultyAssets: 2,
      overdueAssets: 1,
      inProgress: 1
    },
    'Rangers': {
      totalAssets: 5,
      healthyAssets: 3,
      faultyAssets: 2,
      overdueAssets: 0,
      inProgress: 1
    }
  },
  equipment: {
    'Overview': [{
      type: 'Barrier Systems',
      total: 12,
      functional: 10,
      maintenance: 2
    }, {
      type: 'Payment Terminals',
      total: 16,
      functional: 14,
      faulty: 1,
      maintenance: 1
    }, {
      type: 'ANPR Cameras',
      total: 8,
      functional: 6,
      faulty: 2
    }],
    'Virginia Water': [{
      type: 'Barrier Systems',
      total: 4,
      functional: 3,
      maintenance: 1
    }, {
      type: 'Payment Terminals',
      total: 6,
      functional: 5,
      faulty: 1
    }, {
      type: 'ANPR Cameras',
      total: 3,
      functional: 2,
      faulty: 1
    }],
    'Cranbourne': [{
      type: 'Barrier Systems',
      total: 2,
      functional: 2
    }, {
      type: 'Payment Terminals',
      total: 3,
      functional: 3
    }, {
      type: 'ANPR Cameras',
      total: 2,
      functional: 1,
      faulty: 1
    }],
    'Savill Garden': [{
      type: 'Barrier Systems',
      total: 2,
      functional: 1,
      maintenance: 1
    }, {
      type: 'Payment Terminals',
      total: 3,
      functional: 2,
      maintenance: 1
    }, {
      type: 'ANPR Cameras',
      total: 1,
      functional: 1
    }],
    'Wick': [{
      type: 'Barrier Systems',
      total: 2,
      functional: 2
    }, {
      type: 'Payment Terminals',
      total: 2,
      functional: 2
    }, {
      type: 'ANPR Cameras',
      total: 1,
      functional: 1
    }],
    'Rangers': [{
      type: 'Barrier Systems',
      total: 2,
      functional: 2
    }, {
      type: 'Payment Terminals',
      total: 2,
      functional: 2
    }, {
      type: 'ANPR Cameras',
      total: 1,
      functional: 1
    }]
  },
  analytics: {
    'Overview': [{
      name: 'Jan',
      faults: 12
    }, {
      name: 'Feb',
      faults: 19
    }, {
      name: 'Mar',
      faults: 15
    }, {
      name: 'Apr',
      faults: 23
    }, {
      name: 'May',
      faults: 29
    }, {
      name: 'Jun',
      faults: 18
    }],
    'Virginia Water': [{
      name: 'Jan',
      faults: 5
    }, {
      name: 'Feb',
      faults: 8
    }, {
      name: 'Mar',
      faults: 6
    }, {
      name: 'Apr',
      faults: 10
    }, {
      name: 'May',
      faults: 12
    }, {
      name: 'Jun',
      faults: 7
    }],
    'Cranbourne': [{
      name: 'Jan',
      faults: 2
    }, {
      name: 'Feb',
      faults: 4
    }, {
      name: 'Mar',
      faults: 3
    }, {
      name: 'Apr',
      faults: 5
    }, {
      name: 'May',
      faults: 7
    }, {
      name: 'Jun',
      faults: 4
    }],
    'Savill Garden': [{
      name: 'Jan',
      faults: 3
    }, {
      name: 'Feb',
      faults: 4
    }, {
      name: 'Mar',
      faults: 3
    }, {
      name: 'Apr',
      faults: 4
    }, {
      name: 'May',
      faults: 5
    }, {
      name: 'Jun',
      faults: 3
    }],
    'Wick': [{
      name: 'Jan',
      faults: 1
    }, {
      name: 'Feb',
      faults: 2
    }, {
      name: 'Mar',
      faults: 2
    }, {
      name: 'Apr',
      faults: 3
    }, {
      name: 'May',
      faults: 3
    }, {
      name: 'Jun',
      faults: 2
    }],
    'Rangers': [{
      name: 'Jan',
      faults: 1
    }, {
      name: 'Feb',
      faults: 1
    }, {
      name: 'Mar',
      faults: 1
    }, {
      name: 'Apr',
      faults: 1
    }, {
      name: 'May',
      faults: 2
    }, {
      name: 'Jun',
      faults: 2
    }]
  },
  equipmentList: {
    'Overview': [{
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
      faults: [{
        id: 'F32145',
        date: '2023-04-12',
        description: 'Display showing error code E45',
        status: 'Outstanding',
        reportedBy: 'JD'
      }, {
        id: 'F31990',
        date: '2023-03-05',
        description: 'Card reader intermittently not accepting payments',
        status: 'Completed',
        reportedBy: 'KA'
      }]
    }, {
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
      faults: [{
        id: 'F32100',
        date: '2023-03-25',
        description: 'Coin acceptor jammed',
        status: 'Completed',
        reportedBy: 'JD'
      }]
    }, {
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
      faults: [{
        id: 'F32142',
        date: '2023-04-11',
        description: 'Barrier not raising fully',
        status: 'Parts Ordered',
        reportedBy: 'KA'
      }]
    }, {
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
      faults: [{
        id: 'F32137',
        date: '2023-04-08',
        description: 'Card reader not accepting payments',
        status: 'Completed',
        reportedBy: 'JD'
      }]
    }, {
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
      faults: []
    }],
    'Virginia Water': [{
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
      faults: [{
        id: 'F32145',
        date: '2023-04-12',
        description: 'Display showing error code E45',
        status: 'Outstanding',
        reportedBy: 'JD'
      }]
    }, {
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
      faults: []
    }, {
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
      faults: []
    }],
    'Cranbourne': [{
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
      faults: []
    }],
    'Savill Garden': [{
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
      faults: []
    }],
    'Wick': [],
    'Rangers': []
  }
};
const monthlyFaultData = [{
  name: 'Jan',
  faults: 28,
  resolved: 24
}, {
  name: 'Feb',
  faults: 32,
  resolved: 30
}, {
  name: 'Mar',
  faults: 35,
  resolved: 32
}, {
  name: 'Apr',
  faults: 30,
  resolved: 25
}, {
  name: 'May',
  faults: 40,
  resolved: 35
}, {
  name: 'Jun',
  faults: 45,
  resolved: 38
}, {
  name: 'Jul',
  faults: 42,
  resolved: 40
}, {
  name: 'Aug',
  faults: 38,
  resolved: 36
}, {
  name: 'Sep',
  faults: 50,
  resolved: 45
}, {
  name: 'Oct',
  faults: 55,
  resolved: 48
}, {
  name: 'Nov',
  faults: 48,
  resolved: 44
}, {
  name: 'Dec',
  faults: 42,
  resolved: 40
}];
const equipmentTypeData = [{
  name: 'Barriers',
  value: 35
}, {
  name: 'Ticket Machines',
  value: 25
}, {
  name: 'Payment Terminals',
  value: 20
}, {
  name: 'CCTV',
  value: 15
}, {
  name: 'Lighting',
  value: 5
}];
const faultStatusData = [{
  name: 'Outstanding',
  value: 32
}, {
  name: 'Parts Ordered',
  value: 18
}, {
  name: 'Completed',
  value: 50
}];
const carParkUsageData = [{
  name: 'Mon',
  central: 80,
  north: 65,
  west: 70
}, {
  name: 'Tue',
  central: 85,
  north: 68,
  west: 75
}, {
  name: 'Wed',
  central: 90,
  north: 72,
  west: 78
}, {
  name: 'Thu',
  central: 88,
  north: 70,
  west: 76
}, {
  name: 'Fri',
  central: 95,
  north: 75,
  west: 80
}, {
  name: 'Sat',
  central: 100,
  north: 90,
  west: 95
}, {
  name: 'Sun',
  central: 75,
  north: 60,
  west: 65
}];
const commonMaintenanceFaults = [{
  name: 'Barrier Malfunction',
  value: 32
}, {
  name: 'Ticket Printer Error',
  value: 26
}, {
  name: 'Payment Terminal',
  value: 22
}, {
  name: 'Camera Issues',
  value: 15
}, {
  name: 'Lighting Problems',
  value: 12
}, {
  name: 'Others',
  value: 8
}];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28AF9', '#FB6962'];
const revenueLossByAsset = [{
  name: 'Barrier A',
  revenue: 3200,
  downtime: 24
}, {
  name: 'Ticket Machine B',
  revenue: 2800,
  downtime: 18
}, {
  name: 'Payment Terminal C',
  revenue: 4500,
  downtime: 36
}, {
  name: 'Barrier D',
  revenue: 1900,
  downtime: 12
}, {
  name: 'CCTV System E',
  revenue: 800,
  downtime: 8
}];
const monthlyRevenueLoss = [{
  name: 'Jan',
  loss: 2800
}, {
  name: 'Feb',
  loss: 3200
}, {
  name: 'Mar',
  loss: 4500
}, {
  name: 'Apr',
  loss: 3800
}, {
  name: 'May',
  loss: 5200
}, {
  name: 'Jun',
  loss: 4100
}, {
  name: 'Jul',
  loss: 3600
}, {
  name: 'Aug',
  loss: 2900
}, {
  name: 'Sep',
  loss: 4700
}, {
  name: 'Oct',
  loss: 5500
}, {
  name: 'Nov',
  loss: 4900
}, {
  name: 'Dec',
  loss: 3700
}];
const UnifiedDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [activeSection, setActiveSection] = useState('faults');
  const [expandedEquipment, setExpandedEquipment] = useState<string | null>(null);
  const [selectedFault, setSelectedFault] = useState<any | null>(null);
  const [isFaultDialogOpen, setIsFaultDialogOpen] = useState(false);
  const [analyticsTab, setAnalyticsTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('year');
  const currentStats = mockData.carParkData[activeTab as keyof typeof mockData.carParkData];
  const filteredFaults = useMemo(() => {
    if (activeTab === 'Overview') {
      return mockData.recentFaults;
    }
    return mockData.recentFaults.filter(fault => fault.carPark === activeTab);
  }, [activeTab]);
  const currentEquipment = mockData.equipment[activeTab as keyof typeof mockData.equipment];
  const currentEquipmentList = mockData.equipmentList[activeTab as keyof typeof mockData.equipmentList] || [];
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
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            {activeTab === 'Overview' ? 'Overview of all car parks' : `Information for ${activeTab} car park`}
          </p>
        </div>
        <Button>
          <AlertCircle className="mr-2 h-4 w-4" />
          Report New Fault
        </Button>
      </div>

      <Tabs defaultValue="Overview" onValueChange={setActiveTab} className="w-full">
        <TabsList className="h-10 mb-4 w-full justify-start">
          {carParks.map(carPark => <TabsTrigger key={carPark} value={carPark} className="px-4 py-2">
              {carPark}
            </TabsTrigger>)}
        </TabsList>

        <TabsContent key={activeTab} value={activeTab} className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatCard title="Total Assets" value={currentStats.totalAssets} icon={<LayoutDashboard className="h-4 w-4 text-primary" />} description="All assets" className="animate-slide-up" />
            <StatCard title="Healthy Assets" value={currentStats.healthyAssets} icon={<CheckCircle className="h-4 w-4 text-success" />} description="Operational assets" className="animate-slide-up animation-delay-100" />
            <StatCard title="Faulty Assets" value={currentStats.faultyAssets} icon={<AlertCircle className="h-4 w-4 text-destructive" />} description="Equipment requiring attention" className="animate-slide-up animation-delay-200" />
            <StatCard title="Overdue Maintenance" value={currentStats.overdueAssets} icon={<Clock className="h-4 w-4 text-warning" />} description="Past scheduled maintenance" className="animate-slide-up animation-delay-300" />
            <StatCard title="In Progress" value={currentStats.inProgress} icon={<BarChartIcon className="h-4 w-4 text-info" />} description="Maintenance in progress" className="animate-slide-up animation-delay-400" />
          </div>
        </TabsContent>
      </Tabs>

      

      <Dialog open={isFaultDialogOpen} onOpenChange={setIsFaultDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Fault Report {selectedFault?.id}</DialogTitle>
            <DialogDescription>
              Details for the selected fault report
            </DialogDescription>
          </DialogHeader>
          {selectedFault && <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">Status:</div>
                <StatusBadge status={selectedFault.status as any} />
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Car Park</p>
                  <p className="font-medium">{selectedFault.carPark}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Equipment</p>
                  <p className="font-medium">{selectedFault.equipment}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reported Date</p>
                  <p className="font-medium">{selectedFault.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reported By</p>
                  <p className="font-medium">{selectedFault.reportedBy}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Days Open</p>
                  <p className="font-medium">
                    {selectedFault.daysOpen} {selectedFault.overdueBy && <span className="text-destructive font-medium">+{selectedFault.overdueBy} overdue</span>}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expected Resolution</p>
                  <p className="font-medium">12/05/2023</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Description</p>
                <p>{selectedFault.description}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Actions Taken</p>
                <p className="text-muted-foreground italic">
                  {selectedFault.status === 'Completed' ? 'Issue resolved by replacing the faulty hardware component.' : selectedFault.status === 'In Progress' ? 'Technician assigned and diagnostic tests in progress.' : 'No actions taken yet.'}
                </p>
              </div>
            </div>}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsFaultDialogOpen(false)}>Close</Button>
            <Button>
              <AlertCircle className="mr-2 h-4 w-4" />
              Update Status
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>;
};
export default UnifiedDashboard;