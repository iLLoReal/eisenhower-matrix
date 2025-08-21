import { immer } from 'zustand/middleware/immer'

import { create } from "zustand"
import { useState } from 'react';
import { EisenhowerClassifications, Task } from '../type.tsx';
import { CirclePlus } from 'lucide-react';

type EisenhowerTask = Partial<Record<EisenhowerClassifications, Task[]>>;

type State = {
    tasks: EisenhowerTask;
}

type Action = {
    sync: (task: State["tasks"]) => void;
}

export const useTaskStore = create<State & Action>((set) => ({
    tasks: {},
    sync: (task) => {
        console.log("ici : ", task);
        set((state) => ({
            tasks: {
                "Urgent&Important": [...state.tasks["Urgent&Important"] ?? [], ...task['Urgent&Important'] ?? []],
                "NonUrgent&Important": [...state.tasks["NonUrgent&Important"] ?? [], ...task['NonUrgent&Important'] ?? []],
                "Urgent&NonImportant": [...state.tasks["Urgent&NonImportant"] ?? [], ...task['Urgent&NonImportant'] ?? []],
                "NonUrgent&NonImportant": [...state.tasks["NonUrgent&NonImportant"] ?? [], ...task['NonUrgent&NonImportant'] ?? []]
            }
        }))
    }
}));

export function EisenhowerSubSpaceModal({ eisenhowerCategory }: { eisenhowerCategory: Partial<EisenhowerClassifications> }) {
    const [currentTaskValue, setCurrentTaskValue] = useState("");
    const sync = useTaskStore((s) => s.sync);
    const updateCurrentTask = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentTaskValue(e.currentTarget.value);
    }

    const bgByCat = {
        "Urgent&Important": "bg-red-200",
        "NonUrgent&Important": "bg-green-200",
        "Urgent&NonImportant": "bg-blue-200",
        "NonUrgent&NonImportant": "bg-yellow-200"
    }

    return (
        <>
            <h1 className={bgByCat[eisenhowerCategory]}>
                {eisenhowerCategory}
            </h1>
            <textarea className='border' id="#task-description" onChange={updateCurrentTask} />
            <button onClick={(e) => sync({
                [eisenhowerCategory]: [{ id: crypto.randomUUID(), desc: currentTaskValue }]
            })}>ADD</button>
        </>

    )
}