import Image from 'next/image';

export const TempTransaction = () => {
  return (
    <div className="flex flex-col mb-4 ">
      <div className="flex justify-between w-full leading6">
        <span className=" text-[#0987A0] font-bold text-lg">Sale</span>
        <span className="text-sm">3일 전</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center w-[35%] justify-between ">
          <Image src="/images/temp.jpeg" width={48} height={48} className="rounded-full " />
          <span className="text-base">디렌디</span>
        </div>
        <div> {'->'} </div>
        <div className="flex items-center w-[35%] justify-between ">
          <Image src="/images/defaultProfile.png" width={48} height={48} className="rounded-full " />
          <span className="text-base">@UACC</span>
        </div>
      </div>
    </div>
  );
};
