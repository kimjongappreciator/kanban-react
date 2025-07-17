import  { useState } from 'react';
import { Button } from '@/components/ui/button';

function Home() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Welcome to the Kanban Board</h1>
      <p className="mt-4 text-lg">This is your home page.</p>
      <Button onClick={() => setCount((count) => count + 1)}>
        Click me: {count}
      </Button>
    </div>
  );
}
export default Home;
