
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ListIcon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title, 
  showBackButton = false 
}) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-clinical-gray flex flex-col animate-fade-in">
      <header className="bg-white shadow-sm px-6 py-4 backdrop-blur-md bg-white/90 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Link 
                to="/" 
                className="text-clinical-dark hover:text-clinical-blue transition-colors duration-200"
              >
                ← Back
              </Link>
            )}
            {title && (
              <h1 className="text-xl font-medium">{title}</h1>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {location.pathname !== "/call-history" && (
              <Link 
                to="/call-history" 
                className="flex items-center text-clinical-blue hover:text-clinical-dark transition-colors duration-200"
              >
                <ListIcon className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Call History</span>
              </Link>
            )}
            <div className="text-sm font-medium text-clinical-blue">
              AI Clinical Assistant
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
      <footer className="py-6 px-6 text-center text-sm text-gray-500">
        <div className="max-w-5xl mx-auto">
          © {new Date().getFullYear()} AI Clinical Assistant Prototype
        </div>
      </footer>
    </div>
  );
};

export default Layout;
