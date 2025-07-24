import { useKanbanStore } from "@/lib/data-store";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogTitle } from "./ui/alert-dialog";
import { useState } from "react";

interface DeleteTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  columnId: string;
}

function AddTaskDialog({ open, onOpenChange, columnId }: DeleteTaskDialogProps) {
  const { addTask } = useKanbanStore();
  const [taskTitle, setTaskTitle] = useState("");  

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      addTask(columnId, taskTitle);
      setTaskTitle("");
      onOpenChange(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogTitle>Añadir nueva tarea</AlertDialogTitle>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Título de la tarea"
          className="input input-bordered w-full mb-4"
        />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleAddTask}>Añadir</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}export default AddTaskDialog;