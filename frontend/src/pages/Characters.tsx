import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Shield, Sword, Heart } from "lucide-react";

const characters = [
  {
    id: 1,
    name: "Sir Lancelot",
    player: "Arthur",
    class: "Knight",
    level: 8,
    status: "Active",
    traits: ["Valorous", "Proud", "Lustful"],
    skills: ["Sword: 18", "Lance: 16", "Courtesy: 14"],
    glory: 3450,
  },
  {
    id: 2,
    name: "Sir Gawain",
    player: "Morgan",
    class: "Knight",
    level: 7,
    status: "Active",
    traits: ["Energetic", "Honest", "Temperate"],
    skills: ["Sword: 17", "Battle: 15", "Hunting: 16"],
    glory: 2890,
  },
  {
    id: 3,
    name: "Sir Percival",
    player: "Guinevere",
    class: "Knight",
    level: 6,
    status: "Active",
    traits: ["Spiritual", "Chaste", "Forgiving"],
    skills: ["Spear: 16", "Religion: 18", "First Aid: 14"],
    glory: 2340,
  },
  {
    id: 4,
    name: "Sir Galahad",
    player: "Merlin",
    class: "Knight",
    level: 7,
    status: "Active",
    traits: ["Pure", "Just", "Merciful"],
    skills: ["Sword: 19", "Religion: 17", "Awareness: 15"],
    glory: 2780,
  },
];

const Characters = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Player Characters</h1>
          <p className="text-muted-foreground">The heroes of your campaign</p>
        </div>
        <Button className="bg-gradient-royal">
          <Plus className="h-4 w-4 mr-2" />
          New Character
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {characters.map((character) => (
          <Card key={character.id} className="shadow-card hover:shadow-hover transition-smooth">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-1">{character.name}</CardTitle>
                  <CardDescription>
                    Played by {character.player} • Level {character.level} {character.class}
                  </CardDescription>
                </div>
                <Badge className="bg-accent text-accent-foreground">{character.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Glory: {character.glory.toLocaleString()}</span>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Heart className="h-4 w-4 text-accent" />
                  Traits
                </h4>
                <div className="flex flex-wrap gap-2">
                  {character.traits.map((trait) => (
                    <Badge key={trait} variant="secondary" className="text-xs">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Sword className="h-4 w-4 text-primary" />
                  Key Skills
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {character.skills.map((skill) => (
                    <div key={skill} className="text-muted-foreground">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Characters;
