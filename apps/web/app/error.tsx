"use client";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="container flex items-center justify-center max-w-6xl py-6 h-fit lg:py-10">
      <div className="flex flex-col items-center">
        <h2>{error.message}</h2>
        <button
          onClick={
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </div>
  );
};

export default Error;
