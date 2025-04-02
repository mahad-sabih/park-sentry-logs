
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface CarParkData {
  name: string;
  value: number;
}

interface FaultsByLocationProps {
  data: CarParkData[];
  totalFaults: number;
}

const FaultsByLocation: React.FC<FaultsByLocationProps> = ({ data, totalFaults }) => {
  return (
    <Card className="col-span-1 lg:col-span-3 animate-scale-in animation-delay-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Faults by Location</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((carPark, index) => (
            <div key={carPark.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{carPark.name}</span>
                <span className="text-sm text-muted-foreground">{carPark.value}</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary"
                  style={{ width: `${(carPark.value / totalFaults) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FaultsByLocation;
