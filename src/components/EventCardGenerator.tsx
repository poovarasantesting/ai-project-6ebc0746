import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, MapPinIcon, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

const CARD_THEMES = [
  { id: "default", name: "Default", bgColor: "bg-white", textColor: "text-gray-900", accentColor: "bg-blue-500" },
  { id: "dark", name: "Dark", bgColor: "bg-gray-900", textColor: "text-white", accentColor: "bg-violet-500" },
  { id: "festive", name: "Festive", bgColor: "bg-red-50", textColor: "text-red-900", accentColor: "bg-red-500" },
  { id: "elegant", name: "Elegant", bgColor: "bg-slate-50", textColor: "text-slate-900", accentColor: "bg-amber-500" },
  { id: "nature", name: "Nature", bgColor: "bg-green-50", textColor: "text-green-900", accentColor: "bg-emerald-500" },
];

export default function EventCardGenerator() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("edit");
  const [eventData, setEventData] = useState({
    title: "Summer Beach Party",
    date: "2025-07-15",
    time: "19:00",
    location: "Sunset Beach Resort",
    description: "Join us for a night of fun, food, and music by the ocean!",
    theme: "default",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const selectedTheme = CARD_THEMES.find((theme) => theme.id === eventData.theme) || CARD_THEMES[0];

  const handleCopyToClipboard = () => {
    const cardElement = document.getElementById("event-card");
    if (cardElement) {
      // In a real app, you'd use a library to capture the card as an image
      // This is just a simple example that copies the text content
      navigator.clipboard.writeText(JSON.stringify(eventData, null, 2))
        .then(() => {
          toast({
            title: "Card copied!",
            description: "Event card details copied to clipboard",
          });
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
          toast({
            title: "Copy failed",
            description: "Could not copy card to clipboard",
            variant: "destructive",
          });
        });
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="container mx-auto max-w-5xl py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Event Card Generator</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="edit" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Event Details</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Event Title</Label>
                <Input 
                  id="title" 
                  name="title" 
                  value={eventData.title} 
                  onChange={handleInputChange}
                  placeholder="Enter event title"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input 
                    id="date" 
                    name="date" 
                    type="date" 
                    value={eventData.date} 
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input 
                    id="time" 
                    name="time" 
                    type="time" 
                    value={eventData.time} 
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  name="location" 
                  value={eventData.location} 
                  onChange={handleInputChange}
                  placeholder="Enter event location"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={eventData.description} 
                  onChange={handleInputChange}
                  placeholder="Describe your event"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="theme">Card Theme</Label>
                <select
                  id="theme"
                  name="theme"
                  value={eventData.theme}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {CARD_THEMES.map((theme) => (
                    <option key={theme.id} value={theme.id}>
                      {theme.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>
          
          <div className="flex justify-center">
            <Button onClick={() => setActiveTab("preview")}>
              Preview Card
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="preview" className="flex flex-col items-center">
          <div className="mb-6">
            <Button onClick={() => setActiveTab("edit")} variant="outline" className="mr-2">
              Back to Editor
            </Button>
            <Button onClick={handleCopyToClipboard}>
              Copy Card
            </Button>
          </div>
          
          <Card 
            id="event-card"
            className={cn(
              "w-full max-w-md shadow-lg overflow-hidden transition-all",
              selectedTheme.bgColor,
              selectedTheme.textColor
            )}
          >
            <div className={cn("h-2", selectedTheme.accentColor)}></div>
            <div className="p-6 space-y-4">
              <h2 className="text-2xl font-bold">{eventData.title}</h2>
              
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span>{formatDate(eventData.date)}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{eventData.time}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" />
                <span>{eventData.location}</span>
              </div>
              
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm">{eventData.description}</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}