import { PlusIcon } from "lucide-react";
import Header from "./Header";
import Body from "./Body";

const Homepage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 min-h-screen relative">
      {/* add button */}
      <button className="flex items-center justify-center w-20 aspect-square rounded-full absolute right-0 bottom-10 bg-[#3E2723] text-white cursor-pointer">
        <PlusIcon size={30} />
      </button>

      <Header />

      <Body />
    </div>
  );
};

export default Homepage;
