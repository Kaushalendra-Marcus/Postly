import Image from "next/image";

const CommunitiesPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 p-4">
      <h1 className="head-text">Communities</h1>
      <div className="relative w-full max-w-[300px] h-[300px]">
        <Image
  src="/assets/coming-soon.svg"
  alt="Coming soon - Community Feature"
  fill
  className="object-contain rounded-lg"
  style={{ 
    filter: 'invert(16%) sepia(99%) saturate(7404%) hue-rotate(4deg) brightness(95%) contrast(118%)' 
  }}
/>
      </div>
      <p className="max-w-md text-center text-gray-400">
        We're working on this exciting new feature! Check back soon for updates.
      </p>
    </div>
  );
};

export default CommunitiesPage;