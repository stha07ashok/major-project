import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-450px)] px-20 py-7 mx-16 ">
      <div className="w-full h-full flex gap-6 jusbtify-between items-center">
        <Image
          src="/images/trafficMan.png"
          alt="Traffic Man"
          width={200}
          height={480}
          className="w-96 h-120 "
        />
        <div className="w-3/5 h-full flex flex-col justify-center items-start text-justify text-lg font-semibold">
          Our system leverages advanced computer vision techniques to enhance
          road safety by automatically detecting helmet violations and triple
          riding on two-wheelers. Integrated with real-time number plate
          recognition, this solution enables efficient monitoring and
          enforcement of traffic rules. Whether deployed in urban intersections
          or highways, this AI-powered system helps authorities identify rule
          breakers and promote responsible driving behavior — all with minimal
          human intervention.
        </div>
      </div>
    </div>
  );
}
