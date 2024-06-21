import AirTable from "@/components/air-table";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex bg-slate-800 min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <AirTable />
    </main>
  );
}
