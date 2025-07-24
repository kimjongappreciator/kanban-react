import type { Column } from "@/types/Column";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { CircleX } from "lucide-react";

function ColumnComponent({ column }: { column: Column }) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <Card
      ref={setNodeRef}
      className={cn(
        "w-72 flex flex-col justify-between",
        isOver && "ring-2 ring-primary/30"
      )}
    >
      <CardHeader>
        <CardTitle>{column.title}</CardTitle>
        <CardAction className="text-xs text-muted-foreground" onClick={() => console.log("Eliminar columna")}>
            <CircleX className="inline-block mr-1" />
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-2">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </CardContent>

      <CardFooter>
        <Button size="sm" className="w-full">
          Añadir tarea
        </Button>
      </CardFooter>
    </Card>
  );
}
export default ColumnComponent;
