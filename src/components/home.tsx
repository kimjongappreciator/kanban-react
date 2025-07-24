
import Kanban from "./kanban";

function Home() {  
  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-bold">Hola 👋</h1>
      </div>
      <div className="flex min-h-svh flex-col items-center justify-center">        
        <Kanban/>
      </div>
    </>
  );
}
export default Home;
