
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  SlidersHorizontal, 
  Download,
} from 'lucide-react';

// Import our refactored components
import FaultsList from '@/components/fault-reports/FaultsList';
import FaultFilters from '@/components/fault-reports/FaultFilters';
import FaultDetailsDialog from '@/components/fault-reports/FaultDetailsDialog';
import AddFaultDialog from '@/components/fault-reports/AddFaultDialog';

// Import types and data
import { 
  faultReportsData, 
  carParks, 
  equipmentTypes, 
  statuses 
} from '@/types/fault-report';

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
        
        <AddFaultDialog 
          isOpen={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          carParks={carParks}
          equipmentTypes={equipmentTypes}
        />
        
        <FaultDetailsDialog 
          selectedFaultId={selectedFault}
          faultReportsData={faultReportsData}
          onOpenChange={(open) => !open && setSelectedFault(null)}
          statuses={statuses}
        />
      </div>
      
      <Card className="animate-fade-in">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Filter Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <FaultFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCarPark={selectedCarPark}
            setSelectedCarPark={setSelectedCarPark}
            selectedEquipmentType={selectedEquipmentType}
            setSelectedEquipmentType={setSelectedEquipmentType}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            carParks={carParks}
            equipmentTypes={equipmentTypes}
            statuses={statuses}
          />
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
          <FaultsList 
            faults={filteredFaults}
            onViewFault={handleViewFault}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default FaultReports;
