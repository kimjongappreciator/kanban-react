import type { Column } from "@/types/Column";
import {
  closestCorners,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import ColumnComponent from "./Column";
import { arrayMove } from "@dnd-kit/sortable";

const initialBoard: Column[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      { id: "1", title: "Estudiar React" },
      { id: "4", title: "Aprender TypeScript" },
      { id: "5", title: "Configurar ESLint" },
    ],
  },
  {
    id: "doing",
    title: "En progreso",
    tasks: [
      { id: "2", title: "Cambiar estilos" },
      { id: "6", title: "Implementar drag & drop" },
    ],
  },
  {
    id: "done",
    title: "Hecho",
    tasks: [{ id: "3", title: "Conquistar el mundo" }],
  },
];

function Kanban() {
  const [board, setBoard] = useState<Column[]>(initialBoard);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px de movimiento antes de activar drag
      },
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setBoard((prev) => {
      // Encontrar columna origen
      const sourceColumn = prev.find((col) =>
        col.tasks.some((task) => task.id === active.id)
      );

      if (!sourceColumn) return prev;

      // Encontrar columna destino
      let destinationColumn: Column | undefined;
      let isOverTask = false;

      // Verificar si 'over' es una tarea o una columna
      for (const col of prev) {
        if (col.id === over.id) {
          destinationColumn = col;
          break;
        }
        if (col.tasks.some((task) => task.id === over.id)) {
          destinationColumn = col;
          isOverTask = true;
          break;
        }
      }

      if (!destinationColumn) return prev;

      const task = sourceColumn.tasks.find((t) => t.id === active.id);
      if (!task) return prev;

      // CASO 1: Reordenar dentro de la misma columna
      if (sourceColumn.id === destinationColumn.id) {
        const oldIndex = sourceColumn.tasks.findIndex(
          (t) => t.id === active.id
        );
        let newIndex: number;

        if (isOverTask) {
          newIndex = sourceColumn.tasks.findIndex((t) => t.id === over.id);
        } else {
          // Si se suelta sobre la columna, mover al final
          newIndex = sourceColumn.tasks.length - 1;
        }

        const newTasks = arrayMove(sourceColumn.tasks, oldIndex, newIndex);

        return prev.map((col) =>
          col.id === sourceColumn.id ? { ...col, tasks: newTasks } : col
        );
      }

      // CASO 2: Mover entre diferentes columnas
      const newSourceTasks = sourceColumn.tasks.filter(
        (t) => t.id !== active.id
      );
      let newDestinationTasks = [...destinationColumn.tasks];

      if (isOverTask) {
        // Insertar antes de la tarea objetivo
        const overIndex = newDestinationTasks.findIndex(
          (t) => t.id === over.id
        );
        newDestinationTasks.splice(overIndex, 0, task);
      } else {
        // Si se suelta sobre la columna, agregar al final
        newDestinationTasks.push(task);
      }

      return prev.map((col) => {
        if (col.id === sourceColumn.id) {
          return { ...col, tasks: newSourceTasks };
        } else if (col.id === destinationColumn.id) {
          return { ...col, tasks: newDestinationTasks };
        }
        return col;
      });
    });
  }

  return (
    <div style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
      <DndContext
        onDragEnd={handleDragEnd}
        sensors={sensors}
        collisionDetection={closestCorners}
      >
        {board.map((column) => (
          <ColumnComponent key={column.id} column={column} />
        ))}
      </DndContext>
    </div>
  );
}

export default Kanban;
