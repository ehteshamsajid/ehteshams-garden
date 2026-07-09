import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./hooks/useAuth";
import RequireAdmin from "./components/RequireAdmin";
import Index from "./pages/Index";
import CategoriesPage from "./pages/Categories";
import ShopPage from "./pages/Shop";
import PlantDetail from "./pages/PlantDetail";
import CategoryPage from "./pages/CategoryPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import Dashboard from "./pages/admin/Dashboard";
import PlantsAdmin from "./pages/admin/PlantsAdmin";
import OrdersAdmin from "./pages/admin/OrdersAdmin";
import MessagesAdmin from "./pages/admin/MessagesAdmin";
import CustomersAdmin from "./pages/admin/CustomersAdmin";
import RolesAdmin from "./pages/admin/RolesAdmin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/plant/:id" element={<PlantDetail />} />
              <Route path="/plants/:category" element={<CategoryPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<RequireAdmin><Dashboard /></RequireAdmin>} />
              <Route path="/admin/plants" element={<RequireAdmin><PlantsAdmin /></RequireAdmin>} />
              <Route path="/admin/orders" element={<RequireAdmin><OrdersAdmin /></RequireAdmin>} />
              <Route path="/admin/messages" element={<RequireAdmin><MessagesAdmin /></RequireAdmin>} />
              <Route path="/admin/customers" element={<RequireAdmin><CustomersAdmin /></RequireAdmin>} />
              <Route path="/admin/roles" element={<RequireAdmin><RolesAdmin /></RequireAdmin>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
