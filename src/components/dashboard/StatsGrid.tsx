
import React from 'react';
import { BarChart as BarChartIcon, AlertCircle, CheckCircle, Package } from 'lucide-react';
import StatCard from '@/components/StatCard';

interface StatsGridProps {
  stats: {
    totalFaults: number;
    activeFaults: number;
    resolvedFaults: number;
    partsOrdered: number;
  };
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Total Faults" 
        value={stats.totalFaults} 
        icon={<BarChartIcon className="h-4 w-4 text-primary" />}
        description="All time recorded faults"
        className="animate-slide-up"
      />
      <StatCard 
        title="Active Faults" 
        value={stats.activeFaults} 
        icon={<AlertCircle className="h-4 w-4 text-destructive" />}
        description="Faults requiring attention"
        change={{ value: 5, positive: false }}
        className="animate-slide-up animation-delay-100"
      />
      <StatCard 
        title="Parts Ordered" 
        value={stats.partsOrdered} 
        icon={<Package className="h-4 w-4 text-warning" />}
        description="Waiting for delivery"
        className="animate-slide-up animation-delay-200"
      />
      <StatCard 
        title="Resolved This Month" 
        value={stats.resolvedFaults} 
        icon={<CheckCircle className="h-4 w-4 text-success" />}
        description="Successfully fixed"
        change={{ value: 12, positive: true }}
        className="animate-slide-up animation-delay-300"
      />
    </div>
  );
};

export default StatsGrid;
