import type { Column } from "@/types/Column";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useEffect} from "react";
import ColumnComponent from "./Column";
import TaskCard from "./TaskCard";
import { useKanbanStore } from "@/lib/data-store";

interface KanbanProps {
  initialData?: Column[];
}

function Kanban({ initialData }: KanbanProps) {
  const { board, activeTask, initializeBoard, setActiveTask, moveTask } =
    useKanbanStore();

  useEffect(() => {
    if (initialData) {
      initializeBoard(initialData);
    }
  }, [initialData, initializeBoard]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px de movimiento antes de activar drag
      },
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    // Encontrar la tarea que se está arrastrando
    const task = board
      .flatMap((col) => col.tasks)
      .find((t) => t.id === active.id);
    setActiveTask(task);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      setActiveTask(null);
      return;
    }

    // Determinar si se soltó sobre una tarea
    const isOverTask = board.some((col) =>
      col.tasks.some((task) => task.id === over.id)
    );

    // Usar la función del store
    moveTask(active.id as string, over.id as string, isOverTask);
    setActiveTask(null);
  }

  return (
    <div style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
      <DndContext
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        sensors={sensors}
        collisionDetection={closestCorners}
      >
        {board.map((column) => (
          <ColumnComponent key={column.id} column={column} />
        ))}
        <DragOverlay>
          {activeTask ? (
            <div className="rotate-3 opacity-90">
              <TaskCard task={activeTask} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default Kanban;
