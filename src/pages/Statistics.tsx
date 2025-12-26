import { PieChart } from "lucide-react";
// coming soon.
const Statistics = () => {
  return (
    <div className="h-[80vh] w-full flex justify-center items-center">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <PieChart size={48} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-200">
          Statistics Page Coming Soon
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          This feature is under development. In future, you'll be able to see detailed analytics and typing performance here.
        </p>
      </div>
    </div>
  );
};


export default Statistics