// src/screens/ProgressMap.tsx

import React from "react";

const ProgressMap: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-green-100 to-green-200 text-center">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        Progress Map (Coming Soon)
      </h1>
      <p className="text-gray-700">
        This screen will show your level progression and achievements.
      </p>
    </div>
  );
};

export default ProgressMap;
