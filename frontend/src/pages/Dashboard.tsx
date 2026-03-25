import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Users, Scroll, Target, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchSessions, fetchCharacters, fetchNPCs, fetchQuests } from "@/lib/api";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { data: sessions = [], isLoading: isLoadingS } = useQuery({ queryKey: ["sessions"], queryFn: fetchSessions });
  const { data: characters = [], isLoading: isLoadingC } = useQuery({ queryKey: ["characters"], queryFn: fetchCharacters });
  const { data: npcs = [], isLoading: isLoadingN } = useQuery({ queryKey: ["npcs"], queryFn: fetchNPCs });
  const { data: quests = [], isLoading: isLoadingQ } = useQuery({ queryKey: ["quests"], queryFn: fetchQuests });

  const isLoading = isLoadingS || isLoadingC || isLoadingN || isLoadingQ;

  const stats = [
    { icon: Book, label: "Sessions", value: sessions.length.toString(), color: "text-primary" },
    { icon: Users, label: "Characters", value: characters.length.toString(), color: "text-accent" },
    { icon: Scroll, label: "NPCs", value: npcs.length.toString(), color: "text-primary" },
    { icon: Target, label: "Quests", value: quests.length.toString(), color: "text-accent" },
  ];

  // Sort sessions by date descending
  const sortedSessions = [...sessions].sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const recentSessions = sortedSessions.slice(0, 3);
  
  // Filter active quests
  const activeQuests = quests.filter((q: any) => q.status === "active").slice(0, 5);
  
  const lastSessionDate = sortedSessions.length > 0 ? new Date(sortedSessions[0].date).toLocaleDateString() : "None yet";

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">Loading dashboard...</div>;
  }

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
            <span>Last Session: {lastSessionDate}</span>
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
            <Link to="/sessions">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentSessions.length === 0 && <span className="text-muted-foreground">No sessions recorded yet.</span>}
          {recentSessions.map((session: any) => (
            <div
              key={session.id}
              className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-smooth cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{session.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{session.summary}</p>
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
            {activeQuests.length === 0 && <span className="text-muted-foreground">No active quests.</span>}
            {activeQuests.map((quest: any) => (
              <div key={quest.id} className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-accent" />
                <span className="font-medium">{quest.title}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
