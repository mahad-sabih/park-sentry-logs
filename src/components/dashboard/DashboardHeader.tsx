
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

const DashboardHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <Button>
        <AlertCircle className="mr-2 h-4 w-4" />
        Report New Fault
      </Button>
    </div>
  );
};

export default DashboardHeader;
