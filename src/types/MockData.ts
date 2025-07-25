import type { Column } from "@/types/Column";


export const initialData : Column[]= [{
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
}]