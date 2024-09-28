import Image from "next/image";
import no_image from "../../public/no-image.png";

function UerComments({ data }: any) {

  return (
    <>
      {data && (
        <div className="  gap-4  flex justify-between w-full px-3 font-medium text-sm">
          <span className="flex pt-3 ">
            {data.commentowner && (
              <Image
                width={32}
                height={32}
                className=" w-8 h-8 rounded-full"
                src={data.commentowner.avatar.url || no_image}
                alt="sdvnwjdv"
              />
            )}
          </span>
          <span className="flex-1  rounded-lg p-3  ">
            <div className="flex justify-between items-center">
              <p className="text-black font-bold text-base ">
                {data.ownername}
              </p>
              <button className="text-lg font-bold">...</button>
            </div>
            <span className="text-gray-500 font-medium text-pretty">
              {data.content}
            </span>
          </span>
        </div>
      )}
    </>
  );
}

export default UerComments;
