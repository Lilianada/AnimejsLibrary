const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-sm text-foreground/70 mb-6">
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="bg-primary text-primary-foreground px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
