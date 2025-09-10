export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-b-4 border-gray-200" />
      <span className="ml-4 text-lg text-gray-700">Loading...</span>
    </div>
  );
}
