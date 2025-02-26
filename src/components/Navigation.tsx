import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=64&height=64" 
            alt="App Logo" 
            className="h-8 w-8 mr-2"
          />
          <span className="text-xl font-bold">New App</span>
        </div>
        
        <ul className="flex space-x-6">
          <li>
            <Link 
              to="/" 
              className={`hover:text-gray-300 ${isActive('/') ? 'font-bold text-white' : 'text-gray-300'}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/memorial" 
              className={`hover:text-gray-300 ${isActive('/memorial') ? 'font-bold text-white' : 'text-gray-300'}`}
            >
              Memorial
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;