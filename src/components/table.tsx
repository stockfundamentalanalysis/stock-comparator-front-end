import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

function createData(key: string, value: number, unit: string) {
  return { key, value, unit }
}

interface Props {
  company: {
    currentper: number
    currentevebitda: number
    currentpricetofreecashflowrate: number
    roic: number
    netdebttoebitda: number
  }
}

const BasicTable = ({ company }: Props) => {
  const {
    currentper,
    currentevebitda,
    currentpricetofreecashflowrate,
    roic,
    netdebttoebitda,
  } = company

  const rows = [
    createData('PER', currentper, ''),
    createData('EV/EBITDA', currentevebitda, ''),
    createData('Price/Free Cash Flow', currentpricetofreecashflowrate, ''),
    createData('ROIC', roic * 100, '%'),
    createData('Net Debt/EBITDA', netdebttoebitda, ''),
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
