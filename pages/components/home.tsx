import { FC } from "react";
import Image from "next/image";

const Home: React.FC = () => {
  return (
    <>
      <Image
        src={"/photos/header.png"}
        alt="Character"
        layout="fill" // Changed to fill for responsive images
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </>
  );
};

export default Home;
