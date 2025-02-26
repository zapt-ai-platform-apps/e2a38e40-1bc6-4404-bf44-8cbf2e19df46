import { useMemorial } from '../../hooks/useMemorial';
import CandleComponent from '../../components/Memorial/CandleComponent';
import MemorialList from '../../components/Memorial/MemorialList';

const MemorialScreen = () => {
  const { deceased, loading, error } = useMemorial();

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <header className="bg-gray-800 p-4 text-center shadow-md">
        <h1 className="text-3xl font-bold">Memorial Page</h1>
      </header>
      
      {error && (
        <div className="text-center p-8 text-red-500">
          <p className="text-xl">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
          >
            Try Again
          </button>
        </div>
      )}
      
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-t-transparent border-gray-200 rounded-full animate-spin"></div>
            <p className="mt-4 text-xl text-gray-300">Loading memorial...</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 h-full">
          <div className="h-[300px] md:h-full">
            <CandleComponent />
          </div>
          <div className="bg-gray-100 text-gray-900 h-full">
            <MemorialList deceased={deceased} />
          </div>
        </div>
      )}
      
      <footer className="bg-gray-800 p-4 text-center text-sm text-gray-400">
        <p>Remember and honor those who have passed.</p>
        <a 
          href="https://www.zapt.ai" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-white"
        >
          Made on ZAPT
        </a>
      </footer>
    </div>
  );
};

export default MemorialScreen;