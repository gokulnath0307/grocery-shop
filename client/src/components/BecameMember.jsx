import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function BecameMemeber() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-8xl sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32">
          <h2 className="mx-auto max-w-3xl text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Launching your Art Gallery Here !
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-center text-lg text-gray-300">We’re changing the way people connect</p>
          <div className="mx-auto mt-10 flex max-w-md justify-center gap-x-4">
            <button
              onClick={() => {
                navigate("/member-login");
                dispatch({ type: "ISMEMBER" });
              }}
              className="flex rounded-md bg-white px-10 py-5 cursor-pointer text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Let's Join
            </button>
          </div>
          <svg viewBox="0 0 1024 1024" aria-hidden="true" className="absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-x-1/2">
            <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
            <defs>
              <radialGradient
                r={1}
                cx={0}
                cy={0}
                id="759c1415-0410-454c-8f7c-9a820de03641"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(512 512) rotate(90) scale(512)"
              >
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
