import React from 'react'

const SkeletonLoader = () => {
  return (
    <>
      {/* පළමු Skeleton Block එක */}
      <div role="status" className="animate-pulse space-y-4 max-w-3xl mb-10">
        {/* Title එකක් වැනි කොටස */}
        <div className="h-6 bg-purple-900/30 rounded-md w-1/2 border border-purple-500/10"></div> 

        <div className="space-y-2"> 
          <div className="h-3 bg-zinc-800 rounded w-full"></div> 
          <div className="h-3 bg-zinc-800 rounded w-11/12"></div> 
          <div className="h-3 bg-zinc-800 rounded w-10/12"></div>
          <div className="h-3 bg-zinc-800 rounded w-9/12"></div>  
        </div>
    
        <div className="bg-zinc-900/50 border border-purple-500/10 rounded-xl p-4 space-y-2">
          <div className="h-2.5 bg-zinc-700 rounded w-3/4"></div> 
          <div className="h-2.5 bg-zinc-700 rounded w-2/3"></div> 
          <div className="h-2.5 bg-zinc-700 rounded w-1/2"></div> 
        </div> 
      </div> 
      
      {/* දෙවන Skeleton Block එක */}
      <div role="status" className="animate-pulse space-y-4 max-w-3xl mt-10">
        <div className="h-4 bg-purple-900/30 rounded-md w-1/2 border border-purple-500/10"></div> 

        <div className="space-y-2"> 
          <div className="h-3 bg-zinc-800 rounded w-full"></div> 
          <div className="h-3 bg-zinc-800 rounded w-11/12"></div> 
          <div className="h-3 bg-zinc-800 rounded w-10/12"></div>
          <div className="h-3 bg-zinc-800 rounded w-9/12"></div>  
        </div>
    
        <div className="bg-zinc-900/50 border border-purple-500/10 rounded-xl p-4 space-y-2">
          <div className="h-2.5 bg-zinc-700 rounded w-3/4"></div> 
          <div className="h-2.5 bg-zinc-700 rounded w-2/3"></div> 
          <div className="h-2.5 bg-zinc-700 rounded w-1/2"></div> 
          <div className="h-2.5 bg-zinc-700 rounded w-5/6"></div>   
        </div> 

        <div className="space-y-2 pt-2">
          <div className="h-3 bg-zinc-800 rounded w-full"></div> 
          <div className="h-3 bg-zinc-800 rounded w-1/3"></div> 
        </div> 

        <div className="h-px bg-purple-900/20 w-full my-4"></div> 

        <div className="space-y-2"> 
          <div className="h-2.5 bg-zinc-800 rounded w-full"></div> 
          <div className="h-2.5 bg-zinc-800 rounded w-11/12"></div> 
          <div className="h-2.5 bg-zinc-800 rounded w-10/12"></div> 
          <div className="h-2.5 bg-zinc-800 rounded w-9/12"></div> 
        </div> 
      </div> 
    </>
  )
}

export default SkeletonLoader