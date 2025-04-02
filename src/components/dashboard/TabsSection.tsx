
import React from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface TabsSectionProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsSection: React.FC<TabsSectionProps> = ({ activeTab, setActiveTab }) => {
  return (
    <Card>
      <CardHeader className="pb-0">
        <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="Fault Reports">Fault Reports</TabsTrigger>
            <TabsTrigger value="Equipment">Equipment</TabsTrigger>
            <TabsTrigger value="Analytics">Analytics</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
    </Card>
  );
};

export default TabsSection;
