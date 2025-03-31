
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/StatusBadge';
import { Filter, Clock, AlertCircle, Package, CheckCircle, ArrowUpDown } from 'lucide-react';

type Status = 'Outstanding' | 'Parts Ordered' | 'Completed';

interface FaultItem {
  id: string;
  carPark: string;
  equipment: string;
  description: string;
  status: Status;
  date: string;
  reportedBy: string;
  daysOpen?: number;
  overdueBy?: number;
}

// Mock data for the status page
const mockFaults: FaultItem[] = [
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
    daysOpen: 1
  },
  {
    id: 'F32128',
    carPark: 'Virginia Water',
    equipment: 'Exit 1',
    description: 'Barrier arm broken',
    status: 'Parts Ordered',
    date: '2023-04-03',
    reportedBy: 'TS',
    daysOpen: 27
  },
  {
    id: 'F32124',
    carPark: 'Cranbourne',
    equipment: 'POF 2',
    description: 'Screen unresponsive',
    status: 'Outstanding',
    date: '2023-04-01',
    reportedBy: 'JD',
    daysOpen: 29,
    overdueBy: 14
  },
];

const Status: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<Status | 'All'>('All');
  const [sortField, setSortField] = useState<keyof FaultItem>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Filter faults based on selected status
  const filteredFaults = selectedStatus === 'All' 
    ? mockFaults 
    : mockFaults.filter(fault => fault.status === selectedStatus);

  // Sort faults based on sort field and direction
  const sortedFaults = [...filteredFaults].sort((a, b) => {
    if (sortField === 'date') {
      return sortDirection === 'asc' 
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortField === 'daysOpen') {
      const aValue = a.daysOpen || 0;
      const bValue = b.daysOpen || 0;
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    } else {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return 0;
    }
  });

  // Count faults by status
  const statusCounts = {
    All: mockFaults.length,
    Outstanding: mockFaults.filter(f => f.status === 'Outstanding').length,
    'Parts Ordered': mockFaults.filter(f => f.status === 'Parts Ordered').length,
    Completed: mockFaults.filter(f => f.status === 'Completed').length,
  };

  // Handle sort toggle
  const handleSort = (field: keyof FaultItem) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Status Tracking</h1>
        <Button>
          <AlertCircle className="mr-2 h-4 w-4" />
          Report New Fault
        </Button>
      </div>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className={`${selectedStatus === 'All' ? 'border-primary' : ''} hover:border-primary cursor-pointer transition-colors`} onClick={() => setSelectedStatus('All')}>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">All Faults</p>
              <h3 className="text-2xl font-semibold mt-1">{statusCounts.All}</h3>
            </div>
            <div className="rounded-full p-2 bg-secondary">
              <Clock className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card className={`${selectedStatus === 'Outstanding' ? 'border-destructive' : ''} hover:border-destructive cursor-pointer transition-colors`} onClick={() => setSelectedStatus('Outstanding')}>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Outstanding</p>
              <h3 className="text-2xl font-semibold mt-1">{statusCounts.Outstanding}</h3>
            </div>
            <div className="rounded-full p-2 bg-destructive/10">
              <AlertCircle className="h-5 w-5 text-destructive" />
            </div>
          </CardContent>
        </Card>
        
        <Card className={`${selectedStatus === 'Parts Ordered' ? 'border-warning' : ''} hover:border-warning cursor-pointer transition-colors`} onClick={() => setSelectedStatus('Parts Ordered')}>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Parts Ordered</p>
              <h3 className="text-2xl font-semibold mt-1">{statusCounts['Parts Ordered']}</h3>
            </div>
            <div className="rounded-full p-2 bg-warning/10">
              <Package className="h-5 w-5 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className={`${selectedStatus === 'Completed' ? 'border-success' : ''} hover:border-success cursor-pointer transition-colors`} onClick={() => setSelectedStatus('Completed')}>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Completed</p>
              <h3 className="text-2xl font-semibold mt-1">{statusCounts.Completed}</h3>
            </div>
            <div className="rounded-full p-2 bg-success/10">
              <CheckCircle className="h-5 w-5 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fault Status Table */}
      <Card className="animate-scale-in">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {selectedStatus === 'All' ? 'All Faults' : `${selectedStatus} Faults`}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filter by:</span>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={selectedStatus === 'All' ? "bg-primary/10 text-primary" : ""}
                  onClick={() => setSelectedStatus('All')}
                >
                  All
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={selectedStatus === 'Outstanding' ? "bg-destructive/10 text-destructive" : ""}
                  onClick={() => setSelectedStatus('Outstanding')}
                >
                  Outstanding
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={selectedStatus === 'Parts Ordered' ? "bg-warning/10 text-warning" : ""}
                  onClick={() => setSelectedStatus('Parts Ordered')}
                >
                  Parts Ordered
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={selectedStatus === 'Completed' ? "bg-success/10 text-success" : ""}
                  onClick={() => setSelectedStatus('Completed')}
                >
                  Completed
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-12 border-b py-3 px-4 bg-muted/50">
              <div className="col-span-2 font-medium text-sm flex items-center cursor-pointer" onClick={() => handleSort('id')}>
                Reference
                {sortField === 'id' && (
                  <ArrowUpDown className={`h-3 w-3 ml-1 ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                )}
              </div>
              <div className="col-span-2 font-medium text-sm flex items-center cursor-pointer" onClick={() => handleSort('carPark')}>
                Car Park
                {sortField === 'carPark' && (
                  <ArrowUpDown className={`h-3 w-3 ml-1 ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                )}
              </div>
              <div className="col-span-1 font-medium text-sm">Equipment</div>
              <div className="col-span-3 font-medium text-sm">Description</div>
              <div className="col-span-1 font-medium text-sm">Status</div>
              <div className="col-span-1 font-medium text-sm flex items-center cursor-pointer" onClick={() => handleSort('date')}>
                Date
                {sortField === 'date' && (
                  <ArrowUpDown className={`h-3 w-3 ml-1 ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                )}
              </div>
              <div className="col-span-1 font-medium text-sm">By</div>
              <div className="col-span-1 font-medium text-sm flex items-center cursor-pointer" onClick={() => handleSort('daysOpen')}>
                Days Open
                {sortField === 'daysOpen' && (
                  <ArrowUpDown className={`h-3 w-3 ml-1 ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                )}
              </div>
            </div>
            {sortedFaults.length > 0 ? (
              sortedFaults.map((fault) => (
                <div key={fault.id} className={`grid grid-cols-12 border-b py-3 px-4 hover:bg-muted/20 transition-colors ${fault.overdueBy ? 'bg-destructive/5' : ''}`}>
                  <div className="col-span-2 text-sm font-medium text-primary">{fault.id}</div>
                  <div className="col-span-2 text-sm truncate">{fault.carPark}</div>
                  <div className="col-span-1 text-sm">{fault.equipment}</div>
                  <div className="col-span-3 text-sm truncate">{fault.description}</div>
                  <div className="col-span-1">
                    <StatusBadge status={fault.status} />
                  </div>
                  <div className="col-span-1 text-sm text-muted-foreground">{fault.date}</div>
                  <div className="col-span-1 text-sm">{fault.reportedBy}</div>
                  <div className="col-span-1 text-sm">
                    {fault.daysOpen} {fault.overdueBy && (
                      <span className="text-destructive font-medium">+{fault.overdueBy}</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                No faults found with the selected status.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Status;
