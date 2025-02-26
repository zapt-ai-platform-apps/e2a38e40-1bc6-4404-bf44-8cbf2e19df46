import PlaqueComponent from './PlaqueComponent';

interface Deceased {
  id: number;
  name: string;
  dateOfDeath: string;
  description?: string;
}

interface MemorialListProps {
  deceased: Deceased[];
}

const MemorialList = ({ deceased }: MemorialListProps) => {
  return (
    <div className="overflow-y-auto p-6 h-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">In Loving Memory</h2>
      <div className="space-y-4">
        {deceased.map((person) => (
          <PlaqueComponent
            key={person.id}
            name={person.name}
            dateOfDeath={person.dateOfDeath}
            description={person.description}
          />
        ))}
      </div>
    </div>
  );
};

export default MemorialList;