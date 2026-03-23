import { NavLink } from "@/components/NavLink";
import { Book, Users, Scroll, Target, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: Home, label: "Dashboard" },
  { to: "/sessions", icon: Book, label: "Sessions" },
  { to: "/characters", icon: Users, label: "Characters" },
  { to: "/npcs", icon: Scroll, label: "NPCs" },
  { to: "/quests", icon: Target, label: "Quests" },
];

export const Navigation = () => {
  return (
    <nav className="bg-gradient-royal shadow-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Scroll className="h-8 w-8 text-accent" />
            <h1 className="text-xl font-bold text-primary-foreground">Campaign Tracker</h1>
          </div>
          
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10 transition-smooth"
                activeClassName="bg-white/20 text-primary-foreground font-medium"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex overflow-x-auto space-x-1 pb-2 scrollbar-hide">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="flex items-center space-x-1 px-3 py-2 rounded-lg text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10 transition-smooth whitespace-nowrap"
              activeClassName="bg-white/20 text-primary-foreground font-medium"
            >
              <item.icon className="h-4 w-4" />
              <span className="text-sm">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
