"use client";
import { FC } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import _ from "lodash";

export const MonthlyChart: FC<any> = ({ dailyExpense, data }) => {
  const yy = dailyExpense?.data?.month;
  let result = Object.entries(yy).map(([key, values]: any) => ({
    month: key,
    amount: values
      .map((el: any) => {
        return el.amount;
      })
      .reduce((sum: any, num: any) => sum + num, 0),
  }));

  const chartData = result;
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;
  return (
    <Card className="shadow-none rounded-md">
      <CardHeader>
        <CardTitle>Monthly Expenses made </CardTitle>
        <CardDescription>
          {data?.presentTerm} {data?.presentSession} session
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              //   tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="amount" fill="var(--color-mobile)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Tracking expense made for this Term
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          This will give us insight about our finances
        </div>
      </CardFooter>
    </Card>
  );
};
