import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Shield, User, ScrollText } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCharacters, createCharacter } from "@/lib/api";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const TRAITS = ["chaste", "energetic", "forgiving", "generous", "honest", "just", "merciful", "modest", "prudent", "spiritual", "temperate", "trusting", "valorous"];
const SKILLS = ["awareness", "boating", "compose", "courtesy", "dancing", "faerieLore", "falconry", "firstAid", "flirting", "folkLore", "gaming", "heraldry", "hunting", "intrigue", "orate", "play", "read", "recognize", "religion", "romance", "singing", "stewardship", "swimming", "tourney"];
const COMBAT_SKILLS = ["battle", "horsemanship", "sword", "lance", "spear", "dagger"];
const PASSIONS = ["loyaltyLord", "loveFamily", "hospitality", "honor"];

const Characters = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { data: characters = [], isLoading, error } = useQuery({
    queryKey: ["characters"],
    queryFn: fetchCharacters,
  });

  const mutation = useMutation({
    mutationFn: createCharacter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
      setOpen(false);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get("name") as string,
      player: form.get("player") as string,
      age: parseInt((form.get("age") as string) || "21"),
      sonNumber: parseInt((form.get("sonNumber") as string) || "1"),
      homeland: form.get("homeland") as string,
      culture: form.get("culture") as string,
      religion: form.get("religion") as string,
      lord: form.get("lord") as string,
      currentClass: form.get("currentClass") as string,
      currentHome: form.get("currentHome") as string,
      siz: parseInt((form.get("siz") as string) || "10"),
      dex: parseInt((form.get("dex") as string) || "10"),
      str: parseInt((form.get("str") as string) || "10"),
      con: parseInt((form.get("con") as string) || "10"),
      app: parseInt((form.get("app") as string) || "10"),
      features: form.get("features") as string,
      traits: {} as Record<string, number>,
      passions: {} as Record<string, number>,
      skills: {} as Record<string, number>,
      combatSkills: {} as Record<string, number>,
      status: (form.get("status") as string) || "Active",
      glory: parseInt((form.get("glory") as string) || "0")
    };

    TRAITS.forEach(t => data.traits[t] = parseInt((form.get(`trait_${t}`) as string) || "10"));
    PASSIONS.forEach(p => data.passions[p] = parseInt((form.get(`passion_${p}`) as string) || "15"));
    SKILLS.forEach(s => data.skills[s] = parseInt((form.get(`skill_${s}`) as string) || "0"));
    COMBAT_SKILLS.forEach(s => data.combatSkills[s] = parseInt((form.get(`combat_${s}`) as string) || "5"));

    mutation.mutate(data);
  };

  if (isLoading) return <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">Loading characters...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-center text-destructive">Failed to load characters.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Player Characters</h1>
          <p className="text-muted-foreground">The heroes of your Pendragon campaign</p>
        </div>
        
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button className="bg-gradient-royal">
              <Plus className="h-4 w-4 mr-2" />
              New Character
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-[700px] w-[90vw] p-0 flex flex-col">
            <SheetHeader className="p-6 pb-2 border-b">
              <SheetTitle className="text-2xl font-serif">Knight's Character Sheet</SheetTitle>
            </SheetHeader>
            <form onSubmit={handleSubmit} className="flex-1 overflow-hidden flex flex-col">
              <ScrollArea className="flex-1 p-6">
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-4">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="attributes">Attributes</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="traits">Traits</TabsTrigger>
                  </TabsList>

                  {/* PERSONAL DATA */}
                  <TabsContent value="personal" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2"><Label>Character Name</Label><Input name="name" required /></div>
                      <div className="space-y-2"><Label>Player Name</Label><Input name="player" /></div>
                      <div className="space-y-2"><Label>Age</Label><Input name="age" type="number" defaultValue="21" /></div>
                      <div className="space-y-2"><Label>Son Number</Label><Input name="sonNumber" type="number" defaultValue="1" /></div>
                      <div className="space-y-2"><Label>Homeland</Label><Input name="homeland" defaultValue="Salisbury" /></div>
                      <div className="space-y-2"><Label>Culture</Label><Input name="culture" defaultValue="Cymric" /></div>
                      <div className="space-y-2"><Label>Religion</Label><Input name="religion" defaultValue="Pagan" /></div>
                      <div className="space-y-2"><Label>Lord</Label><Input name="lord" /></div>
                      <div className="space-y-2"><Label>Current Class</Label><Input name="currentClass" defaultValue="Squire" /></div>
                      <div className="space-y-2"><Label>Current Home</Label><Input name="currentHome" /></div>
                      <div className="space-y-2"><Label>Starting Glory</Label><Input name="glory" type="number" defaultValue="0" /></div>
                      <div className="space-y-2"><Label>Status</Label><Input name="status" defaultValue="Active" /></div>
                    </div>
                  </TabsContent>

                  {/* ATTRIBUTES */}
                  <TabsContent value="attributes" className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold font-serif mb-3 border-b pb-1">Primary Attributes</h3>
                      <div className="grid grid-cols-5 gap-4">
                        <div className="space-y-1"><Label>SIZ</Label><Input name="siz" type="number" defaultValue="10" /></div>
                        <div className="space-y-1"><Label>DEX</Label><Input name="dex" type="number" defaultValue="10" /></div>
                        <div className="space-y-1"><Label>STR</Label><Input name="str" type="number" defaultValue="10" /></div>
                        <div className="space-y-1"><Label>CON</Label><Input name="con" type="number" defaultValue="10" /></div>
                        <div className="space-y-1"><Label>APP</Label><Input name="app" type="number" defaultValue="10" /></div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-serif mb-3 border-b pb-1">Distinctive Features</h3>
                      <Input name="features" placeholder="Hair, Limbs, Expression..." />
                    </div>
                  </TabsContent>

                  {/* SKILLS */}
                  <TabsContent value="skills" className="space-y-6">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-bold font-serif mb-3 border-b pb-1">Combat Skills</h3>
                        <div className="space-y-2">
                          {COMBAT_SKILLS.map(skill => (
                            <div key={skill} className="flex items-center justify-between">
                              <Label className="capitalize">{skill}</Label>
                              <Input name={`combat_${skill}`} type="number" defaultValue="5" className="w-20 h-8" />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-serif mb-3 border-b pb-1">Passions</h3>
                        <div className="space-y-2">
                          {PASSIONS.map(passion => (
                            <div key={passion} className="flex items-center justify-between">
                              <Label className="capitalize">{passion.replace(/([A-Z])/g, ' $1').trim()}</Label>
                              <Input name={`passion_${passion}`} type="number" defaultValue="15" className="w-20 h-8" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-serif mb-3 border-b pb-1">Standard Skills</h3>
                      <div className="grid grid-cols-3 gap-x-6 gap-y-2">
                        {SKILLS.map(skill => (
                          <div key={skill} className="flex items-center justify-between">
                            <Label className="capitalize text-xs">{skill.replace(/([A-Z])/g, ' $1').trim()}</Label>
                            <Input name={`skill_${skill}`} type="number" defaultValue="0" className="w-16 h-7 text-xs" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* TRAITS */}
                  <TabsContent value="traits" className="space-y-4">
                    <h3 className="text-lg font-bold font-serif mb-3 border-b pb-1">Personality Traits</h3>
                    <div className="grid grid-cols-2 gap-x-12 gap-y-2">
                      {TRAITS.map(trait => (
                        <div key={trait} className="flex items-center justify-between">
                          <Label className="capitalize w-24">{trait}</Label>
                          <Input name={`trait_${trait}`} type="number" defaultValue="10" className="w-16 h-8 text-center" />
                          <Label className="text-muted-foreground w-24 text-right">(Opposing)</Label>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 italic">
                      In Pendragon, traits are paired pairs (e.g. Chaste/Lustful). Generally, they add up to 20. Enter the primary left-side trait value here.
                    </p>
                  </TabsContent>
                </Tabs>
              </ScrollArea>
              <div className="p-6 border-t bg-secondary/20 flex justify-end">
                <Button type="submit" disabled={mutation.isPending} className="w-32">
                  {mutation.isPending ? "Validating..." : "Save Knight"}
                </Button>
              </div>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.length === 0 && <div className="col-span-full text-center text-muted-foreground py-12">No characters have been knighted yet.</div>}
        {characters.map((character: any) => (
          <Card key={character.id} className="shadow-card hover:shadow-hover transition-smooth flex flex-col relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-1 h-full ${character.status === 'Dead' ? 'bg-destructive' : 'bg-primary'}`}></div>
            <CardHeader className="pb-3 border-b bg-secondary/10">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl font-bold font-serif mb-1">{character.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {character.age ? `${character.age} yo ` : ""}
                    {character.religion} {character.culture} {character.currentClass}
                  </CardDescription>
                </div>
                <Badge variant={character.status === "Dead" ? "destructive" : "default"} className="shadow-sm">
                  {character.glory || 0} Glory
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4 flex-1 space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2"><Globe className="h-3 w-3 text-muted-foreground"/> <span>{character.homeland || 'Unknown'}</span></div>
                <div className="flex items-center gap-2"><Shield className="h-3 w-3 text-muted-foreground"/> <span>{character.lord || 'No Lord'}</span></div>
              </div>

              {/* Attributes Mini-Bar */}
              <div className="flex justify-between items-center text-xs font-mono bg-secondary/40 p-2 rounded border border-border/50">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-muted-foreground">SIZ</span>
                  <span className="font-bold">{character.siz || 10}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-muted-foreground">DEX</span>
                  <span className="font-bold">{character.dex || 10}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-muted-foreground">STR</span>
                  <span className="font-bold">{character.str || 10}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-muted-foreground">CON</span>
                  <span className="font-bold">{character.con || 10}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-muted-foreground">APP</span>
                  <span className="font-bold">{character.app || 10}</span>
                </div>
              </div>

              {/* Notable Sub-stats */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Notable Stats</h4>
                <div className="flex flex-wrap gap-1.5">
                  {character.combatSkills && character.combatSkills.sword > 5 && (
                    <Badge variant="outline" className="text-xs font-normal">Sword {character.combatSkills.sword}</Badge>
                  )}
                  {character.combatSkills && character.combatSkills.horsemanship > 5 && (
                    <Badge variant="outline" className="text-xs font-normal">Horse {character.combatSkills.horsemanship}</Badge>
                  )}
                  {character.passions && character.passions.loyaltyLord > 15 && (
                    <Badge variant="outline" className="text-xs font-normal bg-primary/5">Loyalty {character.passions.loyaltyLord}</Badge>
                  )}
                  {character.traits && character.traits.valorous > 15 && (
                    <Badge variant="outline" className="text-xs font-normal bg-accent/5 border-accent/20 text-accent-foreground">Valorous {character.traits.valorous}</Badge>
                  )}
                </div>
              </div>
            </CardContent>
            {character.player && (
              <div className="p-3 text-xs text-muted-foreground border-t bg-secondary/5 flex items-center gap-2">
                <User className="h-3 w-3" />
                Player: {character.player}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

// Simple globe icon fallback since lucide-react might not export Globe if older version, using Shield or generic instead just in case.
const Globe = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)

export default Characters;
