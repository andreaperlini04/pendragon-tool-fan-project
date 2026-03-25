import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Crown, Users, Skull, LayoutGrid } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNPCs, createNPC, updateNPC, deleteNPC } from "@/lib/api";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type NPCData = {
  id: string | number;
  name: string;
  role: string;
  location: string;
  relationship: string;
  description: string;
  status: string;
  imageUrl?: string;
};

const NPCCard = ({ npc, onClick }: { npc: NPCData, onClick: () => void }) => (
  <Card className="shadow-card hover:shadow-hover transition-smooth cursor-pointer overflow-hidden flex h-full group" onClick={onClick}>
    <div className="flex-shrink-0 w-32 md:w-40 bg-secondary/10 flex items-stretch border-r overflow-hidden">
      <Avatar className="h-full w-full rounded-none border-none">
        <AvatarImage src={npc.imageUrl} alt={npc.name} className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-500" />
        <AvatarFallback className="bg-gradient-royal text-primary-foreground font-bold text-4xl rounded-none w-full h-full flex items-center justify-center">
          {npc.name.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </div>
    <div className="flex-1 flex flex-col min-w-0">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <CardTitle className="text-2xl font-bold truncate">{npc.name}</CardTitle>
            <CardDescription className="text-base text-primary/80 font-medium">{npc.role}</CardDescription>
          </div>
          <Badge
            className="flex-shrink-0"
            variant={npc.status === "ally" ? "default" : npc.status === "enemy" ? "destructive" : "secondary"}
          >
            {npc.relationship}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-2 flex-1 flex flex-col justify-center">
        <p className="text-sm text-muted-foreground line-clamp-3 italic">"{npc.description}"</p>
        <div className="text-sm flex items-center gap-1.5 mt-auto">
          <span className="text-primary/60 font-semibold uppercase text-[10px] tracking-wider">Location:</span>
          <span className="font-medium truncate">{npc.location}</span>
        </div>
      </CardContent>
    </div>
  </Card>
);

const NPCs = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selectedNPC, setSelectedNPC] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const { data: allNPCs = [], isLoading, error } = useQuery({
    queryKey: ["npcs"],
    queryFn: fetchNPCs,
  });

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setTimeout(() => {
        setSelectedNPC(null);
        setIsEditing(false);
      }, 200);
    }
  };

  const mutation = useMutation({
    mutationFn: createNPC,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["npcs"] });
      setOpen(false);
    },
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateNPC(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["npcs"] });
      setOpen(false);
    },
  });

  const deleteMut = useMutation({
    mutationFn: deleteNPC,
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
      imageUrl: formData.get("imageUrl") as string,
    };
    
    if (selectedNPC && isEditing) {
      updateMut.mutate({ id: selectedNPC.id, data });
    } else {
      mutation.mutate(data);
    }
  };

  if (isLoading) return <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">Loading NPCs...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-center text-destructive">Failed to load NPCs.</div>;

  const npcs = {
    allies: allNPCs.filter((npc: any) => npc.status === "ally"),
    neutral: allNPCs.filter((npc: any) => npc.status === "neutral"),
    enemies: allNPCs.filter((npc: any) => npc.status === "enemy"),
  };

  const openNPCDialog = (npc: any) => {
    setSelectedNPC(npc);
    setIsEditing(false);
    setOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">NPCs</h1>
          <p className="text-muted-foreground">Notable characters in your campaign</p>
        </div>
        
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <Button className="bg-gradient-royal" onClick={() => {
            setSelectedNPC(null);
            setIsEditing(true);
            setOpen(true);
          }}>
            <Plus className="h-4 w-4 mr-2" />
            New NPC
          </Button>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {!selectedNPC ? "Create NPC" : (isEditing ? "Edit NPC" : "NPC Details")}
              </DialogTitle>
            </DialogHeader>
            <form key={selectedNPC?.id || 'new'} onSubmit={handleSubmit} className="space-y-4 mt-4">
              <fieldset disabled={selectedNPC && !isEditing} className="w-full border-none p-0 m-0">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" defaultValue={selectedNPC?.name || ""} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">Image URL (Optional)</Label>
                    <Input id="imageUrl" name="imageUrl" type="url" placeholder="https://..." defaultValue={selectedNPC?.imageUrl || ""} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" name="role" defaultValue={selectedNPC?.role || ""} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" name="location" defaultValue={selectedNPC?.location || ""} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="relationship">Relationship</Label>
                    <Input id="relationship" name="relationship" defaultValue={selectedNPC?.relationship || ""} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select name="status" defaultValue={selectedNPC?.status || "ally"}>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ally">Ally</SelectItem>
                        <SelectItem value="neutral">Neutral</SelectItem>
                        <SelectItem value="enemy">Enemy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" defaultValue={selectedNPC?.description || ""} required />
                  </div>
                </div>
              </fieldset>
              <div className="flex justify-end pt-4 gap-2">
                {!selectedNPC ? (
                  <Button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? "Creating..." : "Save NPC"}
                  </Button>
                ) : !isEditing ? (
                  <>
                    <Button type="button" variant="destructive" onClick={() => deleteMut.mutate(selectedNPC.id)} disabled={deleteMut.isPending}>Delete</Button>
                    <Button type="button" onClick={(e) => { e.preventDefault(); setIsEditing(true); }}>Edit</Button>
                  </>
                ) : (
                  <>
                    <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    <Button type="submit" disabled={updateMut.isPending}>
                      {updateMut.isPending ? "Saving..." : "Save Changes"}
                    </Button>
                  </>
                )}
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full md:w-auto grid-cols-4 md:inline-grid">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4" />
            All ({allNPCs.length})
          </TabsTrigger>
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

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allNPCs.map((npc: any) => (
              <NPCCard key={npc.id} npc={npc} onClick={() => openNPCDialog(npc)} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="allies" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {npcs.allies.map((npc: any) => (
              <NPCCard key={npc.id} npc={npc} onClick={() => openNPCDialog(npc)} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="neutral" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {npcs.neutral.map((npc: any) => (
              <NPCCard key={npc.id} npc={npc} onClick={() => openNPCDialog(npc)} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="enemies" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {npcs.enemies.map((npc: any) => (
              <NPCCard key={npc.id} npc={npc} onClick={() => openNPCDialog(npc)} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NPCs;
