function Card({ image, title, description }) {
  return (
    <div className="bg-white border border-[#629584] rounded-lg shadow-md p-4 sm:p-6 m-2 sm:m-4 text-center w-full max-w-xs cursor-pointer hover:shadow-lg transition duration-300 h-[360px] flex flex-col items-center justify-center gap-4">

      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
      />

      {/* Text Content */}
      <h1 className="text-[#243642] text-lg sm:text-xl md:text-2xl font-bold">
        {title}
      </h1>

      <p className="text-[#243642] text-base sm:text-lg md:text-lg font-medium leading-snug px-2">
        {description}
      </p>

    </div>
  );
}

export default Card;