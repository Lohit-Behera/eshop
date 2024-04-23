import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <h1 className="text-3xl font-bold text-center my-6 bg-primary">EShop</h1>
    </ThemeProvider>
  );
}

export default App;
