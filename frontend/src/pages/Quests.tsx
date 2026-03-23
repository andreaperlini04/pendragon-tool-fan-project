import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Target, CheckCircle2, Circle, Clock } from "lucide-react";

const quests = [
  {
    id: 1,
    title: "Retrieve the Holy Grail",
    status: "active",
    priority: "high",
    progress: 45,
    description: "Journey to the mystical realm and retrieve the legendary Holy Grail to save the kingdom from a terrible plague.",
    objectives: [
      { id: 1, text: "Consult with Merlin about the Grail's location", completed: true },
      { id: 2, text: "Gather the three sacred relics", completed: true },
      { id: 3, text: "Cross the Bridge of Testing", completed: false },
      { id: 4, text: "Face the Guardian of the Grail", completed: false },
    ],
    reward: "Glory: 1000, Legendary Artifact",
  },
  {
    id: 2,
    title: "Defend Against Saxon Invasion",
    status: "active",
    priority: "high",
    progress: 65,
    description: "Saxon forces are massing at the border. Rally the knights and defend the realm.",
    objectives: [
      { id: 1, text: "Rally the Round Table knights", completed: true },
      { id: 2, text: "Secure the border fortifications", completed: true },
      { id: 3, text: "Defeat the Saxon vanguard", completed: true },
      { id: 4, text: "Confront the Saxon warlord", completed: false },
    ],
    reward: "Glory: 800, Land Grant",
  },
  {
    id: 3,
    title: "Solve the Mystery of the Black Knight",
    status: "active",
    priority: "medium",
    progress: 20,
    description: "A mysterious black knight has been challenging travelers in the Dark Forest. Uncover their identity and motives.",
    objectives: [
      { id: 1, text: "Investigate reports in nearby villages", completed: true },
      { id: 2, text: "Track the Black Knight to the Dark Forest", completed: false },
      { id: 3, text: "Defeat the Black Knight in combat", completed: false },
      { id: 4, text: "Discover their true identity", completed: false },
    ],
    reward: "Glory: 500, Rare Weapon",
  },
  {
    id: 4,
    title: "The Tournament of Champions",
    status: "completed",
    priority: "low",
    progress: 100,
    description: "Compete in the grand tournament to prove your valor and win the hand of Lady Elaine.",
    objectives: [
      { id: 1, text: "Register for the tournament", completed: true },
      { id: 2, text: "Win the jousting rounds", completed: true },
      { id: 3, text: "Triumph in the melee", completed: true },
      { id: 4, text: "Claim victory and honors", completed: true },
    ],
    reward: "Glory: 600, Trophy",
  },
];

const Quests = () => {
  const activeQuests = quests.filter((q) => q.status === "active");
  const completedQuests = quests.filter((q) => q.status === "completed");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Quests & Storylines</h1>
          <p className="text-muted-foreground">Track your campaign objectives</p>
        </div>
        <Button className="bg-gradient-royal">
          <Plus className="h-4 w-4 mr-2" />
          New Quest
        </Button>
      </div>

      {/* Active Quests */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Target className="h-6 w-6 text-accent" />
          Active Quests ({activeQuests.length})
        </h2>
        <div className="space-y-4">
          {activeQuests.map((quest) => (
            <Card key={quest.id} className="shadow-card hover:shadow-hover transition-smooth">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{quest.title}</CardTitle>
                    <CardDescription>{quest.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      variant={quest.priority === "high" ? "destructive" : "secondary"}
                      className="uppercase"
                    >
                      {quest.priority}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">{quest.progress}%</span>
                  </div>
                  <Progress value={quest.progress} className="h-2" />
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Objectives</h4>
                  <div className="space-y-2">
                    {quest.objectives.map((objective) => (
                      <div key={objective.id} className="flex items-start gap-3">
                        {objective.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                        )}
                        <span
                          className={objective.completed ? "text-muted-foreground line-through" : ""}
                        >
                          {objective.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <span className="text-sm font-medium">Reward: </span>
                  <span className="text-sm text-muted-foreground">{quest.reward}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Completed Quests */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-accent" />
          Completed Quests ({completedQuests.length})
        </h2>
        <div className="space-y-4">
          {completedQuests.map((quest) => (
            <Card key={quest.id} className="shadow-card opacity-75">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-1 flex items-center gap-2">
                      {quest.title}
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                    </CardTitle>
                    <CardDescription>{quest.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <span className="font-medium">Reward Earned: </span>
                  <span className="text-muted-foreground">{quest.reward}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quests;
