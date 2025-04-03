export default function CounterPage() {
  const seconds = 5;
  const currentTime = 3.5;
  return (
    <section>
      <a href="#/" className="text-white">
        {" "}
        Home{" "}
      </a>
      <div className="flex items-center justify-center border ">
        <div className="h-[420px] w-[420px] border border-4 border-mainbg rounded-full flex items-center justify-center">
          <div class="flex items-center justify-center">
            <img
              src="assets/charmander.jpg"
              className="h-80 w-80 border border-4 border-mainbg rounded-full flex items-center justify-center object-cover"
              alt=""
            />
            <svg className="absolute transform -rotate-90 w-96 h-96">
              <circle
                cx="190"
                cy="190"
                r="180"
                stroke="currentColor"
                strokeWidth="20"
                fill="transparent"
                className="text-transparent"
              />

              <circle
                cx="190"
                cy="190"
                r="180"
                stroke="currentColor"
                strokeWidth="20"
                fill="transparent"
                strokeDasharray="1131"
                strokeDashoffset={1131 - 1131 / seconds * currentTime}
                class="text-red-600 opacity-70"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="h-36 border">

      <h1>Charmander</h1>
      </div>
    </section>
  );
}
