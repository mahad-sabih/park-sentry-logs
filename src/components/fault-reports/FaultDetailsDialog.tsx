
import React from 'react';
import { Label } from '@/components/ui/label';
import { Sparkles } from 'lucide-react';
import { FaultReportType } from '@/types/fault-report';
import StatusBadge from '@/components/StatusBadge';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

interface FaultDetailsDialogProps {
  selectedFaultId: string | null;
  faultReportsData: FaultReportType[];
  onOpenChange: (open: boolean) => void;
  statuses: string[];
}

const FaultDetailsDialog: React.FC<FaultDetailsDialogProps> = ({
  selectedFaultId,
  faultReportsData,
  onOpenChange,
  statuses
}) => {
  const selectedFault = selectedFaultId 
    ? faultReportsData.find((f) => f.id === selectedFaultId) 
    : null;
    
  if (!selectedFault) return null;

  return (
    <Dialog open={!!selectedFaultId} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Fault Report Details</DialogTitle>
          <DialogDescription>
            Reference: {selectedFault.id} 
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-muted-foreground">Car Park</Label>
              <p className="font-medium">{selectedFault.carPark}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Equipment</Label>
              <p className="font-medium">{selectedFault.equipment} ({selectedFault.equipmentType})</p>
            </div>
          </div>
          <div>
            <Label className="text-muted-foreground">Description</Label>
            <p className="font-medium">{selectedFault.description}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <Label className="text-muted-foreground">AI Suggestions</Label>
              <Sparkles className="h-4 w-4 text-blue-500" />
            </div>
            <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
              {selectedFault.aiSuggestions?.map((suggestion, index) => (
                <div key={index} className="mb-1 last:mb-0">
                  - {suggestion}
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-muted-foreground">Date Reported</Label>
              <p className="font-medium">{selectedFault.date}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Reported By</Label>
              <p className="font-medium">{selectedFault.reportedBy}</p>
            </div>
          </div>
          <div>
            <Label className="text-muted-foreground">Status</Label>
            <div className="mt-1">
              <StatusBadge status={selectedFault.status} />
            </div>
          </div>
          <div>
            <Label className="text-muted-foreground">Notes</Label>
            <p>{selectedFault.notes}</p>
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
            <Select defaultValue={selectedFault.status}>
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
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => onOpenChange(false)}>Update Fault</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FaultDetailsDialog;
