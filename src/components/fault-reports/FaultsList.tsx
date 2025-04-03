
import React from 'react';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/StatusBadge';
import { FaultReportType } from '@/types/fault-report';

interface FaultsListProps {
  faults: FaultReportType[];
  onViewFault: (faultId: string) => void;
}

const FaultsList: React.FC<FaultsListProps> = ({ faults, onViewFault }) => {
  return (
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
      {faults.length === 0 ? (
        <div className="py-8 text-center text-muted-foreground">
          No fault reports found matching your criteria.
        </div>
      ) : (
        faults.map((fault) => (
          <div key={fault.id} className="grid grid-cols-12 border-b py-3 px-4 hover:bg-muted/20 transition-colors">
            <div className="col-span-1 text-sm font-medium text-primary">{fault.id}</div>
            <div className="col-span-1 text-sm">{fault.date}</div>
            <div className="col-span-2 text-sm">{fault.carPark}</div>
            <div className="col-span-2 text-sm">{fault.equipment}</div>
            <div className="col-span-3 text-sm truncate" title={fault.description}>{fault.description}</div>
            <div className="col-span-1">
              <StatusBadge status={fault.status} />
            </div>
            <div className="col-span-1 text-sm">{fault.reportedBy}</div>
            <div className="col-span-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 px-2"
                onClick={() => onViewFault(fault.id)}
              >
                View
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FaultsList;
