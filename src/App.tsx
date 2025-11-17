import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { LetterList } from './components/organisms/LetterList';
import { Mail, Sparkles } from 'lucide-react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-purple-900/20 via-purple-800/20 to-purple-900/20 border-b border-purple-500/20 shadow-lg shadow-purple-500/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Mail className="w-8 h-8 text-purple-400" />
                  <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                    Joker's Letter Tracker
                  </h1>
                  <p className="text-sm text-purple-300/70">
                    Why so serious? Track your letters! 🃏
                  </p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <span className="text-sm text-purple-300">Chaos Organized</span>
                <span className="text-purple-400">✨</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="bg-gradient-to-br from-purple-900/10 to-transparent rounded-2xl p-8 backdrop-blur-sm border border-purple-500/10 shadow-2xl shadow-purple-500/5">
            <LetterList />
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 py-6 text-center text-purple-300/50 text-sm border-t border-purple-500/10">
          <p>🎭 Let's put a smile on those letters! 🎭</p>
        </footer>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;