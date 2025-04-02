
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";

interface Fault {
  id: string;
  carPark: string;
  equipment: string;
  description: string;
  status: string;
  date: string;
  daysOpen: number;
  overdueBy?: number;
  expectedResolution: string;
}

interface RecentFaultsProps {
  faults: Fault[];
  carParks: string[];
}

const RecentFaults: React.FC<RecentFaultsProps> = ({ faults, carParks }) => {
  const [selectedCarPark, setSelectedCarPark] = useState<string | null>(null);
  
  // Filter function for recent faults
  const filteredFaults = selectedCarPark && selectedCarPark !== 'All'
    ? faults.filter(fault => fault.carPark === selectedCarPark)
    : faults;

  return (
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
  );
};

export default RecentFaults;
