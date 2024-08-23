// "use client";
// import React, { useState, ChangeEvent, useRef } from "react";

// interface ImageUploadProps {
//   onImageUpload: (imageUrl: any) => void;
// }

// const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
//   const [image, setImage] = useState<File | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleButtonClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };
//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     console.log("hloooo");
//     if (e.target.files && e.target.files.length > 0) {
//       const file = e.target.files[0];

//       setImage(file);
//       // Assume you have an API to handle the image upload and return the image URL
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         if (reader.result) {
//           onImageUpload(reader.result as string);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="mt-2 mb-8">
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleImageChange}
//         className="hidden"
//         ref={fileInputRef}
//       />
//       <button
//         type="button"
//         onClick={handleButtonClick}
//         className="py-2 px-4 border-2 rounded-full custom-button"
//       >
//         Add Media
//       </button>
//       {image && (
//         <div className="mt-4">
//           <img
//             src={URL.createObjectURL(image)}
//             alt=""
//             className="h-40 w-auto"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageUpload;
