
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FaultFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCarPark: string | null;
  setSelectedCarPark: (carPark: string | null) => void;
  selectedEquipmentType: string | null;
  setSelectedEquipmentType: (type: string | null) => void;
  selectedStatus: string | null;
  setSelectedStatus: (status: string | null) => void;
  carParks: string[];
  equipmentTypes: string[];
  statuses: string[];
}

const FaultFilters: React.FC<FaultFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCarPark,
  setSelectedCarPark,
  selectedEquipmentType,
  setSelectedEquipmentType,
  selectedStatus,
  setSelectedStatus,
  carParks,
  equipmentTypes,
  statuses
}) => {
  return (
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
  );
};

export default FaultFilters;
