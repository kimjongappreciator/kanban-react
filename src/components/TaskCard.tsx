import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { CircleX, GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { useState } from "react";
import DeleteTaskDialog from "./DeleteTaskDialog";

type Task = { id: string; title: string };

export function TaskCard({ task }: { task: Task }) {  
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id: task.id,
    });

  const [open, setOpen] = useState(false);

  const style = {
    transform: CSS.Translate.toString(transform), // convierte el transform a string CSS
  };  

  return (
    <>
      <div ref={setNodeRef} style={style}>
        <Card
          className={cn(
            "mb-2 select-none border shadow-sm transition",
            isDragging && "opacity-70 ring-2 ring-primary"
          )}
        >
          <CardHeader className="py-2 flex items-center justify-between">
            <CardTitle className="text-sm">{task.title}</CardTitle>
            <div className="flex items-center gap-2">
              {/* Botón u otras acciones */}
              <CircleX
                className="h-4 w-4 cursor-pointer text-muted-foreground"
                onClick={()=>setOpen(true)}
              />
              {/* Área de arrastre (handle) */}
              <div {...listeners} {...attributes} className="cursor-grab">
                <GripVertical className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="py-2 text-xs text-muted-foreground">
            (Descripción corta opcional)
          </CardContent>
        </Card>
      </div>
      <DeleteTaskDialog open={open} onOpenChange={setOpen} task={task} /> 
    </>
  );
}
export default TaskCard;
