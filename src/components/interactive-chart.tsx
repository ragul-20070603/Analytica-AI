'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { addDays, format, subDays } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';

const initialData = [
  { date: '2024-07-01', sales: 4000, revenue: 2400 },
  { date: '2024-07-02', sales: 3000, revenue: 1398 },
  { date: '2024-07-03', sales: 2000, revenue: 9800 },
  { date: '2024-07-04', sales: 2780, revenue: 3908 },
  { date: '2024-07-05', sales: 1890, revenue: 4800 },
  { date: '2024-07-06', sales: 2390, revenue: 3800 },
  { date: '2024-07-07', sales: 3490, revenue: 4300 },
  { date: '2024-07-08', sales: 3490, revenue: 4300 },
  { date: '2024-07-09', sales: 4100, revenue: 2500 },
  { date: '2024-07-10', sales: 3100, revenue: 1498 },
  { date: '2024-07-11', sales: 2100, revenue: 8800 },
  { date: '2024-07-12', sales: 2880, revenue: 3508 },
  { date: '2024-07-13', sales: 1990, revenue: 4500 },
  { date: '2024-07-14', sales: 2490, revenue: 3900 },
  { date: '2024-07-15', sales: 3590, revenue: 4400 },
];

export default function InteractiveChart() {
  const [data, setData] = React.useState(initialData);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 14),
    to: new Date(),
  });
  const [column, setColumn] = React.useState('sales');

  React.useEffect(() => {
    const filteredData = initialData.filter((item) => {
      const itemDate = new Date(item.date);
      if (date?.from && date?.to) {
        return itemDate >= date.from && itemDate <= date.to;
      }
      return true;
    });
    setData(filteredData);
  }, [date]);

  const chartConfig = {
    [column]: {
      label: column.charAt(0).toUpperCase() + column.slice(1),
      color: 'hsl(var(--chart-1))',
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interactive Visualization</CardTitle>
        <CardDescription>Filter and explore your dataset visually.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="grid gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={'outline'}
                  className={cn('w-full sm:w-[300px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(date.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
          <Select value={column} onValueChange={setColumn}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select column" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="revenue">Revenue</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => format(new Date(value), 'MMM dd')} />
            <YAxis />
            <Tooltip
              content={({ active, payload, label }) =>
                active && payload && payload.length ? (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                        <span className="font-bold text-foreground">{format(new Date(label), 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          {column.charAt(0).toUpperCase() + column.slice(1)}
                        </span>
                        <span className="font-bold text-foreground">{payload[0].value}</span>
                      </div>
                    </div>
                  </div>
                ) : null
              }
            />
            <Legend />
            <Bar dataKey={column} fill="var(--color-sales)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
