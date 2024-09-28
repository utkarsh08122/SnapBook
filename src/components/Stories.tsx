import Image from "next/image";

function Stories() {
  return (
    <div className="p-2 shadow-md bg-white rounded-lg overflow-x-scroll text-sm scrollbar-hide">
      <div className="flex gap-4 md:gap-7 w-max">
        <div className="flex flex-col items-center gap-2 cursor-pointer">
          <Image
            src="/logo.jpg"
            alt=""
            width={56}
            height={56}
            className="w-14 h-14 rounded-full  hidden md:block"
          />
          <Image
            src="/logo.jpg"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full  block md:hidden"
          />
          {/* <span className="hidden  md:block  fixed top-[89px] left-[359px] font-semibold text-2xl md:text-5xl text-slate-400">
            +
          </span> */}
          <span className="font-medium text-xs">Add a Story</span>
        </div>
        <div className="flex flex-col items-center gap-2 cursor-pointer">
          <Image
            src="/logo.jpg"
            alt=""
            width={56}
            height={56}
            className="w-14 h-14 rounded-full  hidden md:block"
          />
          <Image
            src="/logo.jpg"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full  block md:hidden"
          />
          <span className="font-medium text-xs">utkarsh123</span>
        </div>
      
        
        
      </div>
    </div>
  );
}

export default Stories;
