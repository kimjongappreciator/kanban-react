import { ThemeProvider } from './components/theme-provider'
import { ModeToggle } from './components/mode-toggle'
import Home from './components/home'


function App() {  

  return (
    <>    
    <ThemeProvider  defaultTheme="light" storageKey="vite-ui-theme">
      <ModeToggle />
      <Home/>      
    </ThemeProvider>
    </>
  )
}

export default App
