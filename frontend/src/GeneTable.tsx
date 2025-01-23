import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Input, Loader, Table } from '@mantine/core';
import { Chart } from './components/Charts/Demo';
import { Icon1, Icon2, Icon3 } from './components/Icons/Demo';
import { backendURL } from './Const';

interface GeneData {
  Ensembl: string;
  'Gene symbol': string;
  Name: string;
  Biotype: string;
  Chromosome: number;
  'Seq region start': number;
  'Seq region end': number;
}

const GeneTable: React.FC = () => {
  const [data, setData] = useState<GeneData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [chartData, setChartData] = useState<{ start: number; end: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get<GeneData[]>(`${backendURL}/read-csv/${page}?name=${name}`);
        setData(data);
        console.log('Called the backend!!');
        setChartData([]);
      } catch (error) {
        console.log(error);
        // eslint-disable-next-line no-alert
        alert('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [loading]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <Loader variant="dots" />
      </div>
    );
  }

  const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>, index: number) => {
    e.preventDefault();
    setData([data[index]]);
    setChartData([{ start: data[index]['Seq region start'], end: data[index]['Seq region end'] }]);
    // console.log(data[index]['Seq region end']);
  };

  const handleResetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setName('');
    setPage(1);
    setLoading(true);
  };

  const handleNextPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPage(page + 1);
    setLoading(true);
  };

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
  };

  const rows = data.map((row, index) => (
    <Table.Tr key={index}>
      <Table.Td
        style={{
          cursor: 'pointer',
          backgroundColor: 'lightblue',
        }}
        onClick={(e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => handleRowClick(e, index)}
      >
        {row.Ensembl === '' ? '---' : row.Ensembl}
      </Table.Td>
      <Table.Td>{row['Gene symbol'] === '' ? '---' : row['Gene symbol']}</Table.Td>
      <Table.Td>{row.Name === '' ? '---' : row.Name}</Table.Td>
      <Table.Td>{row.Biotype === '' ? '---' : row.Biotype}</Table.Td>
      <Table.Td>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
          {row.Chromosome <= 10 ? <Icon1 /> : row.Chromosome > 10 ? <Icon2 /> : <Icon3 />}
          {row.Chromosome}
        </div>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div style={{ margin: '1rem' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
        }}
      >
        <Input
          size="md"
          radius="xl"
          placeholder="Search for a Name:"
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <Button variant="filled" radius="xl" onClick={(e) => handleSearch(e)}>
          Search
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '2rem',
          marginRight: '1rem',
        }}
      >
        <Button variant="filled" color="green" onClick={(e) => handleResetClick(e)}>
          Reset
        </Button>
      </div>
      <Table
        stickyHeader
        stickyHeaderOffset={60}
        striped
        highlightOnHover
        withTableBorder
        withColumnBorders
      >
        <Table.Thead style={{ backgroundColor: 'lightgray' }}>
          <Table.Tr>
            <Table.Th>Ensembl</Table.Th>
            <Table.Th>Gene Symbol</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Biotype</Table.Th>
            <Table.Th>Chromosome</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <tbody style={{ textAlign: 'center' }}>{rows}</tbody>
      </Table>
      <div>
        {chartData[0] && <Chart startValue={chartData[0].start} endValue={chartData[0].end} />}
      </div>

      <div
        style={{
          marginTop: '2rem',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2rem',
        }}
      >
        <Button onClick={(e) => handleNextPage(e)}>Next Page</Button>
      </div>
    </div>
  );
};

export default GeneTable;
