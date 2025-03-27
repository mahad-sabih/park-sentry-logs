
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Package, Search, Plus, Download, Filter, ArrowUpDown, PenLine, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample data
const initialParts = [
  { id: 1, name: 'Barrier Arm', category: 'Mechanical', stock: 12, location: 'Warehouse A', minStock: 5, price: 149.99, status: 'In Stock' },
  { id: 2, name: 'Control Board', category: 'Electronic', stock: 5, location: 'Warehouse A', minStock: 3, price: 299.50, status: 'In Stock' },
  { id: 3, name: 'Ticket Printer Head', category: 'Electronic', stock: 2, location: 'Warehouse B', minStock: 3, price: 199.75, status: 'Low Stock' },
  { id: 4, name: 'Proximity Reader', category: 'Electronic', stock: 7, location: 'Warehouse A', minStock: 5, price: 85.25, status: 'In Stock' },
  { id: 5, name: 'Signal Cable (50m)', category: 'Electrical', stock: 0, location: 'Warehouse B', minStock: 2, price: 45.00, status: 'Out of Stock' },
  { id: 6, name: 'Mounting Bracket', category: 'Mechanical', stock: 20, location: 'Warehouse A', minStock: 10, price: 35.75, status: 'In Stock' },
  { id: 7, name: 'Motor Assembly', category: 'Mechanical', stock: 4, location: 'Warehouse C', minStock: 2, price: 245.50, status: 'In Stock' },
  { id: 8, name: 'Camera Unit', category: 'Electronic', stock: 1, location: 'Warehouse B', minStock: 2, price: 399.99, status: 'Low Stock' },
  { id: 9, name: 'LED Display', category: 'Electronic', stock: 3, location: 'Warehouse A', minStock: 3, price: 175.00, status: 'In Stock' },
  { id: 10, name: 'Power Supply', category: 'Electrical', stock: 0, location: 'Warehouse C', minStock: 5, price: 89.95, status: 'Out of Stock' },
];

const categories = ['Mechanical', 'Electronic', 'Electrical'];
const locations = ['Warehouse A', 'Warehouse B', 'Warehouse C'];
const stockStatuses = ['In Stock', 'Low Stock', 'Out of Stock'];

const PartsManagement = () => {
  const [parts, setParts] = useState(initialParts);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const { toast } = useToast();

  // Handle sorting logic
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Filter and sort parts
  const filteredParts = parts
    .filter(part => 
      (part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       part.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (categoryFilter ? part.category === categoryFilter : true) &&
      (locationFilter ? part.location === locationFilter : true) &&
      (statusFilter ? part.status === statusFilter : true)
    )
    .sort((a, b) => {
      const aValue = a[sortColumn as keyof typeof a];
      const bValue = b[sortColumn as keyof typeof b];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddPart = () => {
    toast({
      title: "Feature Coming Soon",
      description: "The add part functionality will be available in the next update.",
    });
  };

  const handleEditPart = (id: number) => {
    toast({
      title: "Edit Part",
      description: `Editing part #${id} - This functionality will be implemented soon.`,
    });
  };

  const handleDeletePart = (id: number) => {
    toast({
      title: "Delete Part",
      description: `Deleting part #${id} - This functionality will be implemented soon.`,
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export Initiated",
      description: "Parts inventory data export has been initiated.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Parts Management</h2>
          <p className="text-muted-foreground">
            Manage your inventory of replacement parts and components
          </p>
        </div>
        <Button onClick={handleAddPart}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Part
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="col-span-4">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Parts Inventory</CardTitle>
              <Button variant="outline" size="sm" onClick={handleExportData}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
            <CardDescription>
              Manage and track your inventory of spare parts and components.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search parts..."
                  className="w-full pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-categories">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-locations">All Locations</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-statuses">All Statuses</SelectItem>
                    {stockStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                      <div className="flex items-center">
                        Part Name
                        {sortColumn === 'name' && (
                          <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('category')}>
                      <div className="flex items-center">
                        Category
                        {sortColumn === 'category' && (
                          <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer text-right" onClick={() => handleSort('stock')}>
                      <div className="flex items-center justify-end">
                        Stock
                        {sortColumn === 'stock' && (
                          <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredParts.map((part) => (
                    <TableRow key={part.id}>
                      <TableCell className="font-medium">{part.id}</TableCell>
                      <TableCell>{part.name}</TableCell>
                      <TableCell>{part.category}</TableCell>
                      <TableCell className="text-right">
                        {part.stock} / {part.minStock}
                      </TableCell>
                      <TableCell>{part.location}</TableCell>
                      <TableCell className="text-right">${part.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStockStatusColor(part.status)}>
                          {part.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditPart(part.id)}>
                            <PenLine className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeletePart(part.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredParts.length} of {parts.length} parts
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PartsManagement;
