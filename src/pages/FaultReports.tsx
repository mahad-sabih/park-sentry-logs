import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  AlertCircle, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Clock, 
  Calendar,
  Download,
  Plus,
  Sparkles
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatusBadge from '@/components/StatusBadge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

// Mock data for fault reports
const faultReportsData = [
  {
    id: 'F32145',
    date: '2023-04-12',
    carPark: 'Virginia Water',
    equipment: 'POF 3',
    equipmentType: 'POF',
    description: 'Display showing error code E45, screen flickers and then goes blank',
    reportedBy: 'JD',
    status: 'Outstanding',
    notes: 'Tried power cycling but issue persists',
    aiSuggestions: [
      '78% of similar cases, replacing the display cable resolved E45 errors',
      '62% of flickering display issues were power-related'
    ]
  },
  {
    id: 'F32141',
    date: '2023-04-10',
    carPark: 'Savill Garden',
    equipment: 'Entry 1',
    equipmentType: 'Entry',
    description: 'Barrier not raising fully, stops at about 70% elevation',
    reportedBy: 'KA',
    status: 'Parts Ordered',
    notes: 'Appears to be mechanical issue with arm. Ordered replacement hydraulic unit',
    aiSuggestions: [
      '83% of partial barrier elevation issues were resolved by adjusting the tension springs',
      '45% of cases involved debris in the barrier track'
    ]
  },
  {
    id: 'F32140',
    date: '2023-04-10',
    carPark: 'Virginia Water South',
    equipment: 'Exit 3',
    equipmentType: 'Exit',
    description: 'Barrier arm detached from mechanism',
    reportedBy: 'JD',
    status: 'Parts Ordered',
    notes: 'Arm attachment bracket broken. Replacement ordered from Skidata',
    aiSuggestions: [
      '91% of detached barrier arms required bracket replacement',
      '24% of cases showed evidence of impact damage'
    ]
  },
  {
    id: 'F32137',
    date: '2023-04-08',
    carPark: 'Cranbourne',
    equipment: 'Exit 2',
    equipmentType: 'Exit',
    description: 'Card reader not accepting payments, shows red light on insertion',
    reportedBy: 'JD',
    status: 'Completed',
    notes: 'Card reader head cleaned and recalibrated. Now working normally',
    aiSuggestions: [
      '67% of card reader failures were resolved by cleaning the reader head',
      '32% required recalibration of the magnetic sensors'
    ]
  },
  {
    id: 'F32136',
    date: '2023-04-08',
    carPark: 'Virginia Water',
    equipment: 'POF 2',
    equipmentType: 'POF',
    description: 'Receipt printer not working, error code P12',
    reportedBy: 'KA',
    status: 'Completed',
    notes: 'Paper jam cleared, printer realigned',
    aiSuggestions: [
      '74% of P12 error codes indicated paper jams',
      '18% were resolved by replacing the printer ribbon'
    ]
  },
  {
    id: 'F32135',
    date: '2023-04-07',
    carPark: 'Virginia Water South',
    equipment: 'POF 1',
    equipmentType: 'POF',
    description: 'Coin acceptor jammed, not taking any coins',
    reportedBy: 'JD',
    status: 'Completed',
    notes: 'Foreign object removed from coin slot. System tested and working properly',
    aiSuggestions: [
      '82% of coin acceptor jams were caused by foreign objects',
      '15% were resolved by recalibrating the coin recognition sensors'
    ]
  },
  {
    id: 'F32130',
    date: '2023-04-05',
    carPark: 'Wick',
    equipment: 'Entry 2',
    equipmentType: 'Entry',
    description: 'Ticket printer out of paper, showing error message',
    reportedBy: 'KA',
    status: 'Completed',
    notes: 'Refilled ticket paper and reset printer. Working normally',
    aiSuggestions: [
      '95% of ticket printer errors were resolved by replacing paper',
      '23% also required a system reset after paper replacement'
    ]
  },
];

const carParks = [
  'Virginia Water',
  'Virginia Water South',
  'Savill Garden',
  'Wick',
  'Rangers',
  'Cranbourne',
];

const equipmentTypes = ['POF', 'Entry', 'Exit'];

const statuses = ['Outstanding', 'Parts Ordered', 'Completed'];

