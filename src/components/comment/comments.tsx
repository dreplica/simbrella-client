import React from 'react'

const Comment = ({ name, comment }: { name: string; comment: string }) => {
  return (
    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg shadow-sm mb-4 max-w-fit">
      {/* Avatar Placeholder */}
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">
          {name.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* Comment Content */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900">{name}</h4>
        <p className="mt-1 text-gray-700">{comment}</p>
      </div>
    </div>
  )
}

export default Comment
