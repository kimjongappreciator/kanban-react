import { useKanbanStore } from "@/lib/data-store";
import type { Task } from "@/types/Task";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogTitle } from "./ui/alert-dialog";

interface DeleteTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task
}

function DeleteTaskDialog({open, onOpenChange, task}: DeleteTaskDialogProps){
    const {deleteTask} = useKanbanStore();    

    const handleAction = () => {
        if (!task) {
            console.error("No task provided for deletion");
            return;
        }
        deleteTask(task.id);
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogTitle>
                    Estas seguro de que deseas eliminar la tarea?
                </AlertDialogTitle>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleAction}>
                        Confirmar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>)
} export default DeleteTaskDialog;