const FaultReports: React.FC = () => {
  const [selectedCarPark, setSelectedCarPark] = useState<string | null>(null);
  const [selectedEquipmentType, setSelectedEquipmentType] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedFault, setSelectedFault] = useState<string | null>(null);
  
  const filteredFaults = faultReportsData.filter((fault) => {
    const matchesCarPark = selectedCarPark ? fault.carPark === selectedCarPark : true;
    const matchesType = selectedEquipmentType ? fault.equipmentType === selectedEquipmentType : true;
    const matchesStatus = selectedStatus ? fault.status === selectedStatus : true;
    const matchesSearch = searchQuery 
      ? fault.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
        fault.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fault.equipment.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    return matchesCarPark && matchesType && matchesStatus && matchesSearch;
  });

  const handleViewFault = (faultId: string) => {
    setSelectedFault(faultId);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Fault Reports</h1>
          <p className="text-muted-foreground">View and manage all fault reports across car parks</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="whitespace-nowrap">
              <Plus className="mr-2 h-4 w-4" />
              New Fault Report
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Report New Fault</DialogTitle>
              <DialogDescription>
                Fill out the form to create a new fault report.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="carPark">Car Park</Label>
                  <Select>
                    <SelectTrigger id="carPark">
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
                  <Label htmlFor="equipmentType">Equipment Type</Label>
                  <Select>
                    <SelectTrigger id="equipmentType">
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
                <Label htmlFor="equipment">Equipment</Label>
                <Select>
                  <SelectTrigger id="equipment">
                    <SelectValue placeholder="Select equipment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pof1">POF 1</SelectItem>
                    <SelectItem value="pof2">POF 2</SelectItem>
                    <SelectItem value="entry1">Entry 1</SelectItem>
                    <SelectItem value="exit1">Exit 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Fault Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe the fault in detail..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Initial Notes</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Any troubleshooting steps already taken..."
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reportedBy">Reported By (Initials)</Label>
                  <Input id="reportedBy" placeholder="e.g. JD" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="faultDate">Date</Label>
                  <Input id="faultDate" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>Create Fault Report</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={!!selectedFault} onOpenChange={(open) => !open && setSelectedFault(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Fault Report Details</DialogTitle>
              <DialogDescription>
                Reference: {selectedFault} 
              </DialogDescription>
            </DialogHeader>
            {selectedFault && (
              <div className="space-y-4 py-2">
                {(() => {
                  const fault = faultReportsData.find((f) => f.id === selectedFault);
                  if (!fault) return null;
                  
                  return (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-muted-foreground">Car Park</Label>
                          <p className="font-medium">{fault.carPark}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Equipment</Label>
                          <p className="font-medium">{fault.equipment} ({fault.equipmentType})</p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Description</Label>
                        <p className="font-medium">{fault.description}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5">
                          <Label className="text-muted-foreground">AI Suggestions</Label>
                          <Sparkles className="h-4 w-4 text-blue-500" />
                        </div>
                        <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                          {fault.aiSuggestions?.map((suggestion, index) => (
                            <div key={index} className="mb-1 last:mb-0">
                              - {suggestion}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-muted-foreground">Date Reported</Label>
                          <p className="font-medium">{fault.date}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Reported By</Label>
                          <p className="font-medium">{fault.reportedBy}</p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Status</Label>
                        <div className="mt-1">
                          <StatusBadge status={fault.status as any} />
                        </div>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Notes</Label>
                        <p>{fault.notes}</p>
                      </div>
                      <div className="space-y-2 pt-2">
                        <Label htmlFor="updateNotes">Update Notes</Label>
                        <Textarea 
                          id="updateNotes" 
                          placeholder="Add additional notes or update on this fault..."
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="updateStatus">Update Status</Label>
                        <Select defaultValue={fault.status}>
                          <SelectTrigger id="updateStatus">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            {statuses.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedFault(null)}>Cancel</Button>
              <Button onClick={() => setSelectedFault(null)}>Update Fault</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card className="animate-fade-in">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Filter Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by reference, description or equipment..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={selectedCarPark || ''} onValueChange={(value) => setSelectedCarPark(value || null)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Car Park" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-car-parks">All Car Parks</SelectItem>
                  {carParks.map((carPark) => (
                    <SelectItem key={carPark} value={carPark}>
                      {carPark}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedEquipmentType || ''} onValueChange={(value) => setSelectedEquipmentType(value || null)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Equipment Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-types">All Types</SelectItem>
                  {equipmentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus || ''} onValueChange={(value) => setSelectedStatus(value || null)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-statuses">All Statuses</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="animate-slide-up">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Fault Reports ({filteredFaults.length})</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              More Filters
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-12 border-b py-3 px-4 bg-muted/50">
              <div className="col-span-1 font-medium text-sm">Reference</div>
              <div className="col-span-1 font-medium text-sm">Date</div>
              <div className="col-span-2 font-medium text-sm">Car Park</div>
              <div className="col-span-2 font-medium text-sm">Equipment</div>
              <div className="col-span-3 font-medium text-sm">Description</div>
              <div className="col-span-1 font-medium text-sm">Status</div>
              <div className="col-span-1 font-medium text-sm">By</div>
              <div className="col-span-1 font-medium text-sm">Actions</div>
            </div>
            {filteredFaults.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                No fault reports found matching your criteria.
              </div>
            ) : (
              filteredFaults.map((fault) => (
                <div key={fault.id} className="grid grid-cols-12 border-b py-3 px-4 hover:bg-muted/20 transition-colors">
                  <div className="col-span-1 text-sm font-medium text-primary">{fault.id}</div>
                  <div className="col-span-1 text-sm">{fault.date}</div>
                  <div className="col-span-2 text-sm">{fault.carPark}</div>
                  <div className="col-span-2 text-sm">{fault.equipment}</div>
                  <div className="col-span-3 text-sm truncate" title={fault.description}>{fault.description}</div>
                  <div className="col-span-1">
                    <StatusBadge status={fault.status as any} />
                  </div>
                  <div className="col-span-1 text-sm">{fault.reportedBy}</div>
                  <div className="col-span-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 px-2"
                      onClick={() => handleViewFault(fault.id)}
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FaultReports;
