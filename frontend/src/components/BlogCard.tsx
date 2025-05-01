import { Link } from "react-router";

interface BlogCardProps {
	authorName: string;
	title: string;
	content: string;
	publishedDate: string;
	id: number;
	src: string;
}

const BlogCard = ({
	id,
	publishedDate,
	content,
	title,
	authorName,
	src,
}: BlogCardProps) => {
	return (
    <Link to={`/posts/${id}`}>
      <div className="p-6 border-b border-slate-200 w-full max-w-screen-md cursor-pointer hover:bg-slate-50 transition rounded-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Left side: Text */}
          <div className="flex-1">
            {/* Author Info */}
            <div className="flex items-center gap-3 mb-3">
              <Avatar name={authorName} />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-800">
                  {authorName}
                </span>
                <span className="text-xs text-gray-500">{publishedDate}</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>

            {/* Content Preview */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {content?.slice(0, 100)}...
            </p>

            {/* Reading Time */}
            <div className="text-xs text-gray-400 mt-4">{`${Math.ceil(
              content?.length / 100
            )} min read`}</div>
          </div>

          {/* Right side: Image */}
          {src && (
            <div className="w-full md:w-40 h-28 overflow-hidden rounded-lg">
              <img
                className="object-cover w-full h-full"
                src={src}
                alt="Post Thumbnail"
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export function Circle() {
	return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}

export function Avatar({
	name,
	size = "small",
}: {
	name: string;
	size?: "small" | "big";
}) {
	return (
		<div
			className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${
				size === "small" ? "w-6 h-6" : "w-10 h-10"
			}`}
		>
			<span
				className={`${
					size === "small" ? "text-xs" : "text-md"
				} font-semibold text-white`}
			>
				{name[0]}
			</span>
		</div>
	);
}

export default BlogCard;
