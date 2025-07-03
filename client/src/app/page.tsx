import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-450px)] px-20 py-7 ">
      <div>
        <Image
          src="/images/trafficMan.png"
          alt="Traffic Man"
          width={200}
          height={200}
          className="w-96 h-96 "
        />
      </div>
    </div>
  );
}
