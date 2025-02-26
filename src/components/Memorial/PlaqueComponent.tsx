import { formatDeathDate } from '../../models/deceased';

interface PlaqueProps {
  name: string;
  dateOfDeath: string;
  description?: string;
}

const PlaqueComponent = ({ name, dateOfDeath, description }: PlaqueProps) => {
  return (
    <div className="bg-gray-300 rounded-lg p-4 mb-4 shadow-md transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 border-gray-400">
      <div className="bg-gradient-to-br from-gray-200 to-gray-400 rounded p-3 flex flex-col">
        {/* Silver plaque effect */}
        <div className="bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300 rounded p-3 border border-gray-400 shadow-inner">
          <h3 className="text-xl font-semibold text-gray-800 mb-1">{name}</h3>
          <p className="text-gray-700 text-sm mb-2">{formatDeathDate(dateOfDeath)}</p>
          {description && (
            <p className="text-gray-600 text-sm italic">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaqueComponent;