import Image from 'next/image'

type BannerSectionProps = {
  bannerUrl?: string;
};

export default function BannerSection({ bannerUrl }: BannerSectionProps) {
  // Fallback to default image if no banner URL is provided or if it's an empty string
  const imageSrc = bannerUrl && bannerUrl.trim() ? bannerUrl : "/te11.png";
  
  return (
    <div className='relative w-full aspect-640/140'>
      <Image 
        src={imageSrc} 
        alt="Banner" 
        fill
        className='rounded-t-2xl object-cover'
        priority 
      />
    </div>
  );
}