import { useAuth } from "@/components/hooks/useAuth";
import SingleBlog from "@/components/SingleBlog";
import { Button } from "@/components/ui/button";
import { usePage } from "@/context/pageContext";
import api from "@/lib/api";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";

export default function PostDetail() {
	const { post, setPost } = usePage();
	const { id } = useParams();
	const { isAuthenticated, user } = useAuth();
	const navigate = useNavigate();

	const fetchPosts = async (): Promise<void> => {
		try {
			const res = await api.get(`/posts/${id}`);
			setPost(res.data.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		setPost(null);
		fetchPosts();
	}, [id]);

	const handleDelete = async () => {
		try {
			const res = await api.delete(`/posts/${id}`);
			if (res.data.success) {
				navigate("/posts");
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (!post) {
		return (
			<div className="flex justify-center items-center h-screen">
				<h1>Loading...</h1>
			</div>
		);
	}

	return (
		<>
			<div className="max-w-screen-xl mx-auto">
				<SingleBlog />

				{isAuthenticated &&
				post &&
				post.id?.toString() === id &&
				post.username === user.username ? (
					<div className="flex gap-2 mt-15 justify-end pr-20">
						<Link to={`/posts/${id}/edit`}>
							<Button variant="secondary">Edit</Button>
						</Link>
						<Button variant="destructive" onClick={handleDelete}>
							Delete
						</Button>
					</div>
				) : null}
			</div>
		</>
	);
}
