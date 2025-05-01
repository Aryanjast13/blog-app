import { FileIcon, UploadCloud } from "lucide-react";
import React, { useRef } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export type UploadedImage = {
	url: string;
	public_id: string;
};

type ImageUploadProps = {
	setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
	imageFile: File | null;
};

const UploadsFile: React.FC<ImageUploadProps> = ({
	setImageFile,
	imageFile,
}) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setImageFile(file);
		}
	};

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		const file = event.dataTransfer.files[0];
		if (file) {
			setImageFile(file);
		}
	};

	// const uploadImage = async () => {
	// 	if (!imageFile) return;
	// 	setIsLoading(true);
	// 	try {
	// 		const data = new FormData();
	// 		data.append("image", imageFile);
	// 		const response = await api.post("admin/image/upload-image", data, {
	// 			headers: {
	// 				"Content-Type": "multipart/form-data",
	// 			},
	// 		});
	// 	} catch (error: any) {
	// 		console.error(error.response?.data || error.message);
	// 	} finally {
	// 		setIsLoading(false);
	// 	}
	// };

	return (
		<div className="mx-auto mt-4 w-full max-w-md">
			<Label className="my-4 block font-semibold">Upload Image</Label>
			<div
				className="border-muted-foreground/50 rounded-md border-2 border-dashed"
				onDragOver={!imageFile ? handleDragOver : undefined}
				onDrop={!imageFile ? handleDrop : undefined}
			>
				<Input
					type="file"
					id="image-upload"
					className="hidden"
					onChange={handleImageUpload}
					accept="image/*"
					ref={inputRef}
				/>
				{!imageFile ? (
					<Label
						htmlFor="image-upload"
						className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-md"
					>
						<UploadCloud className="text-muted-foreground size-10" />
						<span className="text-muted-foreground">
							Drag & drop or click to upload
						</span>
					</Label>
				) : (
					<div className="flex items-center justify-between gap-1 p-4">
						<div className="flex items-center gap-1">
							<FileIcon className="size-5 text-white lg:size-7" />
							<p className="line-clamp-1 max-w-[152px] text-sm font-medium">
								{imageFile.name}
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default UploadsFile;
