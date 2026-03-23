import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Users, Scroll, Target, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Book, label: "Sessions", value: "12", color: "text-primary" },
  { icon: Users, label: "Characters", value: "4", color: "text-accent" },
  { icon: Scroll, label: "NPCs", value: "18", color: "text-primary" },
  { icon: Target, label: "Quests", value: "7", color: "text-accent" },
];

const recentSessions = [
  { id: 1, title: "The Quest Begins", date: "2024-11-01", notes: "The knights gathered at Camelot..." },
  { id: 2, title: "Dragon's Lair", date: "2024-10-25", notes: "A fearsome dragon threatens the realm..." },
  { id: 3, title: "Court Intrigue", date: "2024-10-18", notes: "Political machinations at court..." },
];

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Campaign Header */}
      <div className="bg-gradient-royal rounded-xl p-8 text-primary-foreground shadow-card">
        <h1 className="text-4xl font-bold mb-2">The Pendragon Chronicles</h1>
        <p className="text-primary-foreground/80 text-lg">An epic Arthurian campaign</p>
        <div className="flex items-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Started: January 2024</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Last Session: Nov 1, 2024</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="shadow-card hover:shadow-hover transition-smooth">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Sessions */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Recent Sessions</CardTitle>
              <CardDescription>Your latest campaign adventures</CardDescription>
            </div>
            <Button variant="outline" size="sm">View All</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentSessions.map((session) => (
            <div
              key={session.id}
              className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-smooth cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{session.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{session.notes}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(session.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <Book className="h-5 w-5 text-primary" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Active Quests Preview */}
      <Card className="shadow-card bg-gradient-to-br from-accent/5 to-transparent">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Target className="h-6 w-6 text-accent" />
            Active Quests
          </CardTitle>
          <CardDescription>Current objectives and storylines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-accent" />
              <span className="font-medium">Retrieve the Holy Grail</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-accent" />
              <span className="font-medium">Defend against Saxon Invasion</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-muted-foreground" />
              <span className="font-medium text-muted-foreground">Solve the Mystery of the Black Knight</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
