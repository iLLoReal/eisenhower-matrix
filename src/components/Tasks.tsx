import { useEffect, useState } from "react";
import { Task } from "../type.tsx";

export default function Tasks({ tasks }: { tasks: Task[] }) {
    const [currentTasks, setCurrentTasks] = useState<Task[]>(tasks);

    useEffect(() => {
        console.log(currentTasks);
        setCurrentTasks(tasks);
    }, [tasks])
    return (
        <>
            <ul className="flex flex-col items-start list-disc">
                {
                    currentTasks?.map((task, index) =>
                        <li key={task.id}>{task.desc}</li>
                    )
                }
            </ul>
        </>
    )
}
