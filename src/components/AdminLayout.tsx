import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Leaf, ShoppingBag, Users, MessageSquare, Shield, LogOut, Home, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/plants", label: "Plants", icon: Leaf },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/messages", label: "Messages", icon: MessageSquare },
  { to: "/admin/roles", label: "Roles", icon: Shield },
];

const SidebarInner = ({ onNavigate }: { onNavigate?: () => void }) => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="h-full flex flex-col bg-card">
      <div className="p-6 border-b border-border bg-gradient-to-br from-primary/10 via-transparent to-accent/10">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center ring-1 ring-primary/30">
            <Leaf className="h-4 w-4 text-primary" />
          </div>
          <div className="leading-tight">
            <span className="font-serif text-lg font-semibold block">Ehtesham's Garden</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-accent">Admin Panel</span>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`
            }
          >
            <l.icon className="h-4 w-4" />
            {l.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-border space-y-2">
        <div className="flex items-center justify-between px-3">
          <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          <ThemeToggle />
        </div>
        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => { onNavigate?.(); navigate("/"); }}>
          <Home className="h-4 w-4" /> View site
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={async () => { onNavigate?.(); await signOut(); navigate("/"); }}>
          <LogOut className="h-4 w-4" /> Sign out
        </Button>
      </div>
    </div>
  );
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <div className="min-h-screen flex bg-muted/30">
      <aside className="hidden md:flex w-64 border-r border-border flex-col shrink-0">
        <SidebarInner />
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden sticky top-0 z-30 flex items-center justify-between gap-2 px-4 h-14 border-b border-border bg-card/95 backdrop-blur">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <SidebarInner onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-primary/15 flex items-center justify-center ring-1 ring-primary/30">
              <Leaf className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="font-serif text-base font-semibold">Ehtesham's Garden</span>
          </div>
          <ThemeToggle />
        </header>
        <main className="flex-1 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
