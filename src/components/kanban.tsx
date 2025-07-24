import type { Column } from "@/types/Column";
import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import ColumnComponent from "./Column";

const initialBoard: Column[] = [
  { id: "todo", title: "To Do", tasks: [{ id: "1", title: "Estudiar React" }] },
  { id: "doing", title: "En progreso", tasks: [{ id: "2", title: "Cambiar estilos" }] },
  { id: "done", title: "Hecho", tasks: [{ id: "3", title: "Conquistar el mundo" }] },
];

const sensors = useSensors(useSensor(PointerSensor));

function Kanban() {
  const [board, setBoard] = useState<Column[]>(initialBoard);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setBoard((prev) => {
      // Buscar columna y tarea
      const sourceColumn = prev.find((col) =>
        col.tasks.some((t) => t.id === active.id)
      );
      const task = sourceColumn?.tasks.find((t) => t.id === active.id);
      if (!task) return prev;

      // Eliminar tarea de columna original
      const newSourceTasks = sourceColumn.tasks.filter((t) => t.id !== task.id);
      const newColumns = prev.map((col) =>
        col.id === sourceColumn.id ? { ...col, tasks: newSourceTasks } : col
      );

      // Agregar a columna destino
      return newColumns.map((col) =>
        col.id === over.id ? { ...col, tasks: [...col.tasks, task] } : col
      );
    });
  }

  return (
    <div style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
      <DndContext onDragEnd={handleDragEnd}>
        {board.map((column) => (
          <ColumnComponent key={column.id} column={column} />
        ))}
      </DndContext>
    </div>
  );
}

export default Kanban;
