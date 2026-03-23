import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Clock } from "lucide-react";

const sessions = [
  {
    id: 1,
    number: 12,
    title: "The Quest Begins",
    date: "2024-11-01",
    duration: "4 hours",
    summary: "The knights gathered at Camelot to receive their quest from King Arthur. Sir Lancelot proposed a daring plan to retrieve the Holy Grail, while Sir Gawain suggested a more cautious approach.",
    highlights: [
      "First encounter with the mysterious Lady of the Lake",
      "Discovery of ancient prophecy",
      "Sir Percival's vision of the Grail",
    ],
  },
  {
    id: 2,
    number: 11,
    title: "Dragon's Lair",
    date: "2024-10-25",
    duration: "3.5 hours",
    summary: "A fearsome dragon has been terrorizing the countryside. The knights tracked it to its lair in the mountains and engaged in an epic battle.",
    highlights: [
      "Epic dragon battle",
      "Sir Galahad's heroic stand",
      "Discovery of dragon's treasure hoard",
    ],
  },
  {
    id: 3,
    number: 10,
    title: "Court Intrigue",
    date: "2024-10-18",
    duration: "4 hours",
    summary: "Political machinations at court threaten to divide the Round Table. The knights must navigate complex alliances and betrayals.",
    highlights: [
      "Uncovered plot against the king",
      "Diplomatic negotiations with rival kingdoms",
      "Sir Kay's controversial decision",
    ],
  },
];

const Sessions = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Campaign Sessions</h1>
          <p className="text-muted-foreground">Chronicle your adventures</p>
        </div>
        <Button className="bg-gradient-royal">
          <Plus className="h-4 w-4 mr-2" />
          New Session
        </Button>
      </div>

      <div className="space-y-6">
        {sessions.map((session) => (
          <Card key={session.id} className="shadow-card hover:shadow-hover transition-smooth">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-gradient-royal text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                      Session {session.number}
                    </div>
                  </div>
                  <CardTitle className="text-2xl mb-2">{session.title}</CardTitle>
                  <CardDescription className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(session.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {session.duration}
                    </span>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Summary</h4>
                <p className="text-muted-foreground leading-relaxed">{session.summary}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Key Highlights</h4>
                <ul className="space-y-2">
                  {session.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent mt-2" />
                      <span className="text-muted-foreground">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Sessions;
