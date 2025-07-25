import { create } from "zustand";
import { arrayMove } from "@dnd-kit/sortable";
import type { Column } from "@/types/Column";

const initialBoard: Column[] = [{
  id: "todo",
  title: "To Do",
  tasks: [
    { id: "1", title: "Viajar al pasado y estudiar otra carrera" },
    { id: "2", title: "Unificar la mecánica cuántica y la relatividad general" },
  ],
}, {
  id: "doing",
  title: "En progreso",
  tasks: [
    { id: "3", title: "Infiltrarme en la guarida Illuminati" },
    { id: "4", title: "Encriptar sentimientos en formato .zip" }
  ],
}, {
  id: "done",
  title: "Hecho",
  tasks: [
    { id: "5", title: "Resolver si el color que veo como rojo es el mismo que ves tú." },
    { id: "6", title: "Conquistar el mundo" }],
}];

interface KanbanStore {  
  board: Column[];
  activeTask: any;

  initializeBoard: (initialData: Column[]) => void;
  setActiveTask: (task: any) => void;
  addTask: (columnId: string, title: string) => void;
  deleteTask: (taskId: string) => void;
  moveTask: (activeId: string, overId: string, isOverTask: boolean) => void;
  addColumn: (title: string) => void;
  deleteColumn: (columnId: string) => void;
}

export const useKanbanStore = create<KanbanStore>((set, get) => ({

  board:  initialBoard,
  activeTask: null,

  initializeBoard: (initialData) => set({ board: initialData }),

  // Manejar drag overlay
  setActiveTask: (task) => set({ activeTask: task }),

  addTask: (columnId, title) => set((state) => ({
    board: state.board.map(col =>
      col.id === columnId
        ? {
          ...col,
          tasks: [
            ...col.tasks,
            {
              id: crypto.randomUUID(),
              title: title.trim()
            }
          ]
        }
        : col
    )
  })),

  deleteTask: (taskId) => set((state) => ({
    board: state.board.map(col => ({
      ...col,
      tasks: col.tasks.filter(task => task.id !== taskId)
    }))
  })),

  // Mover tareas (drag & drop)
  moveTask: (activeId, overId, isOverTask) => set((state) => {
    const { board } = state;


    const sourceColumn = board.find((col) =>
      col.tasks.some((task) => task.id === activeId)
    );

    if (!sourceColumn) return state;


    let destinationColumn: Column | undefined;

    for (const col of board) {
      if (col.id === overId) {
        destinationColumn = col;
        break;
      }
      if (col.tasks.some((task) => task.id === overId)) {
        destinationColumn = col;
        break;
      }
    }

    if (!destinationColumn) return state;

    const task = sourceColumn.tasks.find((t) => t.id === activeId);
    if (!task) return state;

    // CASO 1: Reordenar dentro de la misma columna
    if (sourceColumn.id === destinationColumn.id) {
      const oldIndex = sourceColumn.tasks.findIndex((t) => t.id === activeId);
      let newIndex: number;

      if (isOverTask) {
        newIndex = sourceColumn.tasks.findIndex((t) => t.id === overId);
      } else {
        newIndex = sourceColumn.tasks.length - 1;
      }

      const newTasks = arrayMove(sourceColumn.tasks, oldIndex, newIndex);

      return {
        board: board.map((col) =>
          col.id === sourceColumn.id ? { ...col, tasks: newTasks } : col
        )
      };
    }

    // CASO 2: Mover entre diferentes columnas
    const newSourceTasks = sourceColumn.tasks.filter((t) => t.id !== activeId);
    let newDestinationTasks = [...destinationColumn.tasks];

    if (isOverTask) {
      const overIndex = newDestinationTasks.findIndex((t) => t.id === overId);
      newDestinationTasks.splice(overIndex, 0, task);
    } else {
      newDestinationTasks.push(task);
    }

    return {
      board: board.map((col) => {
        if (col.id === sourceColumn.id) {
          return { ...col, tasks: newSourceTasks };
        } else if (col.id === destinationColumn.id) {
          return { ...col, tasks: newDestinationTasks };
        }
        return col;
      })
    };
  }),

  addColumn: (title) => set((state) => ({
    board: [
      ...state.board,
      {
        id: crypto.randomUUID(),
        title: title.trim(),
        tasks: []
      }
    ]
  })),

  deleteColumn: (columnId) => set((state) => ({
    board: state.board.filter(col => col.id !== columnId)
  })),

  saveBoard: () => {
    const boardData = get().board;
    localStorage.setItem("kanban-board", JSON.stringify(boardData));
  }
}));
