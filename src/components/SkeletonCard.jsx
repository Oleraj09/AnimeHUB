const SkeletonCard = () => (
    <div className="flex flex-col sm:flex-row shadow p-4 rounded-[10px] gap-4 animate-pulse bg-gray-200">
        <div className="w-full sm:w-[170px] h-[230px] sm:h-full rounded bg-gray-300"></div>
        <div className="flex flex-col gap-y-2 flex-1 py-1">
            <div className="h-6 w-20 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
            <div className="h-5 w-full max-w-[250px] bg-gray-300 rounded mb-2"></div>
            <div className="flex gap-x-4 py-2 text-sm">
                <div className="h-4 w-16 bg-gray-300 rounded"></div>
                <div className="h-4 w-16 bg-gray-300 rounded"></div>
            </div>
            <div className="flex flex-wrap gap-2">
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
            </div>
        </div>
    </div>
);

export default SkeletonCard