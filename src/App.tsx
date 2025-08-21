import { useState } from 'react';
import '/src/App.css';
import { EisenhowerSubSpaceModal, useTaskStore } from './modals/EisenhowerSubSpaceModal.tsx';
import Tasks from './components/Tasks.tsx';
import EisenhowerSubSpace from './components/EisenhowerSubSpace.tsx';
import { EisenhowerClassifications, Task } from './type.tsx';
import { ArrowDown, ArrowRight } from 'lucide-react';


export const App = () => {
    const [currentModal, setCurrentModal] = useState<EisenhowerClassifications | ''>('');
    const tasks = useTaskStore((s) => s.tasks);

    type SubSpace = {
        key: EisenhowerClassifications;
        className: string;
        title: React.JSX.Element;
        description: React.JSX.Element;
        tasks: Task[];
    }[];

    const subSpaces: SubSpace = [
        {
            key: 'NonUrgent&Important',
            className: 'q2',
            title: <>Important mais non urgent</>,
            description: <>Ces tâches nécessitent votre attention, mais pas immédiatement. Planifiez leur réalisation dans les prochains jours ou semaines.</>,
            tasks: tasks['NonUrgent&Important'] ?? []
        },
        {
            key: 'Urgent&Important',
            className: 'q1',
            title: <>Urgent et Important</>,
            description: <>Ces tâches exigent une action immédiate. Traitez-les <strong>tout de suite</strong> ou déléguez-les si possible</>,
            tasks: tasks['Urgent&Important'] ?? []
        },
        {
            key: 'NonUrgent&NonImportant',
            className: 'q3',
            title: <>Non important et non urgent</>,
            description: <>Ces tâches peuvent être éliminées ou reportées indéfiniment. Ne leur consacrez pas de temps précieux.</>,
            tasks: tasks['NonUrgent&NonImportant'] ?? []
        },
        {
            key: 'Urgent&NonImportant',
            className: 'q4',
            title: <>Urgent mais non important</>,
            description: <>Ces tâches demandent une attention rapide, mais ne contribuent pas <strong>essentiellement</strong> à vos objectifs. Déléguez-les si possible.</>,
            tasks: tasks['Urgent&NonImportant'] ?? []
        },]

    return (
        <div className='h-screen'>
            <div style={{
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 120'><polygon points='20,0 10,15 30,15' fill='%239b9b9b' /><line x1='20' y1='0' x2='20' y2='120' stroke='%239b9b9b' stroke-width='1' /></svg>")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: 'top',
                backgroundSize: "100% 100%",

                width: "40px",
                height: "100vh",

                border: '1px solid black'
            }}>
                {/* Hamburger menu styling here */}
                <div className="grid">
                    {subSpaces.map((subSpace) => {
                        return (
                            <div key={subSpace.key} className={"group q flex flex-col p-4 " + subSpace.className} onClick={() => setCurrentModal(subSpace.key)}>
                                <EisenhowerSubSpace
                                    category={subSpace.key}
                                    title={subSpace.title}
                                    description={subSpace.description}
                                    tasks={subSpace.tasks}
                                />
                            </div>
                        )
                    })}
                    {
                        currentModal !== '' &&
                        <div className='w-full'>
                            <EisenhowerSubSpaceModal eisenhowerCategory={currentModal} />
                        </div>
                    }
                </div>
            </div>

        </div>
    )
}