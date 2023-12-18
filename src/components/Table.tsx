import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

function createData(key: string, value: number, unit: string) {
  return { key, value, unit }
}

function BasicTable(props: {
  company: {
    CurrentPER: any
    CurrentEVEBITDA: any
    CurrentPricetoFreeCashFlowRate: any
    ROIC: any
    NetDebttoEBITDA: any
  }
}) {
  const rows = [
    createData('PER', props.company.CurrentPER, ' '),
    createData('EV/EBITDA', props.company.CurrentEVEBITDA, ' '),
    createData(
      'Price/Free Cash Flow',
      props.company.CurrentPricetoFreeCashFlowRate,
      ' '
    ),
    createData('ROIC', props.company.ROIC * 100, ' %'),
    createData('Net Debt/EBITDA', props.company.NetDebttoEBITDA, ' '),
  ]
  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> </TableCell>
            <TableCell align="left">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.key}
              </TableCell>
              <TableCell align="center">
                {row.value.toFixed(1)} {row.unit}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BasicTable
