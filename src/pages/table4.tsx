import React, { useMemo } from 'react';
//MRT Imports
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';

//Material-UI Imports
import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
  TextField,
} from '@mui/material';

//Date Picker Imports
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//Icons Imports
import { AccountCircle, Send } from '@mui/icons-material';

//Mock Data
import json from "../data/sfa_easy.json";

export type Employee = {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  salary: number;
  startDate: string;
  signatureCatchPhrase: string;
  avatar: string;
};


function pickHex(color_bad, color_good, color_intermediate, weight) {
  if (weight > 0.5) {
    var color2 = color_intermediate
    var color1 = color_good
    var w1 = (weight - 0.5) * 2
    var w2 = 1 - w1
  } else {
    var color1 = color_intermediate
    var color2 = color_bad
    var w1 = weight * 2
    var w2 = 1 - w1
    // OK the calculation
  }
  var rgb = [
    Math.round(color1[0] * w1 + color2[0] * w2),
    Math.round(color1[1] * w1 + color2[1] * w2),
    Math.round(color1[2] * w1 + color2[2] * w2),
  ]
  return rgb
}

function calculateWeight(value, min, max) {
  const weight = Math.max(0, Math.min((value - min) / (max - min), 1))
  return weight
}

const green = [0, 255, 0]
const white = [255, 255, 255]
const red = [255, 0, 0]

export type Company = {
  Ticker: string
  CompanyName: string
  Potential: number
  TargetPrice: number
  DebtQualityScore: number
  EarningsScore: number
  ProfitabilityScore: number
  GrowthScore: number
  Sector: string
}

const data: Company[] = Object.values(json)


const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Company>[]>(
    () => [
      {
        id: 'Potential',
        header: 'Potential',
        columns: [
          {
            accessorKey: 'Potential',
            filterVariant: 'range',
            header: 'Potential',
            size: 200,
            //custom conditional format and styling
            Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  backgroundColor:
                    cell.getValue<number>() < 10
                      ? theme.palette.error.dark
                      : cell.getValue<number>() >= 0 &&
                        cell.getValue<number>() < 10
                      ? theme.palette.warning.dark
                      : theme.palette.success.dark,
                  borderRadius: '0.25rem',
                  color: '#fff',
                  maxWidth: '9ch',
                  p: '0.25rem',
                })}
              >
                {Math.round(cell.getValue<number>()*100)} %
              </Box>
            ),
          },
          /* {
            accessorKey: 'jobTitle', //hey a simple column for once
            header: 'Job Title',
            size: 350,
          },
          {
            accessorFn: (row) => new Date(row.startDate), //convert to Date for sorting and filtering
            id: 'startDate',
            header: 'Start Date',
            filterFn: 'lessThanOrEqualTo',
            sortingFn: 'datetime',
            Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), //render Date as a string
            Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
            //Custom Date Picker Filter from @mui/x-date-pickers
            Filter: ({ column }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  onChange={(newValue) => {
                    column.setFilterValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      helperText={'Filter Mode: Less Than'}
                      sx={{ minWidth: '120px' }}
                      variant="standard"
                    />
                  )}
                  value={column.getFilterValue()}
                />
              </LocalizationProvider>
            ),
          }, */
        ],
      },
    ],
    [],
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnFilterModes
      enableColumnOrdering
      enableGrouping
      enablePinning
      enableRowActions
      enableRowSelection
      initialState={{ showColumnFilters: true }}
      positionToolbarAlertBanner="bottom"
      /* renderDetailPanel={({ row }) => (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <img
            alt="avatar"
            height={200}
            src={row.original.avatar}
            loading="lazy"
            style={{ borderRadius: '50%' }}
          />
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4">Signature Catch Phrase:</Typography>
            <Typography variant="h1">
              &quot;{row.original.signatureCatchPhrase}&quot;
            </Typography>
          </Box>
        </Box>
      )} */
      renderRowActionMenuItems={({ closeMenu }) => [
        <MenuItem
          key={0}
          onClick={() => {
            // View profile logic...
            closeMenu();
          }}
          sx={{ m: 0 }}
        >
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          View Profile
        </MenuItem>,
        <MenuItem
          key={1}
          onClick={() => {
            // Send email logic...
            closeMenu();
          }}
          sx={{ m: 0 }}
        >
          <ListItemIcon>
            <Send />
          </ListItemIcon>
          Send Email
        </MenuItem>,
      ]}
      renderTopToolbarCustomActions={({ table }) => {
        const handleDeactivate = () => {
          table.getSelectedRowModel().flatRows.map((row) => {
            alert('deactivating ' + row.getValue('name'));
          });
        };

        const handleActivate = () => {
          table.getSelectedRowModel().flatRows.map((row) => {
            alert('activating ' + row.getValue('name'));
          });
        };

        const handleContact = () => {
          table.getSelectedRowModel().flatRows.map((row) => {
            alert('contact ' + row.getValue('name'));
          });
        };

        return (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button
              color="error"
              disabled={!table.getIsSomeRowsSelected()}
              onClick={handleDeactivate}
              variant="contained"
            >
              Deactivate
            </Button>
            <Button
              color="success"
              disabled={!table.getIsSomeRowsSelected()}
              onClick={handleActivate}
              variant="contained"
            >
              Activate
            </Button>
            <Button
              color="info"
              disabled={!table.getIsSomeRowsSelected()}
              onClick={handleContact}
              variant="contained"
            >
              Contact
            </Button>
          </div>
        );
      }}
    />
  );
};

