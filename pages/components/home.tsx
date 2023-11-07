import Image from "next/image";

const Home: React.FC = () => {
  return (
    <>
      <Image
        src={"/photos/header.png"}
        alt="Hero"
        layout="fill" // This makes the image fill the parent container
        quality={100} // Optional: Adjust the image quality if needed
      />
    </>
  );
};

export default Home;
