import type { Column } from "@/types/Column";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import {
  Card,  
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import AddTaskDialog from "./AddTaskDialog";


function ColumnComponent({ column }: { column: Column }) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });
  const taskIds = column.tasks.map((task) => task.id);
  const [open, setOpen] = useState(false);

  return (
    <>
    <Card
      ref={setNodeRef}
      className={cn(
        "w-72 flex flex-col justify-between",
        isOver && "ring-2 ring-primary/30"
      )}
    >
      <CardHeader>
        <CardTitle>{column.title}</CardTitle>        
      </CardHeader>

      <CardContent className="space-y-2">
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {column.tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </CardContent>

      <CardFooter>
        <Button size="sm" className="w-full" onClick={() => setOpen(true)}>
          Añadir tarea
        </Button>
      </CardFooter>
    </Card>
    <AddTaskDialog open={open} onOpenChange={setOpen} columnId={column.id}/>
    </>
  );
}
export default ColumnComponent;
