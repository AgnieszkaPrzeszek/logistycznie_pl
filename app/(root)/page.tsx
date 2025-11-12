// import FirstHeroComponent from '@/components/FirstHeroComponent';
// import FourthHeroComponent from '@/components/FourthHeroComponent';
import LogisticsVideo from '@/components/LogisticsVideo';
// import MaxWidthWrapper from '@/components/MaxWidthWrapper';
// import SearchFrontPage from '@/components/SearchFrontPage';
// import SecondHeroComponent from '@/components/SecondHeroComponent';
// import ThirdHeroComponent from '@/components/ThirdHeroComponent';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="container mx-auto mt-10 space-y-8">
      <LogisticsVideo />
      {/* <SearchFrontPage />
      <FirstHeroComponent />
      <SecondHeroComponent />
      <ThirdHeroComponent />
      <FourthHeroComponent /> */}
    </div>
  );
}