export default Example;

  /* const columns = [
    columnHelper.accessor((row) => row.Ticker, {
      id: 'Ticker',
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Ticker</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.CompanyName, {
      id: 'CompanyName',
      cell: (info) => <i>{info.getValue()}</i>,
      header: 'CompanyName',
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.Potential, {
      id: 'Potential',
      header: 'Potential',
      cell: (cell) => (
        <Box
          component="span"
          sx={(theme) => ({
            backgroundColor:theme.palette.warning.dark,
            borderRadius: '0.25rem',
            color: '#fff',
            maxWidth: '9ch',
            p: '0.25rem',
          })}
          >
            </Box>
            ),
          }),

    columnHelper.accessor((row) => row.TargetPrice, {
      id: 'TargetPrice',
      cell: (cell) => <div>{Math.round(cell.getValue() * 100) / 100} </div>,
      header: () => <span>TargetPrice</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.DebtQualityScore, {
      id: 'DebtQualityScore',
      cell: (info) => {
        const value = info.getValue()
        const weight = calculateWeight(value, 0, 1)
        const rgb = pickHex(red, green, white, weight)
        const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
        return (
          <div style={{ backgroundColor: color }}>
            {Math.round(value * 100)} %
          </div>
        )
      },
      header: () => <span>DebtQualityScore</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.EarningsScore, {
      id: 'EarningsScore',
      cell: (info) => {
        const value = info.getValue()
        const weight = calculateWeight(value, 0, 1)
        const rgb = pickHex(red, green, white, weight)
        const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
        return (
          <div style={{ backgroundColor: color }}>
            {Math.round(value * 100)} %
          </div>
        )
      },
      header: () => <span>EarningsScore</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.ProfitabilityScore, {
      id: 'ProfitabilityScore',
      cell: (info) => {
        const value = info.getValue()
        const weight = calculateWeight(value, 0, 1)
        const rgb = pickHex(red, green, white, weight)
        const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
        return (
          <div style={{ backgroundColor: color }}>
            {Math.round(value * 100)} %
          </div>
        )
      },

      header: () => <span>ProfitabilityScore</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.GrowthScore, {
      id: 'GrowthScore',
      cell: (info) => {
        const value = info.getValue()
        const weight = calculateWeight(value, 0, 1)
        const rgb = pickHex(red, green, white, weight)
        const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
        return (
          <div className="h-full" style={{ backgroundColor: color }}>
            {Math.round(value * 100)} %
          </div>
        )
      },
      header: () => <span>GrowthScore</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.Sector, {
      id: 'Sector',
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Sector</span>,
      footer: (info) => info.column.id,
    }),
  ]

  return <MaterialReactTable columns={columns} data={data} />;
};

export default Example;
 */