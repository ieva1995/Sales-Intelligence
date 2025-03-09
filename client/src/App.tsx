import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Router from "./Router";
import ChatButton from "@/components/AiChat/ChatButton";
import { AuthProvider } from "./hooks/use-auth";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <ChatButton />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;