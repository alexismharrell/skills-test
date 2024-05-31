import { useEffect, useState } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import useAxios from "axios-hooks"
import styled from "@emotion/styled"

interface CountyData {
  countyName: string
  population: number
  spanishSpeakers: number
  fipsCode: string
}

const StyledTableRow = styled(TableRow)`
  "&:nth-of-type(odd)": {
    background-color: gray;
  }
`

export default function CensusDataTable(props: { stateCode: string }) {
  const TOTAL_POPULATION_CENSUS_VAR = "B01001_001E"
  const SPANISH_SPEAKERS_CENSUS_VAR = "B06007_003E"
  const BASE_CENSUS_URL = "https://api.census.gov/data/2022/acs/acs5"
  const FULL_CENSUS_URL = `${BASE_CENSUS_URL}?get=NAME,${TOTAL_POPULATION_CENSUS_VAR},${SPANISH_SPEAKERS_CENSUS_VAR}&for=county:*&in=state:${props.stateCode}`
  const [{ response, loading, error }] = useAxios({
    method: "GET",
    url: FULL_CENSUS_URL,
  })
  const [rows, setRows] = useState<CountyData[]>([])

  useEffect(() => {
    if (!loading && !error) {
      console.log(response?.data)
      const censusResponse: string[][] = response?.data.slice(1) //skip header row
      const censusRows = censusResponse.map((row) => {
        return {
          countyName: row[0],
          population: Number(row[1]),
          spanishSpeakers: Number(row[2]),
          fipsCode: row[4],
        }
      })
      setRows(censusRows)
    }
  }, [response, loading, error, props.stateCode])

  return (
    <Paper sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 1150 }}>
        <Table stickyHeader aria-label='county data header'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>County Name</TableCell>
              <TableCell align='center'>Overall Population</TableCell>
              <TableCell align='center'>Spanish Speakers</TableCell>
              <TableCell align='center'>County Fips Code</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow
                key={row.countyName}
                sx={{
                  "&:nth-of-type(odd)": { backgroundColor: "lightgray" },
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell align='center' component='th' scope='row'>
                  {row.countyName}
                </TableCell>
                <TableCell align='center'>{row.population}</TableCell>
                <TableCell align='center'>{row.spanishSpeakers}</TableCell>
                <TableCell align='center'>{row.fipsCode}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
