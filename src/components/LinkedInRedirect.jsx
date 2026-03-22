import { useEffect } from 'react';

const LinkedInRedirect = () => {
  useEffect(() => {
    window.location.href = "https://www.linkedin.com/in/coderisetech";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-color)] text-[var(--text-main)]">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4 font-outfit">Redirecting to LinkedIn...</h1>
        <div className="w-12 h-12 border-4 border-primary-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
};

export default LinkedInRedirect;
