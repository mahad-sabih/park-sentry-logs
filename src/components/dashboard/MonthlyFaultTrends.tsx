
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MonthlyFaultsData {
  name: string;
  faults: number;
}

interface MonthlyFaultTrendsProps {
  data: MonthlyFaultsData[];
}

const MonthlyFaultTrends: React.FC<MonthlyFaultTrendsProps> = ({ data }) => {
  return (
    <Card className="col-span-1 lg:col-span-4 animate-scale-in animation-delay-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Monthly Fault Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="faults" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyFaultTrends;
