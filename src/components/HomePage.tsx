import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 text-gray-900 p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to New App</h1>
      <p className="text-lg mb-8">It's great to be here.</p>
      
      <Link 
        to="/memorial"
        className="px-6 py-3 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition-colors cursor-pointer"
      >
        Visit Memorial Page
      </Link>
    </div>
  );
};

export default HomePage;