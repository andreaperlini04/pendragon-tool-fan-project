import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Crown, Users, Skull } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNPCs, createNPC } from "@/lib/api";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type NPCData = {
  id: string | number;
  name: string;
  role: string;
  location: string;
  relationship: string;
  description: string;
  status: string;
};

const NPCCard = ({ npc }: { npc: NPCData }) => (
  <Card className="shadow-card hover:shadow-hover transition-smooth">
    <CardHeader>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <CardTitle className="text-xl mb-1">{npc.name}</CardTitle>
          <CardDescription>{npc.role}</CardDescription>
        </div>
        <Badge
          variant={npc.status === "ally" ? "default" : npc.status === "enemy" ? "destructive" : "secondary"}
        >
          {npc.relationship}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="space-y-3">
      <p className="text-sm text-muted-foreground">{npc.description}</p>
      <div className="text-sm">
        <span className="text-muted-foreground">Location: </span>
        <span className="font-medium">{npc.location}</span>
      </div>
    </CardContent>
  </Card>
);

const NPCs = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { data: allNPCs = [], isLoading, error } = useQuery({
    queryKey: ["npcs"],
    queryFn: fetchNPCs,
  });

  const mutation = useMutation({
    mutationFn: createNPC,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["npcs"] });
      setOpen(false);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      location: formData.get("location") as string,
      relationship: formData.get("relationship") as string,
      description: formData.get("description") as string,
      status: formData.get("status") as string,
    };
    mutation.mutate(data);
  };

  if (isLoading) return <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">Loading NPCs...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-center text-destructive">Failed to load NPCs.</div>;

  const npcs = {
    allies: allNPCs.filter((npc: any) => npc.status === "ally"),
    neutral: allNPCs.filter((npc: any) => npc.status === "neutral"),
    enemies: allNPCs.filter((npc: any) => npc.status === "enemy"),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">NPCs</h1>
          <p className="text-muted-foreground">Notable characters in your campaign</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-royal">
              <Plus className="h-4 w-4 mr-2" />
              New NPC
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create NPC</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" name="role" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship</Label>
                  <Input id="relationship" name="relationship" required />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="status">Status (ally, neutral, enemy)</Label>
                  <Input id="status" name="status" defaultValue="ally" required />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" required />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? "Creating..." : "Save NPC"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="allies" className="space-y-6">
        <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-grid">
          <TabsTrigger value="allies" className="flex items-center gap-2">
            <Crown className="h-4 w-4" />
            Allies ({npcs.allies.length})
          </TabsTrigger>
          <TabsTrigger value="neutral" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Neutral ({npcs.neutral.length})
          </TabsTrigger>
          <TabsTrigger value="enemies" className="flex items-center gap-2">
            <Skull className="h-4 w-4" />
            Enemies ({npcs.enemies.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="allies" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {npcs.allies.map((npc) => (
              <NPCCard key={npc.id} npc={npc} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="neutral" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {npcs.neutral.map((npc) => (
              <NPCCard key={npc.id} npc={npc} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="enemies" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {npcs.enemies.map((npc) => (
              <NPCCard key={npc.id} npc={npc} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NPCs;
