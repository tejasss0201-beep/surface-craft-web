/** Surface Craft app shell — The Restoration Journal: quiet luxury, limestone/ink contrast, verdigris as a deliberate signal. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import OurStory from "./pages/OurStory";
import { ConcreteCleaningPage, TrashBinsPage } from "./pages/ServiceDetail";

function Router() {
  return <Switch><Route path="/" component={Home} /><Route path="/our-story" component={OurStory} /><Route path="/trash-bins" component={TrashBinsPage} /><Route path="/concrete-cleaning" component={ConcreteCleaningPage} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster richColors position="bottom-right" /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
