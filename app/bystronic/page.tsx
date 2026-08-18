import { Suspense } from "react";
import BystronicContent from "./BystronicContent";

export default function BystronicPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Cargando...
        </div>
      }
    >
      <BystronicContent />
    </Suspense>
  );
}