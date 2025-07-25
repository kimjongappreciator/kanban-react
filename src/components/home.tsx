
import Kanban from "./kanban";

function Home() {  
  return (
    <>      
      <div className="flex min-h-svh flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Hola 👋</h1>        
        <Kanban/>
      </div>
    </>
  );
}
export default Home;
