import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Target, CheckCircle2, Circle, Clock } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchQuests, createQuest } from "@/lib/api";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Quests = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { data: quests = [], isLoading, error } = useQuery({
    queryKey: ["quests"],
    queryFn: fetchQuests,
  });

  const mutation = useMutation({
    mutationFn: createQuest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quests"] });
      setOpen(false);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const objectivesText = formData.get("objectives") as string;
    const data = {
      title: formData.get("title") as string,
      status: formData.get("status") as string,
      priority: formData.get("priority") as string,
      progress: parseInt(formData.get("progress") as string, 10),
      description: formData.get("description") as string,
      reward: formData.get("reward") as string,
      objectives: objectivesText.split("\n").filter(s => s.trim() !== "").map((text, i) => ({
        id: i + 1,
        text: text.trim(),
        completed: false
      }))
    };
    mutation.mutate(data);
  };

  if (isLoading) return <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">Loading quests...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-center text-destructive">Failed to load quests.</div>;

  const activeQuests = quests.filter((q: any) => q.status === "active");
  const completedQuests = quests.filter((q: any) => q.status === "completed");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Quests & Storylines</h1>
          <p className="text-muted-foreground">Track your campaign objectives</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-royal">
              <Plus className="h-4 w-4 mr-2" />
              New Quest
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Quest</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status (active, completed)</Label>
                  <Input id="status" name="status" defaultValue="active" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Input id="priority" name="priority" defaultValue="medium" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="progress">Progress (%)</Label>
                  <Input id="progress" name="progress" type="number" defaultValue="0" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reward">Reward</Label>
                  <Input id="reward" name="reward" required />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" required />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="objectives">Objectives (one per line)</Label>
                  <Textarea id="objectives" name="objectives" required />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? "Creating..." : "Save Quest"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
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
