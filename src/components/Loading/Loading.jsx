const Loading = () => {
  return (
    <div className="fixed bg-gray-400 bg-opacity-50 inset-0 flex items-center justify-center z-[9899999]">
      <div className="w-8 h-8 border-4 animate-spin border-sky-500 border-t-gray-200 rounded-full"></div>
    </div>
  );
};

export default Loading;
