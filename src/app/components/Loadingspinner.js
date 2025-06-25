export default function Loadingspinner() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
          {/* Image Skeleton */}
          <div className="aspect-square bg-gray-200"></div>
          
          {/* Content Skeleton */}
          <div className="p-5 space-y-3">
            {/* Rating skeleton */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3 h-3 bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="w-16 h-3 bg-gray-200 rounded"></div>
            </div>
            
            {/* Title skeleton */}
            <div className="space-y-2">
              <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
              <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
            </div>
            
            {/* Price skeleton */}
            <div className="flex items-center gap-2">
              <div className="w-20 h-6 bg-gray-200 rounded"></div>
              <div className="w-16 h-4 bg-gray-200 rounded"></div>
            </div>
            
            {/* Button skeleton */}
            <div className="w-full h-10 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
