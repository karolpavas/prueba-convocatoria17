import fetchData from "@/utils/fetch-data";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { z } from "zod";
import { Skeleton } from "./ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const AirTable: FC = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || "no-key";
  const url = `http://api.airvisual.com/v2/city?city=Manizales&state=Caldas&country=Colombia&key=${apiKey}`;
  const schema = z.object({
    status: z.string(),
    data: z.object({
      city: z.string(),
      state: z.string(),
      country: z.string(),
      location: z
        .object({
          type: z.string(),
          coordinates: z.array(z.number()),
        })
        .optional(),
      current: z.object({
        pollution: z
          .object({
            ts: z.string(),
            aqius: z.number(),
            mainus: z.string(),
            aqicn: z.number(),
            maincn: z.string(),
          })
          .optional(),
        weather: z.object({
          ts: z.string(),
          tp: z.number(),
          pr: z.number(),
          hu: z.number(),
          ws: z.number(),
          wd: z.number(),
          ic: z.string(),
        }),
      }),
    }),
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["air-quality", "Manizales", "Caldas", "Colombia"],
    queryFn: () =>
      fetchData({
        schema,
        url,
        method: "GET",
      }),
  });

  if (isLoading) {
    return (
      <div className="text-gray-500 w-1/2 h-full flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton className="h-5 w-full" key={index} />
        ))}
      </div>
    );
  }

  if (isError || data === undefined)
    return <div className="text-red-500">Something went wrong</div>;

  const { tp, ws, hu, wd, pr } = data.data.current.weather;

  return (
    <div className="text-white text-xl font-semibold w-1/2 h-full flex flex-col gap-3">
      <Table>
        <TableCaption>Air Table</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">PM2.5</TableHead>
            <TableHead>PM10</TableHead>
            <TableHead>
              Ozone (O<sub>3</sub>)
            </TableHead>
            <TableHead className="text-right">
              Nitrogen Dioxide (NO<sub>2</sub>)
            </TableHead>
            <TableHead className="text-right">Carbon Monoxide (CO)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">{wd}</TableCell>
            <TableCell>{tp}</TableCell>
            <TableCell>{ws}</TableCell>
            <TableCell className="text-right">{pr}</TableCell>
            <TableCell className="text-right">{hu}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default AirTable;
