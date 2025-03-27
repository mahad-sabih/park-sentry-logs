
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Search as SearchIcon, 
  Filter, 
  X, 
  Calendar,
  ParkingCircle,
  Cog,
  ClipboardList 
} from "lucide-react";

interface SearchResult {
  id: string;
  type: 'car-park' | 'equipment' | 'fault';
  title: string;
  description: string;
  date: string;
  status?: 'outstanding' | 'parts-ordered' | 'completed';
}

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock data for demonstration
  const mockResults: SearchResult[] = [
    {
      id: "cp001",
      type: 'car-park',
      title: "Central Mall Car Park",
      description: "Main parking facility for Central Mall",
      date: "2023-04-15",
    },
    {
      id: "eq002",
      type: 'equipment',
      title: "Entrance Barrier A1",
      description: "Main entrance barrier at Central Mall",
      date: "2023-05-20",
    },
    {
      id: "ft003",
      type: 'fault',
      title: "Ticket Machine Malfunction",
      description: "Ticket machine not printing receipts at exit booth",
      date: "2023-06-10",
      status: 'outstanding',
    },
    {
      id: "ft004",
      type: 'fault',
      title: "Payment Terminal Error",
      description: "Card payments not processing at exit B2",
      date: "2023-06-12",
      status: 'parts-ordered',
    },
    {
      id: "eq005",
      type: 'equipment',
      title: "CCTV Camera #12",
      description: "Security camera monitoring level 3",
      date: "2023-03-25",
    },
    {
      id: "ft006",
      type: 'fault',
      title: "Light Failure Zone C",
      description: "Multiple lights not working in section C",
      date: "2023-06-14",
      status: 'completed',
    },
  ];

  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      const filtered = mockResults.filter(result => {
        const matchesQuery = searchQuery === "" || 
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesFilters = activeFilters.length === 0 || 
          activeFilters.includes(result.type) || 
          (result.status && activeFilters.includes(result.status));
        
        return matchesQuery && matchesFilters;
      });
      
      setSearchResults(filtered);
      setIsSearching(false);
    }, 500);
  };

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  const clearFilters = () => {
    setActiveFilters([]);
  };

  const renderStatusBadge = (status?: string) => {
    if (!status) return null;
    
    switch(status) {
      case 'outstanding':
        return <Badge className="status-badge-outstanding">Outstanding</Badge>;
      case 'parts-ordered':
        return <Badge className="status-badge-parts">Parts Ordered</Badge>;
      case 'completed':
        return <Badge className="status-badge-completed">Completed</Badge>;
      default:
        return null;
    }
  };
  
  const getIconForType = (type: string) => {
    switch(type) {
      case 'car-park':
        return <ParkingCircle className="h-4 w-4 text-primary mr-2" />;
      case 'equipment':
        return <Cog className="h-4 w-4 text-primary mr-2" />;
      case 'fault':
        return <ClipboardList className="h-4 w-4 text-primary mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-semibold">Search & Filters</h1>
        <p className="text-muted-foreground">Search across car parks, equipment, and fault reports</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by keyword..."
                className="pl-9 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium mr-1">Filters:</span>
              <Button 
                variant={activeFilters.includes('car-park') ? "default" : "outline"} 
                size="sm"
                className="rounded-full"
                onClick={() => toggleFilter('car-park')}
              >
                <ParkingCircle className="h-3.5 w-3.5 mr-1.5" />
                Car Parks
              </Button>
              <Button 
                variant={activeFilters.includes('equipment') ? "default" : "outline"} 
                size="sm" 
                className="rounded-full"
                onClick={() => toggleFilter('equipment')}
              >
                <Cog className="h-3.5 w-3.5 mr-1.5" />
                Equipment
              </Button>
              <Button 
                variant={activeFilters.includes('fault') ? "default" : "outline"} 
                size="sm" 
                className="rounded-full"
                onClick={() => toggleFilter('fault')}
              >
                <ClipboardList className="h-3.5 w-3.5 mr-1.5" />
                Faults
              </Button>
              <Button 
                variant={activeFilters.includes('outstanding') ? "default" : "outline"} 
                size="sm" 
                className="rounded-full"
                onClick={() => toggleFilter('outstanding')}
              >
                Outstanding
              </Button>
              <Button 
                variant={activeFilters.includes('parts-ordered') ? "default" : "outline"} 
                size="sm" 
                className="rounded-full"
                onClick={() => toggleFilter('parts-ordered')}
              >
                Parts Ordered
              </Button>
              <Button 
                variant={activeFilters.includes('completed') ? "default" : "outline"} 
                size="sm" 
                className="rounded-full"
                onClick={() => toggleFilter('completed')}
              >
                Completed
              </Button>
              
              {activeFilters.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="rounded-full text-muted-foreground"
                  onClick={clearFilters}
                >
                  <X className="h-3.5 w-3.5 mr-1.5" />
                  Clear All
                </Button>
              )}
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleSearch} disabled={isSearching}>
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {searchResults.length > 0 && (
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Results ({searchResults.length})</TabsTrigger>
            <TabsTrigger value="car-parks">Car Parks ({searchResults.filter(r => r.type === 'car-park').length})</TabsTrigger>
            <TabsTrigger value="equipment">Equipment ({searchResults.filter(r => r.type === 'equipment').length})</TabsTrigger>
            <TabsTrigger value="faults">Faults ({searchResults.filter(r => r.type === 'fault').length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {searchResults.map(result => (
              <Card key={result.id} className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center mb-1">
                        {getIconForType(result.type)}
                        <span className="text-sm font-medium text-muted-foreground capitalize">{result.type.replace('-', ' ')}</span>
                      </div>
                      <h3 className="text-lg font-medium">{result.title}</h3>
                      <p className="text-muted-foreground mt-1">{result.description}</p>
                    </div>
                    <div className="text-right flex flex-col items-end space-y-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                        <span className="text-sm text-muted-foreground">{result.date}</span>
                      </div>
                      {renderStatusBadge(result.status)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="car-parks" className="space-y-4">
            {searchResults.filter(r => r.type === 'car-park').map(result => (
              <Card key={result.id} className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center mb-1">
                        {getIconForType(result.type)}
                        <span className="text-sm font-medium text-muted-foreground capitalize">{result.type.replace('-', ' ')}</span>
                      </div>
                      <h3 className="text-lg font-medium">{result.title}</h3>
                      <p className="text-muted-foreground mt-1">{result.description}</p>
                    </div>
                    <div className="text-right flex flex-col items-end space-y-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                        <span className="text-sm text-muted-foreground">{result.date}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="equipment" className="space-y-4">
            {searchResults.filter(r => r.type === 'equipment').map(result => (
              <Card key={result.id} className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center mb-1">
                        {getIconForType(result.type)}
                        <span className="text-sm font-medium text-muted-foreground capitalize">{result.type.replace('-', ' ')}</span>
                      </div>
                      <h3 className="text-lg font-medium">{result.title}</h3>
                      <p className="text-muted-foreground mt-1">{result.description}</p>
                    </div>
                    <div className="text-right flex flex-col items-end space-y-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                        <span className="text-sm text-muted-foreground">{result.date}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="faults" className="space-y-4">
            {searchResults.filter(r => r.type === 'fault').map(result => (
              <Card key={result.id} className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center mb-1">
                        {getIconForType(result.type)}
                        <span className="text-sm font-medium text-muted-foreground capitalize">{result.type.replace('-', ' ')}</span>
                      </div>
                      <h3 className="text-lg font-medium">{result.title}</h3>
                      <p className="text-muted-foreground mt-1">{result.description}</p>
                    </div>
                    <div className="text-right flex flex-col items-end space-y-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                        <span className="text-sm text-muted-foreground">{result.date}</span>
                      </div>
                      {renderStatusBadge(result.status)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      )}
      
      {searchQuery && searchResults.length === 0 && !isSearching && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <SearchIcon className="h-10 w-10 text-muted-foreground/60 mb-4" />
            <h3 className="text-lg font-medium">No results found</h3>
            <p className="text-muted-foreground text-center mt-2 max-w-md">
              No matches found for "{searchQuery}". Try adjusting your search terms or filters.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchPage;
