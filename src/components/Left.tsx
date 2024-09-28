import User_cart from "./User_cart";

function Left({ type, data }: { type: String; data?: any }) {
  return (
    <div className="hidden w-[20%] md:flex flex-col gap-6">
      {"Home" == type ? <User_cart data={data} /> : null}
      {/* <UserData /> */}

      {/* add AD for money */}
    </div>
  );
}

export default Left;
