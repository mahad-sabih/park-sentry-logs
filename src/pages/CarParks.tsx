
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Edit, 
  ParkingCircle, 
  Plus, 
  Trash, 
  ArrowUpRight
} from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Mock data for car parks
const carParksData = [
  {
    id: 'cp1',
    name: 'Virginia Water',
    location: 'North entrance, Windsor Great Park',
    totalEquipment: 8,
    activeFaults: 5,
    partsOrdered: 2,
    resolvedFaults: 12,
    lastUpdated: '2023-04-10',
    equipmentTypes: ['POF', 'Entry', 'Exit']
  },
  {
    id: 'cp2',
    name: 'Virginia Water South',
    location: 'South side, near visitor center',
    totalEquipment: 6,
    activeFaults: 2,
    partsOrdered: 1,
    resolvedFaults: 8,
    lastUpdated: '2023-04-11',
    equipmentTypes: ['POF', 'Entry', 'Exit']
  },
  {
    id: 'cp3',
    name: 'Savill Garden',
    location: 'Adjacent to Savill Garden',
    totalEquipment: 7,
    activeFaults: 4,
    partsOrdered: 0,
    resolvedFaults: 10,
    lastUpdated: '2023-04-09',
    equipmentTypes: ['POF', 'Entry', 'Exit']
  },
  {
    id: 'cp4',
    name: 'Wick',
    location: 'Near Englefield Green',
    totalEquipment: 5,
    activeFaults: 1,
    partsOrdered: 1,
    resolvedFaults: 6,
    lastUpdated: '2023-04-12',
    equipmentTypes: ['POF', 'Entry', 'Exit']
  },
  {
    id: 'cp5',
    name: 'Rangers',
    location: 'Staff parking area',
    totalEquipment: 4,
    activeFaults: 0,
    partsOrdered: 0,
    resolvedFaults: 5,
    lastUpdated: '2023-04-08',
    equipmentTypes: ['Entry', 'Exit']
  },
  {
    id: 'cp6',
    name: 'Cranbourne',
    location: 'Near Cranbourne Gate',
    totalEquipment: 6,
    activeFaults: 3,
    partsOrdered: 2,
    resolvedFaults: 9,
    lastUpdated: '2023-04-07',
    equipmentTypes: ['POF', 'Entry', 'Exit']
  }
];

const CarParks: React.FC = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCarParkName, setNewCarParkName] = useState('');
  const [newCarParkLocation, setNewCarParkLocation] = useState('');

  const handleAddCarPark = () => {
    // In a real application, we would add the car park to the database
    // and update the UI accordingly
    console.log('Adding car park:', { name: newCarParkName, location: newCarParkLocation });
    
    // Reset form and close dialog
    setNewCarParkName('');
    setNewCarParkLocation('');
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Car Parks</h1>
          <p className="text-muted-foreground">Manage all car park locations and their equipment</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="whitespace-nowrap">
              <Plus className="mr-2 h-4 w-4" />
              Add Car Park
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Car Park</DialogTitle>
              <DialogDescription>
                Enter the details for the new car park location.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  placeholder="e.g. Virginia Water East" 
                  value={newCarParkName}
                  onChange={(e) => setNewCarParkName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  placeholder="e.g. East entrance, Windsor Great Park" 
                  value={newCarParkLocation}
                  onChange={(e) => setNewCarParkLocation(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddCarPark}>Save Car Park</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {carParksData.map((carPark, index) => (
          <Card key={carPark.id} className={`animate-scale-in animation-delay-${index * 100} card-transition hover-scale`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{carPark.name}</CardTitle>
                  <CardDescription className="mt-1">{carPark.location}</CardDescription>
                </div>
                <ParkingCircle className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center justify-between py-1">
                <span className="text-sm">Equipment</span>
                <span className="font-medium">{carPark.totalEquipment}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-sm text-destructive flex items-center">
                  <AlertCircle className="mr-1.5 h-3.5 w-3.5" />
                  Active Faults
                </span>
                <span className="font-medium">{carPark.activeFaults}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-sm text-warning flex items-center">
                  <Clock className="mr-1.5 h-3.5 w-3.5" />
                  Parts Ordered
                </span>
                <span className="font-medium">{carPark.partsOrdered}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-sm text-success flex items-center">
                  <CheckCircle className="mr-1.5 h-3.5 w-3.5" />
                  Resolved
                </span>
                <span className="font-medium">{carPark.resolvedFaults}</span>
              </div>
              <div className="mt-4">
                <span className="text-xs text-muted-foreground">Equipment Types:</span>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  {carPark.equipmentTypes.map((type) => (
                    <span key={type} className="bg-muted px-2 py-0.5 rounded-full text-xs">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <div className="text-xs text-muted-foreground">
                Updated {carPark.lastUpdated}
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CarParks;
