
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, ArrowUpDown, PenLine, Trash2, Download, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample data
const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Administrator', department: 'Management', status: 'Active', lastActive: '2023-06-15T10:30:00' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Technician', department: 'Maintenance', status: 'Active', lastActive: '2023-06-14T15:45:00' },
  { id: 3, name: 'Robert Johnson', email: 'robert.j@example.com', role: 'Supervisor', department: 'Operations', status: 'Active', lastActive: '2023-06-15T09:15:00' },
  { id: 4, name: 'Emily Wilson', email: 'emily.w@example.com', role: 'Technician', department: 'Maintenance', status: 'Inactive', lastActive: '2023-05-20T11:20:00' },
  { id: 5, name: 'Michael Brown', email: 'michael.b@example.com', role: 'Manager', department: 'Operations', status: 'Active', lastActive: '2023-06-15T08:30:00' },
  { id: 6, name: 'Sarah Davis', email: 'sarah.d@example.com', role: 'Technician', department: 'Maintenance', status: 'Active', lastActive: '2023-06-14T16:10:00' },
  { id: 7, name: 'David Garcia', email: 'david.g@example.com', role: 'Administrator', department: 'IT', status: 'Active', lastActive: '2023-06-15T11:45:00' },
  { id: 8, name: 'Lisa Martinez', email: 'lisa.m@example.com', role: 'Manager', department: 'Customer Service', status: 'Inactive', lastActive: '2023-04-10T14:20:00' },
  { id: 9, name: 'Kevin Taylor', email: 'kevin.t@example.com', role: 'Technician', department: 'Maintenance', status: 'Active', lastActive: '2023-06-13T09:50:00' },
  { id: 10, name: 'Amanda White', email: 'amanda.w@example.com', role: 'Supervisor', department: 'Operations', status: 'Active', lastActive: '2023-06-14T13:15:00' },
];

const roles = ['Administrator', 'Manager', 'Supervisor', 'Technician'];
const departments = ['Management', 'Operations', 'Maintenance', 'IT', 'Customer Service'];
const statuses = ['Active', 'Inactive'];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
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

  // Filter and sort users
  const filteredUsers = users
    .filter(user => 
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (roleFilter ? user.role === roleFilter : true) &&
      (departmentFilter ? user.department === departmentFilter : true) &&
      (statusFilter ? user.status === statusFilter : true)
    )
    .sort((a, b) => {
      const aValue = a[sortColumn as keyof typeof a];
      const bValue = b[sortColumn as keyof typeof b];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      return 0;
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };

  const handleAddUser = () => {
    toast({
      title: "Feature Coming Soon",
      description: "The add user functionality will be available in the next update.",
    });
  };

  const handleEditUser = (id: number) => {
    toast({
      title: "Edit User",
      description: `Editing user #${id} - This functionality will be implemented soon.`,
    });
  };

  const handleDeleteUser = (id: number) => {
    toast({
      title: "Delete User",
      description: `Deleting user #${id} - This functionality will be implemented soon.`,
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export Initiated",
      description: "User data export has been initiated.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">
            Manage system users, roles, and permissions
          </p>
        </div>
        <Button onClick={handleAddUser}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="col-span-4">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>System Users</CardTitle>
              <Button variant="outline" size="sm" onClick={handleExportData}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
            <CardDescription>
              Manage user accounts, roles, and permissions for the Park Sentry system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="w-full pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-roles">All Roles</SelectItem>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-departments">All Departments</SelectItem>
                    {departments.map((department) => (
                      <SelectItem key={department} value={department}>
                        {department}
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
                    {statuses.map((status) => (
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
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                      <div className="flex items-center">
                        Name
                        {sortColumn === 'name' && (
                          <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('email')}>
                      <div className="flex items-center">
                        Email
                        {sortColumn === 'email' && (
                          <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('role')}>
                      <div className="flex items-center">
                        Role
                        {sortColumn === 'role' && (
                          <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('lastActive')}>
                      <div className="flex items-center">
                        Last Active
                        {sortColumn === 'lastActive' && (
                          <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                          </Avatar>
                          {user.name}
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(user.lastActive)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditUser(user.id)}>
                            <PenLine className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user.id)}>
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
              Showing {filteredUsers.length} of {users.length} users
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

export default UserManagement;
