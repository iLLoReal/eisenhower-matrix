import { useState } from "react";
import Tasks from "./Tasks.tsx";
import { EisenhowerSubSpaceModal } from "../modals/EisenhowerSubSpaceModal.tsx";
import { EisenhowerClassifications, Task } from "../type.tsx";

export default function EisenhowerSubSpace({ tasks, title, description, category }: { tasks: Task[], title: React.JSX.Element, description: React.JSX.Element, category: EisenhowerClassifications }) {
    const [shouldDisplayModal, setShouldDisplayModal] = useState("");

    return (
        <>
            <h2>{title}</h2>
            <p>{description}</p>
            Taches:

            <div className='mb-10 flex-2 p-4'>
                <Tasks tasks={tasks} />
            </div>
        </>
    )
}