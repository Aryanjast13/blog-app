import { useEffect, useState } from "react";

import BlogCard from "@/components/BlogCard";
import api from "@/lib/api";

export default function PostList() {
	const [posts, setPosts] = useState<any[]>([]);

	const fetchPosts = async (): Promise<void> => {
		try {
			const response = await api.get("/posts");
			setPosts(response.data.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (posts.length > 0) return;
    fetchPosts();
		
	}, []);

	if (!posts) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<div className="flex justify-center">
				<div>
					{posts?.map((blog) => (
						<BlogCard
							key={blog.id}
							id={blog.id}
							title={blog.title}
							content={blog.content}
							publishedDate={new Date(blog.created_at).toDateString() || ""}
							authorName={blog.name || "Anonymous"}
							src={blog.cover_image}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
