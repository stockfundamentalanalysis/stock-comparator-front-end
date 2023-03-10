import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import json from '../data/sfa_easy.json'

//nested data is ok, see accessorKeys in ColumnDef below
const data = Object.values(json)

const Example = () => {
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        header: "Ticker",
        accessorKey: "Ticker"
      },
      {
        header: "CompanyName",
        accessorKey: "CompanyName"
      },
      {
        header: "Potential",
        accessorKey: "Potential"
      },
      {
        header: "TargetPrice",
        accessorKey: "TargetPrice"
      },
      {
        header: "DebtQualityScore",
        accessorKey: "DebtQualityScore"
      },
      {
        header: "EarningsScore",
        accessorKey: "EarningsScore"
      },
      {
        header: "ProfitabilityScore",
        accessorKey: "ProfitabilityScore"
      },
      {
        header: "GrowthScore",
        accessorKey: "GrowthScore"
      },
      {
        header: "Sector",
        accessorKey: "Sector"
      },
    ],
    [],
  );

  return <MaterialReactTable columns={columns} data={data} />;
};

export default Example;
