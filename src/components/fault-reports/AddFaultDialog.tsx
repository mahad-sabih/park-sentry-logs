
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface AddFaultDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  carParks: string[];
  equipmentTypes: string[];
}

const AddFaultDialog: React.FC<AddFaultDialogProps> = ({
  isOpen,
  onOpenChange,
  carParks,
  equipmentTypes,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => onOpenChange(false)}>Create Fault Report</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddFaultDialog;
