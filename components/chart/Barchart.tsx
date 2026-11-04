'use client';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar, ChartProps } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Student Grades Overview',
    },
  },
};

const labels = ['1 Jan', '2 Jan', '3 Jan', '4 Jan', '5 Jan'];

const defaultData = {
  labels,
  datasets: [
    {
      label: 'Total Time',
      data: [10, 40, 30, 50, 20],
      backgroundColor: 'orange',
    },
  ],
};

export default function GradeChart(props: ChartProps<'bar'>) {
  // Use the data from props if provided, otherwise use the default data
  // const chartData = props.data || defaultData;
  const chartData =  defaultData;



  const { data, ...restProps } = props;
  console.log('BarChart data:', data);
  return <Bar options={options} data={chartData} {...restProps} />;
}
