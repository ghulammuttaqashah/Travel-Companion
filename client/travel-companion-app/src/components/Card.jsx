function Card({ image, title, description }) {
  return (
    <div className="bg-white border border-[#629584] rounded-lg shadow-md p-4 sm:p-5 m-2 sm:m-4 text-center w-full max-w-xs cursor-pointer hover:shadow-lg transition h-[360px] flex flex-col items-center">
      
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-20 h-20 sm:w-28 sm:h-28 object-contain mb-3 sm:mb-4"
      />

      {/* Text Content */}
      <div className="flex flex-col flex-1 justify-between">
        <h1 className="text-[#243642] text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">
          {title}
        </h1>
        <p className="text-[#243642] text-sm sm:text-base md:text-lg font-medium">
          {description}
        </p>
      </div>

    </div>
  );
}
export default Card;