import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UploadsFile from "@/components/UploadsFile";
import api from "@/lib/api";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function PostCreate() {
	const [post, setPost] = useState<any>({
    title: "",
    content: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Please select a file to upload");
      return;
    }

    try {
      const data = new FormData();
      data.append("image", imageFile);
      data.append("title", post?.title);
      data.append("content", post?.content);

      const res = await api.post("/posts", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data) {
        navigate(`/posts/${res.data.data}`);
      }
    } catch (error: any) {
      console.log(error.res?.data || error.message);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPost((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Create New Post</h2>

        <form onSubmit={handleSubmit} method="POST" className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Title
            </label>
            <Input
              placeholder="Enter your title..."
              name="title"
              value={post.title}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Content
            </label>
            <Textarea
              placeholder="Write your post content..."
              name="content"
              value={post.content}
              onChange={handleChange}
              className="w-full"
              rows={8}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <UploadsFile setImageFile={setImageFile} imageFile={imageFile} />
          </div>

          <div className="flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg">
              Publish
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
