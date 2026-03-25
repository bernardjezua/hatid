import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = ({ category, product }) => {
  const location = useLocation();
  
  // Clean up the path segments
  const segments = [
    { name: 'Home', path: '/' }
  ];

  if (category) {
    segments.push({ 
      name: category.charAt(0).toUpperCase() + category.slice(1).toLowerCase(), 
      path: `/category/${category.toLowerCase()}` 
    });
  }

  if (product) {
    segments.push({ 
      name: product, 
      path: location.pathname 
    });
  }

  return (
    <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-8 text-neutral-400">
      {segments.map((segment, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="text-[10px] opacity-40">/</span>}
          {index === segments.length - 1 ? (
            <span className="text-primary-forest">{segment.name}</span>
          ) : (
            <Link to={segment.path} className="hover:text-primary-forest transition-colors">
              {segment.name}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
