import { useState } from 'react'
import { Button } from './components/ui/button'
import { ThemeProvider } from './components/theme-provider'
import { ModeToggle } from './components/mode-toggle'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ModeToggle />
    <ThemeProvider  defaultTheme="light" storageKey="vite-ui-theme">
      <div className="flex min-h-svh flex-col items-center justify-center">
      <Button onClick={() => setCount((count) => count + 1)}>Click me: {count}</Button>
    </div>
    </ThemeProvider>
    </>
  )
}

export default App
