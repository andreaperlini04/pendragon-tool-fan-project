import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Crown, Users, Skull } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const npcs = {
  allies: [
    {
      id: 1,
      name: "King Arthur",
      role: "Monarch",
      location: "Camelot",
      relationship: "Liege Lord",
      description: "The wise and noble king who united the realm.",
      status: "ally",
    },
    {
      id: 2,
      name: "Merlin",
      role: "Court Wizard",
      location: "Camelot",
      relationship: "Advisor",
      description: "Ancient wizard and advisor to the king.",
      status: "ally",
    },
    {
      id: 3,
      name: "Lady Guinevere",
      role: "Queen",
      location: "Camelot",
      relationship: "Patron",
      description: "The graceful queen, beloved of the realm.",
      status: "ally",
    },
  ],
  neutral: [
    {
      id: 4,
      name: "Morgan le Fay",
      role: "Sorceress",
      location: "Isle of Avalon",
      relationship: "Complicated",
      description: "Powerful enchantress with mysterious motives.",
      status: "neutral",
    },
    {
      id: 5,
      name: "Sir Kay",
      role: "Seneschal",
      location: "Camelot",
      relationship: "Rival",
      description: "Arthur's foster brother and seneschal of the court.",
      status: "neutral",
    },
  ],
  enemies: [
    {
      id: 6,
      name: "Mordred",
      role: "Dark Knight",
      location: "Unknown",
      relationship: "Enemy",
      description: "A sinister knight plotting against the realm.",
      status: "enemy",
    },
    {
      id: 7,
      name: "The Black Knight",
      role: "Mysterious Warrior",
      location: "Dark Forest",
      relationship: "Hostile",
      description: "An enigmatic figure who challenges all who pass.",
      status: "enemy",
    },
  ],
};

const NPCCard = ({ npc }: { npc: typeof npcs.allies[0] }) => (
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
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">NPCs</h1>
          <p className="text-muted-foreground">Notable characters in your campaign</p>
        </div>
        <Button className="bg-gradient-royal">
          <Plus className="h-4 w-4 mr-2" />
          New NPC
        </Button>
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
