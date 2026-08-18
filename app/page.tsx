"use client";

import { useState } from "react";
import ProductionCharts from "@/components/charts/ProductionCharts";
import { useRouter } from "next/navigation";

export default function Home() {
  const [symbolsOpen, setSymbolsOpen] = useState(true);
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[url('/assets/images/fondo.webp')] bg-size-[auto_650px] bg-center flex flex-col justify-center align-center items-center">
      {/* Navbar */}
      <div className="w-full h-13 absolute top-0 bg-grisosh text-center text-white text-2xl flex flex-row justify-center items-center">
        Sistema en modo DEMO
      </div>

      {/* Logo */}
      <div className="w-45 absolute top-0 left-5 z-10">
        <img src="/assets/images/logo.webp" alt="Logo" className="w-full h-full object-contain" />
      </div>

      {/* Produccion */}
      <div className=" w-300 h-150 relative rounded dis bg-center bg-cover bg-[url('/assets/images/maquinas.webp')]">
        <div
          onClick={() =>
            router.push("/bystronic?machine=" + encodeURIComponent("Fibra 1"))
          }
          className="absolute w-55 h-30 cursor-pointer bottom-15 left-145"></div>
        <div onClick={() =>
          router.push("/bystronic?machine=" + encodeURIComponent("Fibra 1"))
        }
          className="w-15 h-23 cursor-pointer absolute bottom-50 left-160 bg-black rounded-lg flex flex-col">
          <div className="h-1/4 w-full rounded-t-lg bg-grisosh-light text-white text-[10px] pt-1 pl-1">Fibra 1</div>
          <div className="h-1/4 w-full text-white text-[10px] pt-1 pl-1 flex flex-row justify-evenly items-center">
            <img className="animate-pulse" src="/assets/images/ok.webp" width="20px" /> Rv
          </div>
        </div>
        <div onClick={() =>
          router.push("/bystronic?machine=" + encodeURIComponent("Co 2"))
        }
          className="absolute w-45 h-30 cursor-pointer bottom-43 left-202 rounded-4xl"></div>
        <div onClick={() =>
          router.push("/bystronic?machine=" + encodeURIComponent("Co 2"))
        }
          className="w-15 h-23 absolute cursor-pointer bottom-78 left-210 bg-black rounded-lg flex flex-col">
          <div className="h-1/4 w-full rounded-t-lg bg-grisosh-light text-white text-[10px] pt-1 pl-1">Co 2</div>
          <div className="h-1/4 w-full text-white text-[10px] pt-1 pl-1 flex flex-row justify-evenly items-center">
            <img className="animate-pulse" src="/assets/images/ok.webp" width="20px" /> Rv
          </div>
        </div>
        <div onClick={() =>
          router.push("/bystronic?machine=" + encodeURIComponent("Fibra 2"))
        }
          className="absolute w-45 h-20 cursor-pointer bottom-72 left-225 rounded-4xl"></div>
        <div onClick={() =>
          router.push("/bystronic?machine=" + encodeURIComponent("Fibra 2"))
        }
          className="w-15 h-23 cursor-pointer absolute bottom-93 left-240 bg-black rounded-lg flex flex-col">
          <div className="h-1/4 w-full rounded-t-lg bg-grisosh-light text-white text-[10px] pt-1 pl-1">Fibra 2</div>
          <div className="h-1/4 w-full text-white text-[10px] pt-1 pl-1 flex flex-row justify-evenly items-center">
            <img className="animate-pulse" src="/assets/images/ok.webp" width="20px" /> Rv
          </div>
        </div>
      </div>

      {/* Graficas */}
      <div className="absolute right-0 w-52 h-150 bg-[#eceaea] border border-gray-300 rounded overflow-hidden">
        <ProductionCharts />
      </div>

      {/* Simbolos */}
      <div
        className={`
    bg-grisosh
    border-2
    border-black
    absolute
    bottom-13
    left-0
    rounded-t-lg
    overflow-hidden
    transition-all
    duration-300
    ${symbolsOpen ? "w-42 h-90" : "w-42 h-9"}
  `}
      >
        {/* Header */}
        <div
          onClick={() => setSymbolsOpen(!symbolsOpen)}
          className="
      w-full
      h-9
      text-grisosh-text
      border-b-2
      cursor-pointer
      border-black
      flex
      flex-row
      text-[13px]
      justify-evenly
      items-center
      select-none
    "
        >
          <p>{symbolsOpen ? "Hide symbols" : "Show symbols"}</p>

          <svg
            className={`transition-transform duration-300 ${symbolsOpen ? "rotate-0" : "rotate-180"
              }`}
            width="24px"
            height="24px"
            viewBox="0 0 24 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#565656"
          >
            <g>
              <path
                d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                fill="#6F6D6D"
              />
            </g>
          </svg>
        </div>

        {/* Contenido */}
        {symbolsOpen && (
          <div className="flex flex-col h-[calc(100%-36px)]">

            <div className="w-full h-1/11 flex flex-row items-center gap-1 text-grisosh-text text-[13px]">
              <div className="h-6 w-6 ml-1">
                <img
                  src="/assets/images/ok.webp"
                  className="w-full h-full"
                  alt=""
                />
              </div>
              <p>Machine OK</p>
            </div>

            <div className="w-full h-1/11 flex flex-row items-center gap-1 text-grisosh-text text-[13px]">
              <div className="h-6 w-6 ml-1">
                <img
                  src="/assets/images/wait.webp"
                  className="w-full h-full"
                  alt=""
                />
              </div>
              <p>Machine Waiting for...</p>
            </div>

            <div className="w-full h-1/11 flex flex-row items-center gap-1 text-grisosh-text text-[13px]">
              <div className="h-6 w-6 ml-1">
                <img
                  src="/assets/images/stop.webp"
                  className="w-full h-full"
                  alt=""
                />
              </div>
              <p>Machine Stopped</p>
            </div>

            <div className="w-full h-1/11 flex flex-row items-center gap-1 text-grisosh-text text-[13px]">
              <div className="h-6 w-6 ml-1">
                <img
                  src="/assets/images/error.webp"
                  className="w-full h-full"
                  alt=""
                />
              </div>
              <p>Machine Error</p>
            </div>

            <div className="w-full h-1/11 flex flex-row items-center gap-1 text-grisosh-text text-[13px]">
              <div className="h-6 w-6 ml-1">
                <img
                  src="/assets/images/wmaterial.webp"
                  className="w-full h-full"
                  alt=""
                />
              </div>
              <p>Waiting for material</p>
            </div>

            <div className="w-full h-1/11 flex flex-row items-center gap-1 text-grisosh-text text-[13px]">
              <div className="h-6 w-6 ml-1">
                <img
                  src="/assets/images/wpersonal.webp"
                  className="w-full h-full"
                  alt=""
                />
              </div>
              <p>Waiting for user</p>
            </div>

            <div className="w-full h-1/11 flex flex-row items-center gap-1 text-grisosh-text text-[13px]">
              <div className="h-6 w-6 ml-1">
                <img
                  src="/assets/images/wcosa.webp"
                  className="w-full h-full"
                  alt=""
                />
              </div>
              <p>Waiting for anything</p>
            </div>

            <div className="w-full h-1/11 flex flex-row items-center gap-1 text-grisosh-text text-[13px]">
              <div className="h-6 w-6 ml-1">
                <img
                  src="/assets/images/table_ok.webp"
                  className="w-full h-full"
                  alt=""
                />
              </div>
              <p>Table interchange</p>
            </div>

            <div className="w-full h-1/11 flex flex-row items-center gap-1 text-grisosh-text text-[13px]">
              <div className="h-6 w-6 ml-1">
                <img
                  src="/assets/images/ru.webp"
                  className="w-full h-full"
                  alt=""
                />
              </div>
              <p>In cut process</p>
            </div>

            <div className="w-full h-1/11 flex flex-row items-center gap-1 text-grisosh-text text-[13px]">
              <div className="h-6 w-6 ml-1">
                <img
                  src="/assets/images/manual.webp"
                  className="w-full h-full"
                  alt=""
                />
              </div>
              <p>Manual mode</p>
            </div>

            <div className="w-full h-1/11 flex flex-row items-center gap-1 text-grisosh-text text-[13px]">
              <div className="h-6 w-6 ml-1">
                <img
                  src="/assets/images/auto.webp"
                  className="w-full h-full"
                  alt=""
                />
              </div>
              <p>Automatic mode</p>
            </div>

          </div>
        )}
      </div>

      {/* Footer */}
      <div className="w-full h-13 bg-grisosh  absolute bottom-0 left-0 flex flex-row justify-between p-3">
        <div className="flex flex-row">
          <div className="w-auto text-sm border border-grisosh-light bg-grisosh-filter h-full flex flex-row justify-center items-center gap-2 rounded-sm px-3 text-grisosh-light">
            <p>Shift:</p>
            <select className="bg-white w-10">
              <option value="1"> 1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="w-auto text-sm border border-grisosh-light bg-grisosh-filter h-full flex flex-row justify-center items-center gap-2 rounded-sm px-3 text-grisosh-light">
            <p>Since:</p>
            <input className="bg-white" type="datetime-local"></input>
          </div>
          <div className="w-auto text-sm border border-grisosh-light bg-grisosh-filter h-full flex flex-row justify-center items-center gap-2 rounded-sm px-3 text-grisosh-light">
            <p>Until:</p>
            <input className="bg-white" type="datetime-local"></input>
          </div>
          <div className="w-auto ml-5 text-sm border border-black bg-black h-full flex flex-row justify-center items-center gap-2 rounded-sm px-3 text-white">
            <p>12:00:00</p>
          </div>
        </div>
        <div className="text-grisosh-text w-1/3 italic">
          <p className="text-start w-full">Powered by Pesaje</p>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col justify-center items-center gap-1">
            <p className="text-grisosh-filter text-[10px]">Paint</p>
            <div className="w-2 h-2 bg-lime-600 animate-pulse"></div>
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <p className="text-grisosh-filter text-[10px]">F1</p>
            <div className="w-2 h-2 bg-lime-600 animate-pulse"></div>
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <p className="text-grisosh-filter text-[10px]">Co2</p>
            <div className="w-2 h-2 bg-lime-600 animate-pulse"></div>
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <p className="text-grisosh-filter text-[10px]">F2</p>
            <div className="w-2 h-2 bg-lime-600 animate-pulse"></div>
          </div>
        </div>

      </div>
    </main>
  );
}