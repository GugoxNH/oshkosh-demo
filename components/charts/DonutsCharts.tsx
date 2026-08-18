"use client";

import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip
);

function randomValue(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

type DonutProps = {
  value: number;
  color: string;

};

function DonutChart({
  value,
  color,
}: DonutProps) {

  // Para valores mayores a 100
  // visualmente llenamos la dona completa.
  const chartValue = Math.min(value, 100);

  const data = {
    datasets: [
      {
        data: [
          chartValue,
          100 - chartValue,
        ],
        backgroundColor: [
          color,
          "#ffffff",
        ],
        borderWidth: 0,
        cutout: "68%",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="flex flex-col items-center">

      <div className="relative w-14 h-14">

        <Doughnut
          data={data}
          options={options}
        />

        {/* Porcentaje central */}
        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            pointer-events-none
            text-[13px]
            text-gray-600
            font-semibold
          "
        >
          {value}%
        </div>

      </div>
    </div>
  );
}

type ModuleProps = {
  title: string;
};

function MachineModule({
  title,
}: ModuleProps) {

  // Los valores se generan solamente
  // cuando se monta el componente.
const [beamTime, setBeamTime] = useState(0);
const [speedEfficiency, setSpeedEfficiency] = useState(0);

useEffect(() => {
  setBeamTime(randomValue(0, 100));
  setSpeedEfficiency(randomValue(0, 100));
}, []);

  return (
    <div
      className="
        w-full
        flex
        flex-col
        items-center
        px-2
      "
    >

      

      {/* Graficas */}
      <div
        className="
          w-full
          flex
          justify-evenly
          items-start
        "
      >

        <DonutChart
          value={beamTime}
          color="#333333"

        />

        <DonutChart
          value={speedEfficiency}
          color={
            speedEfficiency >= 90
              ? "#63d46f"
              : speedEfficiency >= 55 && speedEfficiency < 90
              ? "#FFCC00"
              : "#FF6384"
          }
        />

      </div>

      {/* Fecha */}
      <div
        className="
          w-full
          border-b
          border-gray-200
          text-grisosh
          mb-2
          text-center
          text-[10px]
        "
      >
        {title}
      </div>

    </div>
  );
}

export default function DonutsCharts() {

  return (
    <div
      className="
        w-full
        h-full
        flex
        flex-col
        justify-evenly
        py-3
      "
    >

      <MachineModule title="18/08/2026" />
      <MachineModule title="17/08/2026" />
      <MachineModule title="16/08/2026" />
      <MachineModule title="15/08/2026" />
      <MachineModule title="14/08/2026" />

    </div>
  );
}