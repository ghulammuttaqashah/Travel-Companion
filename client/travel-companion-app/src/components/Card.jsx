function Card({ image, title, description }) {
  return (
    <div className="bg-white border border-[#629584] rounded-lg shadow-md p-5 m-4 text-center max-w-xs w-full cursor-pointer hover:shadow-lg transition h-[360px] flex flex-col items-center">
      
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-28 h-28 object-contain mb-4"
      />

      {/* Text Content */}
      <div className="flex flex-col flex-1 justify-between">
        <h1 className="text-[#243642] text-xl md:text-3xl font-bold mb-2">{title}</h1>
        <p className="text-[#243642] text-base md:text-lg font-medium">{description}</p>
      </div>
      
    </div>
  );
}
export default Card;