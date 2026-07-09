import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }
  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-center px-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Access denied</h1>
          <p className="text-muted-foreground">You don't have permission to view this page.</p>
        </div>
      </div>
    );
  }
  return <>{children}</>;
};

export default RequireAdmin;
