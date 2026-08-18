"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import DonutsCharts from "@/components/charts/DonutsCharts";
import TimesSummary from "@/components/charts/TimesSummary";
import UseTimeEfficiencyChart from "@/components/charts/UseTimeEfficiencyChart";
import StopsHistoryChart from "@/components/charts/StopsHistoryChart";
import ProcessActiveStopsChart from "@/components/charts/ProcessActiveStopsChart";
import PartsEfficiencyChart from "@/components/charts/PartsEfficiencyChart";
import ErrorsQuantityChart from "@/components/charts/ErrorsQuantityChart";
import AlertsModal, { AlertItem, } from "@/components/charts/AlertsModal";
import { generateAlerts } from "@/lib/generateAlerts"
import { useRouter } from "next/navigation";

export default function BystronicContent() {
    const [partsEfficiencyOpen, setPartsEfficiencyOpen] = useState(false);
    const [errorsQuantityOpen, setErrorsQuantityOpen] = useState(false);
    const [alertsOpen, setAlertsOpen] = useState(false);

    const [alerts, setAlerts] = useState<AlertItem[]>([]);
    const searchParams = useSearchParams();
    const router = useRouter();

    function openAlerts() {
        setAlerts(generateAlerts());
        setAlertsOpen(true);
    }

    function closeAlerts() {
        setAlertsOpen(false);
    }

    const machine = searchParams.get("machine") ?? "Fibra 1";

    return (
        <main className="w-full h-screen bg-[#F5F5F5] text-white flex items-center justify-center">
            {/* Navbar */}
            <div className="w-full shadow-xl h-13 absolute top-0 bg-grisosh  flex flex-row justify-evenly items-center py-4">
                <div className="flex flex-row gap-4 justify-center w-3/4">
                    <button
                        onClick={() => router.push("/")}
                        className="bg-white cursor-pointer text-[12px] font-semibold rounded-lg text-grisosh-light p-1 w-30">Home</button>
                    <button className="bg-white cursor-pointer text-[12px] font-semibold rounded-lg text-grisosh-light p-1 w-30">Export Excel</button>
                    <button
                        onClick={openAlerts}
                        className="bg-white cursor-pointer text-[12px] font-semibold rounded-lg text-grisosh-light p-1 w-30">Alerts</button>
                    <button
                        onClick={() => setPartsEfficiencyOpen(true)}
                        className="bg-white cursor-pointer text-[12px] font-semibold rounded-lg text-grisosh-light p-1 w-30">Parts Efficiency</button>
                    <button
                        onClick={() => setErrorsQuantityOpen(true)}
                        className="bg-white cursor-pointer text-[12px] font-semibold rounded-lg text-grisosh-light p-1 w-30">Errors Quantity</button>
                </div>
                <span className="text-3xl italic text-white text-end mr-5 w-1/4">{machine}</span>
            </div>

            {/* Logo */}
            <div className="w-40 absolute top-0 left-5 z-10 ">
                <img src="/assets/images/logo.webp" alt="Logo" className="w-full h-full object-contain" />
            </div>

            {/* Graficas */}
            <div className="w-full h-[calc(100%-6.5rem)] flex flex-col">
                <div className="w-full h-1/2 flex flex-row">
                    {/* Tiempos */}
                    <div className="w-3/16 h-full p-2 relative">
                        <div className="absolute w-55 h-40  bottom-5">
                            <TimesSummary machine={machine ?? "Fibra 1"} />
                        </div>
                    </div>
                    <div className="w-10/16 h-full">
                        <UseTimeEfficiencyChart />
                    </div>
                    <div className="w-3/16 h-full flex flex-row justify-end">
                        <div className=" w-50 h-full  ">
                            <div className="w-full h-5  flex flex-row justify-between items-center ">
                                <p className="text-grisosh text-[11px] font-bold text-center w-1/2">Beam time</p>
                                <p className="text-grisosh text-[11px] font-bold text-center w-1/2">Speed efficiency</p>
                            </div>
                            <DonutsCharts />
                        </div>
                    </div>
                </div>
                <div className="w-full h-1/2 flex flex-row">
                    <div className="w-4/9 h-full">
                        <StopsHistoryChart /></div>
                    <div className="w-4/9 h-full">
                        <ProcessActiveStopsChart /></div>
                    <div className="w-1/9 h-full flex flex-col">
                        <div className="h-1/2 w-full relative">
                            <div className="w-15 h-23 cursor-pointer absolute -bottom-20 left-3/8 bg-black rounded-lg flex flex-col">
                                <div className="h-1/4 w-full rounded-t-lg bg-grisosh-light text-white text-[10px] pt-1 pl-1">{machine}</div>
                                <div className="h-1/4 w-full text-white text-[10px] pt-1 pl-1 flex flex-row justify-evenly items-center"></div>
                            </div>
                        </div>
                        <div className="h-1/2 w-full">
                            <img src="/assets/images/machine.webp" alt="Logo" className="w-full h-full object-contain translate-y-10" />
                        </div>
                    </div>
                </div>
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

            {partsEfficiencyOpen && (
                <div
                    className="
      fixed
      inset-0
      z-50
      bg-black/40
      flex
      items-center
      justify-center
    "
                    onClick={() => setPartsEfficiencyOpen(false)}
                >
                    <div
                        className="
        w-[90vw]
        h-[75vh]
        max-w-[1200px]
        bg-white
        shadow-2xl
        border
        border-gray-400
        flex
        flex-col
      "
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Barra superior */}
                        <div
                            className="
          h-10
          bg-grisosh
          text-white
          flex
          items-center
          justify-center
          relative
          shrink-0
        "
                        >
                            <p className="text-sm font-semibold">
                                Parts Efficiency - {machine}
                            </p>

                            <button
                                onClick={() => setPartsEfficiencyOpen(false)}
                                className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-xl
            cursor-pointer
            hover:text-red-400
          "
                            >
                                ×
                            </button>
                        </div>

                        {/* Gráfica */}
                        <div className="flex-1 min-h-0">
                            <PartsEfficiencyChart />
                        </div>
                    </div>
                </div>
            )}

            {errorsQuantityOpen && (
                <div
                    className="
      fixed
      inset-0
      z-50
      bg-black/40
      flex
      items-center
      justify-center
    "
                    onClick={() => setErrorsQuantityOpen(false)}
                >
                    <div
                        className="
        w-[92vw]
        h-[80vh]
        max-w-[1400px]
        bg-white
        shadow-2xl
        border
        border-gray-400
        flex
        flex-col
      "
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Barra superior */}
                        <div
                            className="
          h-10
          bg-grisosh
          text-white
          flex
          items-center
          justify-center
          relative
          shrink-0
        "
                        >
                            <p className="text-sm font-semibold">
                                Errors Quantity - {machine}
                            </p>

                            <button
                                onClick={() => setErrorsQuantityOpen(false)}
                                className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-xl
            cursor-pointer
            hover:text-red-400
          "
                            >
                                ×
                            </button>
                        </div>

                        {/* Gráfica */}
                        <div className="flex-1 min-h-0">
                            <ErrorsQuantityChart />
                        </div>
                    </div>
                </div>
            )}
            {alertsOpen && (
                <AlertsModal
                    title={machine}
                    alerts={alerts}
                    onClose={closeAlerts}
                />
            )}
        </main>
    );
}