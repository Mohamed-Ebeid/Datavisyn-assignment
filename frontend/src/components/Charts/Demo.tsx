import { PieChart } from '@mantine/charts';

export function Chart({ startValue, endValue }: { startValue: number; endValue: number }) {
  const data = [
    { name: 'Start', value: startValue || 1, color: 'indigo.6' },
    { name: 'End', value: endValue || 2, color: 'yellow.6' },
  ];
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}
    >
      <div>
        <h2>Seq Region Start & End</h2>
        <PieChart
          withTooltip
          withLabelsLine
          labelsPosition="outside"
          labelsType="value"
          withLabels
          data={data}
        />
      </div>
    </div>
  );
}
