import { usePage } from "@/context/pageContext";



const SingleBlog = () => {
        
	const {post } = usePage();


	return (
    <div className="flex justify-center">
      <div className="grid grid-cols-12 px-6 md:px-10 w-full pt-16 max-w-screen-xl">
        <div className="col-span-12 md:col-span-10 md:col-start-2">
          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            {post.title}
          </h1>

          {/* Author & Date */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex items-center space-x-3">
              
              <div>
                <p className="text-gray-800 font-semibold text-lg">
                  {post.name}
                </p>
                <p className="text-gray-500 text-sm">
                  {new Date(post.created_at).toDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-gray-800">
            {post.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
