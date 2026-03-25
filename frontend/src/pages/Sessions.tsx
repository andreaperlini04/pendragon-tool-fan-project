import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Clock } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchSessions, createSession, updateSession, deleteSession } from "@/lib/api";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Sessions = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const { data: sessions = [], isLoading, error } = useQuery({
    queryKey: ["sessions"],
    queryFn: fetchSessions,
  });

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setTimeout(() => {
        setSelectedSession(null);
        setIsEditing(false);
      }, 200);
    }
  };

  const mutation = useMutation({
    mutationFn: createSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      setOpen(false);
    },
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateSession(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      setOpen(false);
    },
  });

  const deleteMut = useMutation({
    mutationFn: deleteSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      setOpen(false);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      number: parseInt(formData.get("number") as string, 10),
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      duration: formData.get("duration") as string,
      summary: formData.get("summary") as string,
      highlights: (formData.get("highlights") as string).split("\n").filter(s => s.trim() !== ""),
    };
    
    if (selectedSession && isEditing) {
      updateMut.mutate({ id: selectedSession.id, data });
    } else {
      mutation.mutate(data);
    }
  };

  if (isLoading) return <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">Loading sessions...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-center text-destructive">Failed to load sessions.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Campaign Sessions</h1>
          <p className="text-muted-foreground">Chronicle your adventures</p>
        </div>
        
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <Button className="bg-gradient-royal" onClick={() => {
            setSelectedSession(null);
            setIsEditing(true);
            setOpen(true);
          }}>
            <Plus className="h-4 w-4 mr-2" />
            New Session
          </Button>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {!selectedSession ? "Create Session" : (isEditing ? "Edit Session" : "Session Details")}
              </DialogTitle>
            </DialogHeader>
            <form key={selectedSession?.id || 'new'} onSubmit={handleSubmit} className="space-y-4 mt-4">
              <fieldset disabled={selectedSession && !isEditing} className="w-full border-none p-0 m-0">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="number">Session Number</Label>
                    <Input id="number" name="number" type="number" defaultValue={selectedSession?.number || ""} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" name="date" type="date" defaultValue={selectedSession?.date ? selectedSession.date.substring(0,10) : ""} required />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" defaultValue={selectedSession?.title || ""} required />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input id="duration" name="duration" placeholder="e.g. 4 hours" defaultValue={selectedSession?.duration || ""} required />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="summary">Summary</Label>
                    <Textarea id="summary" name="summary" defaultValue={selectedSession?.summary || ""} required />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="highlights">Highlights (one per line)</Label>
                    <Textarea id="highlights" name="highlights" placeholder="Found the relic&#10;Met the king" defaultValue={selectedSession?.highlights ? selectedSession.highlights.join("\n") : ""} required />
                  </div>
                </div>
              </fieldset>
              <div className="flex justify-end pt-4 gap-2">
                {!selectedSession ? (
                  <Button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? "Creating..." : "Save Session"}
                  </Button>
                ) : !isEditing ? (
                  <>
                    <Button type="button" variant="destructive" onClick={() => deleteMut.mutate(selectedSession.id)} disabled={deleteMut.isPending}>Delete</Button>
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

      <div className="space-y-6">
        {sessions.map((session: any) => (
          <Card 
            key={session.id} 
            className="shadow-card hover:shadow-hover transition-smooth cursor-pointer"
            onClick={() => {
              setSelectedSession(session);
              setIsEditing(false);
              setOpen(true);
            }}
          >
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
                  {session.highlights.map((highlight: string, index: number) => (
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
