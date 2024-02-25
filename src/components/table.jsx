import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

function createData(key, value, unit) {
  return { key, value, unit }
}

const BasicTable = (props) => {
  const {
    CurrentPER,
    CurrentEVEBITDA,
    CurrentPricetoFreeCashFlowRate,
    ROIC,
    NetDebttoEBITDA,
  } = props.company

  const rows = [
    createData('PER', CurrentPER, ''),
    createData('EV/EBITDA', CurrentEVEBITDA, ''),
    createData('Price/Free Cash Flow', CurrentPricetoFreeCashFlowRate, ''),
    createData('ROIC', ROIC * 100, '%'),
    createData('Net Debt/EBITDA', NetDebttoEBITDA, ''),
  ]

  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Indicator</TableCell>
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
                {typeof row.value === 'number'
                  ? row.value.toFixed(1)
                  : row.value}{' '}
                {row.unit}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BasicTable
