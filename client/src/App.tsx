import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Router from "./Router";
import ChatButton from "@/components/AiChat/ChatButton";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <ChatButton />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;