import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { usePage } from "@/context/pageContext";
import api from "@/lib/api";

export default function PostEdit() {
  const { post } = usePage();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
  });

  const navigate = useNavigate();

  const updatePosts = async (): Promise<void> => {
    try {
      const response = await api.put(`/posts/${id}`, formData);
      const { data } = response.data;
      console.log(data);
     
     
      navigate(`/posts/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Edit Post</h2>
      <Input value={formData?.title} name="title" onChange={handleChange} />
      <Textarea
        value={formData?.content}
        name="content"
        onChange={handleChange}
      />
      <Button onClick={updatePosts}>Update</Button>
    </div>
  );
}
