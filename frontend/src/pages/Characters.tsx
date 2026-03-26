import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Shield, User, ScrollText } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCharacters, createCharacter, updateCharacter, deleteCharacter } from "@/lib/api";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TRAIT_PAIRS: Record<string, string> = {
  chaste: "lustful",
  energetic: "lazy",
  forgiving: "vengeful",
  generous: "selfish",
  honest: "deceitful",
  just: "arbitrary",
  merciful: "cruel",
  modest: "proud",
  prudent: "reckless",
  spiritual: "worldly",
  temperate: "indulgent",
  trusting: "suspicious",
  valorous: "cowardly"
};
const TRAITS = Object.keys(TRAIT_PAIRS);
const SKILLS = ["awareness", "boating", "compose", "courtesy", "dancing", "faerieLore", "falconry", "firstAid", "flirting", "folkLore", "gaming", "heraldry", "hunting", "intrigue", "orate", "play", "read", "recognize", "religion", "romance", "singing", "stewardship", "swimming", "tourney"];
const COMBAT_SKILLS = ["battle", "horsemanship", "sword", "lance", "spear", "dagger"];
const PASSIONS = ["loyaltyLord", "loveFamily", "hospitality", "honor"];

const Characters = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [traitValues, setTraitValues] = useState<Record<string, number>>({});

  const handleTraitChange = (trait: string, value: number) => {
    const newVal = Math.max(0, Math.min(20, value));
    setTraitValues(prev => ({
      ...prev,
      [trait]: newVal
    }));
  };

  const { data: characters = [], isLoading, error } = useQuery({
    queryKey: ["characters"],
    queryFn: fetchCharacters,
  });

  useEffect(() => {
    if (open) {
      if (selectedCharacter) {
        setTraitValues(selectedCharacter.traits || {});
      } else {
        const initialTraits: Record<string, number> = {};
        TRAITS.forEach(t => initialTraits[t] = 10);
        setTraitValues(initialTraits);
      }
    }
  }, [open, selectedCharacter]);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setTimeout(() => {
        setSelectedCharacter(null);
        setIsEditing(false);
        setTraitValues({});
      }, 200);
    } else if (selectedCharacter) {
      setTraitValues(selectedCharacter.traits || {});
    } else {
      const initialTraits: Record<string, number> = {};
      TRAITS.forEach(t => initialTraits[t] = 10);
      setTraitValues(initialTraits);
    }
  };

  const mutation = useMutation({
    mutationFn: createCharacter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
      setOpen(false);
    },
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateCharacter(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
      setOpen(false);
    },
  });

  const deleteMut = useMutation({
    mutationFn: deleteCharacter,
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
      glory: parseInt((form.get("glory") as string) || "0"),
      imageUrl: form.get("imageUrl") as string
    };

    TRAITS.forEach(t => data.traits[t] = traitValues[t] ?? 10);
    PASSIONS.forEach(p => data.passions[p] = parseInt((form.get(`passion_${p}`) as string) || "15"));
    SKILLS.forEach(s => data.skills[s] = parseInt((form.get(`skill_${s}`) as string) || "0"));
    COMBAT_SKILLS.forEach(s => data.combatSkills[s] = parseInt((form.get(`combat_${s}`) as string) || "5"));

    if (selectedCharacter && isEditing) {
      updateMut.mutate({ id: selectedCharacter.id, data });
    } else {
      mutation.mutate(data);
    }
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
        
        <Sheet open={open} onOpenChange={handleOpenChange}>
          <Button className="bg-gradient-royal" onClick={() => {
            setSelectedCharacter(null);
            setIsEditing(true);
            setOpen(true);
          }}>
            <Plus className="h-4 w-4 mr-2" />
            New Character
          </Button>
          <SheetContent className="sm:max-w-[700px] w-[90vw] p-0 flex flex-col">
            <SheetHeader className="p-6 pb-2 border-b">
              <SheetTitle className="text-2xl font-serif">
                {!selectedCharacter ? "New Character" : (isEditing ? "Edit Character" : "Character Details")}
              </SheetTitle>
            </SheetHeader>
            <form key={selectedCharacter?.id || 'new'} onSubmit={handleSubmit} className="flex-1 overflow-hidden flex flex-col">
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
                      <fieldset disabled={selectedCharacter && !isEditing} className="w-full h-full border-none p-0 m-0">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 space-y-2"><Label>Image URL (Optional)</Label><Input name="imageUrl" type="url" placeholder="https://..." defaultValue={selectedCharacter?.imageUrl || ""} /></div>
                        <div className="space-y-2"><Label>Character Name</Label><Input name="name" required defaultValue={selectedCharacter?.name || ""} /></div>
                        <div className="space-y-2"><Label>Player Name</Label><Input name="player" defaultValue={selectedCharacter?.player || ""} /></div>
                        <div className="space-y-2"><Label>Age</Label><Input name="age" type="number" defaultValue={selectedCharacter?.age || "21"} /></div>
                        <div className="space-y-2"><Label>Son Number</Label><Input name="sonNumber" type="number" defaultValue={selectedCharacter?.sonNumber || "1"} /></div>
                        <div className="space-y-2"><Label>Homeland</Label><Input name="homeland" defaultValue={selectedCharacter?.homeland || "Salisbury"} /></div>
                        <div className="space-y-2"><Label>Culture</Label><Input name="culture" defaultValue={selectedCharacter?.culture || "Cymric"} /></div>
                        <div className="space-y-2"><Label>Religion</Label><Input name="religion" defaultValue={selectedCharacter?.religion || "Pagan"} /></div>
                        <div className="space-y-2"><Label>Lord</Label><Input name="lord" defaultValue={selectedCharacter?.lord || ""} /></div>
                        <div className="space-y-2"><Label>Current Class</Label><Input name="currentClass" defaultValue={selectedCharacter?.currentClass || "Squire"} /></div>
                        <div className="space-y-2"><Label>Current Home</Label><Input name="currentHome" defaultValue={selectedCharacter?.currentHome || ""} /></div>
                        <div className="space-y-2"><Label>Starting Glory</Label><Input name="glory" type="number" defaultValue={selectedCharacter?.glory || "0"} /></div>
                        <div className="space-y-2"><Label>Status</Label><Input name="status" defaultValue={selectedCharacter?.status || "Active"} /></div>
                      </div>
                      </fieldset>
                    </TabsContent>

                    {/* ATTRIBUTES */}
                    <TabsContent value="attributes" className="space-y-6">
                      <fieldset disabled={selectedCharacter && !isEditing} className="w-full h-full border-none p-0 m-0">
                      <div>
                        <h3 className="text-lg font-bold font-serif mb-3 border-b pb-1">Primary Attributes</h3>
                        <div className="grid grid-cols-5 gap-4">
                          <div className="space-y-1"><Label>SIZ</Label><Input name="siz" type="number" defaultValue={selectedCharacter?.siz || "10"} /></div>
                          <div className="space-y-1"><Label>DEX</Label><Input name="dex" type="number" defaultValue={selectedCharacter?.dex || "10"} /></div>
                          <div className="space-y-1"><Label>STR</Label><Input name="str" type="number" defaultValue={selectedCharacter?.str || "10"} /></div>
                          <div className="space-y-1"><Label>CON</Label><Input name="con" type="number" defaultValue={selectedCharacter?.con || "10"} /></div>
                          <div className="space-y-1"><Label>APP</Label><Input name="app" type="number" defaultValue={selectedCharacter?.app || "10"} /></div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-serif mb-3 border-b pb-1">Distinctive Features</h3>
                        <Input name="features" placeholder="Hair, Limbs, Expression..." defaultValue={selectedCharacter?.features || ""} />
                      </div>
                      </fieldset>
                    </TabsContent>

                    {/* SKILLS */}
                    <TabsContent value="skills" className="space-y-6">
                      <fieldset disabled={selectedCharacter && !isEditing} className="w-full h-full border-none p-0 m-0">
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-lg font-bold font-serif mb-3 border-b pb-1">Combat Skills</h3>
                          <div className="space-y-2">
                            {COMBAT_SKILLS.map(skill => (
                              <div key={skill} className="flex items-center justify-between">
                                <Label className="capitalize">{skill}</Label>
                                <Input name={`combat_${skill}`} type="number" defaultValue={selectedCharacter?.combatSkills?.[skill] || "5"} className="w-20 h-8" />
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
                                <Input name={`passion_${passion}`} type="number" defaultValue={selectedCharacter?.passions?.[passion] || "15"} className="w-20 h-8" />
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
                              <Input name={`skill_${skill}`} type="number" defaultValue={selectedCharacter?.skills?.[skill] || "0"} className="w-16 h-7 text-xs" />
                            </div>
                          ))}
                        </div>
                      </div>
                      </fieldset>
                    </TabsContent>

                    {/* TRAITS */}
                    <TabsContent value="traits" className="space-y-4">
                      <fieldset disabled={selectedCharacter && !isEditing} className="w-full h-full border-none p-0 m-0">
                      <h3 className="text-lg font-bold font-serif mb-3 border-b pb-1">Personality Traits</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                        {TRAITS.map(trait => (
                          <div key={trait} className="flex items-center justify-between gap-4">
                            <Label className={`capitalize w-20 text-xs ${traitValues[trait] >= 16 ? 'font-bold underline' : ''}`}>{trait}</Label>
                            <div className="flex items-center gap-1.5">
                              <Input 
                                name={`trait_${trait}`} 
                                type="number" 
                                value={traitValues[trait] ?? 10} 
                                onChange={(e) => handleTraitChange(trait, parseInt(e.target.value) || 0)}
                                className="w-12 h-8 text-center p-1 font-bold" 
                              />
                              <span className="text-muted-foreground font-serif">/</span>
                              <Input 
                                type="number" 
                                value={20 - (traitValues[trait] ?? 10)} 
                                onChange={(e) => handleTraitChange(trait, 20 - (parseInt(e.target.value) || 0))}
                                className="w-12 h-8 text-center p-1 font-bold" 
                              />
                            </div>
                            <Label className={`capitalize w-20 text-right text-xs ${20 - (traitValues[trait] ?? 10) >= 16 ? 'font-bold underline' : ''}`}>{TRAIT_PAIRS[trait]}</Label>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 space-y-2 border-t pt-4">
                        <div className="flex items-center justify-between">
                          <Label className="font-serif italic font-bold">Chivalry Bonus (total=80+)</Label>
                          <Badge variant="outline" className={TRAITS.reduce((acc, t) => acc + (traitValues[t] || 0), 0) >= 80 ? "bg-primary/20 text-primary border-primary" : ""}>
                            {TRAITS.reduce((acc, t) => acc + (traitValues[t] || 0), 0)} / 80
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label className="font-serif italic font-bold">Religious Bonus (all 16+)</Label>
                          <Badge variant="outline" className="text-xs">Required: 16+</Badge>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-4 italic">
                        In Pendragon, traits are paired pairs (e.g. Chaste/Lustful). Generally, they add up to 20. Enter the primary left-side trait value here.
                      </p>
                      </fieldset>
                    </TabsContent>
                  </Tabs>
              </ScrollArea>
              <div className="p-6 border-t bg-secondary/20 flex justify-end gap-2">
                {!selectedCharacter ? (
                  <Button type="submit" disabled={mutation.isPending} className="w-32">
                    {mutation.isPending ? "Validating..." : "Save Knight"}
                  </Button>
                ) : !isEditing ? (
                  <>
                    <Button type="button" variant="destructive" onClick={() => deleteMut.mutate(selectedCharacter.id)} disabled={deleteMut.isPending}>Delete</Button>
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
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.length === 0 && <div className="col-span-full text-center text-muted-foreground py-12">No characters have been knighted yet.</div>}
        {characters.map((character: any) => (
          <Card 
            key={character.id} 
            className="shadow-card hover:shadow-hover transition-smooth flex relative overflow-hidden group cursor-pointer"
            onClick={() => {
              setSelectedCharacter(character);
              setIsEditing(false);
              setOpen(true);
            }}
          >
            <div className={`absolute top-0 left-0 w-1.5 h-full z-10 ${character.status === 'Dead' ? 'bg-destructive' : 'bg-primary'}`}></div>
            
            <div className="flex-shrink-0 w-32 md:w-44 bg-secondary/10 flex items-stretch border-r overflow-hidden">
              <Avatar className="h-full w-full rounded-none border-none">
                <AvatarImage src={character.imageUrl} alt={character.name} className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-500" />
                <AvatarFallback className="bg-gradient-royal text-primary-foreground font-serif text-5xl rounded-none w-full h-full flex items-center justify-center">
                  {character.name ? character.name.substring(0, 2).toUpperCase() : "??"}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 flex flex-col min-w-0">
              <CardHeader className="pb-2 border-b bg-secondary/5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <CardTitle className="text-xl font-bold font-serif mb-1 truncate">{character.name}</CardTitle>
                    <CardDescription className="text-xs truncate">
                      {character.age ? `${character.age} yo ` : ""}
                      {character.religion} {character.culture} {character.currentClass}
                    </CardDescription>
                  </div>
                  <Badge variant={character.status === "Dead" ? "destructive" : "default"} className="shadow-sm flex-shrink-0">
                    {character.glory || 0} Glory
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-3 flex-1 space-y-3 min-w-0">
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
                  <div className="flex items-center gap-1.5 min-w-0"><Globe className="h-3 w-3 text-muted-foreground flex-shrink-0"/> <span className="truncate">{character.homeland || 'Unknown'}</span></div>
                  <div className="flex items-center gap-1.5 min-w-0"><Shield className="h-3 w-3 text-muted-foreground flex-shrink-0"/> <span className="truncate">{character.lord || 'No Lord'}</span></div>
                </div>

                {/* Attributes Mini-Bar */}
                <div className="flex justify-between items-center text-[10px] font-mono bg-secondary/40 p-1.5 rounded border border-border/50">
                  <div className="flex flex-col items-center flex-1">
                    <span className="text-[9px] text-muted-foreground uppercase">SIZ</span>
                    <span className="font-bold">{character.siz || 10}</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <span className="text-[9px] text-muted-foreground uppercase">DEX</span>
                    <span className="font-bold">{character.dex || 10}</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <span className="text-[9px] text-muted-foreground uppercase">STR</span>
                    <span className="font-bold">{character.str || 10}</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <span className="text-[9px] text-muted-foreground uppercase">CON</span>
                    <span className="font-bold">{character.con || 10}</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <span className="text-[9px] text-muted-foreground uppercase">APP</span>
                    <span className="font-bold">{character.app || 10}</span>
                  </div>
                </div>

                {/* Notable Sub-stats */}
                <div className="flex flex-wrap gap-1">
                  {character.combatSkills?.sword > 5 && (
                    <Badge variant="outline" className="text-[9px] px-1 h-4">Sword {character.combatSkills.sword}</Badge>
                  )}
                  {character.passions?.loyaltyLord > 15 && (
                    <Badge variant="outline" className="text-[9px] px-1 h-4 bg-primary/5">Loyalty {character.passions.loyaltyLord}</Badge>
                  )}
                  {character.traits?.valorous > 15 && (
                    <Badge variant="outline" className="text-[9px] px-1 h-4 bg-accent/5 border-accent/20">Valorous {character.traits.valorous}</Badge>
                  )}
                </div>
              </CardContent>
              {character.player && (
                <div className="px-3 py-1.5 text-[10px] text-muted-foreground border-t bg-secondary/5 flex items-center gap-2 mt-auto">
                  <User className="h-2.5 w-2.5" />
                  Player: {character.player}
                </div>
              )}
            </div>
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
