import React from "react";
import { render } from "react-dom";
import { useTable, useSortBy } from "react-table";
import ReactTable from "react-table"; 
import json from '../data/sfa_easy.json'
import MaterialReactTable from 'material-react-table';

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  )

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function index() {

  const data = Object.values(json)

  console.log(data)

  const columns = React.useMemo(
    () => [
      {
        Header: "Ticker",
        accessor:          "Ticker"
      },
      {
        Header: "CompanyName",
        accessor: "CompanyName"
      },
      {
        Header: "Potential",
        accessor: "Potential"
      },
      {
        Header: "TargetPrice",
        accessor: "TargetPrice"
      },
      {
        Header: "DebtQualityScore",
        accessor: "DebtQualityScore"
      },
      {
        Header: "EarningsScore",
        accessor: "EarningsScore"
      },
      {
        Header: "ProfitabilityScore",
        accessor: "ProfitabilityScore"
      },
      {
        Header: "GrowthScore",
        accessor: "GrowthScore"
      },
      {
        Header: "Sector",
        accessor: "Sector"
      },
    ],
    []
  );

  return <Table columns={columns} data={data} />;
}



