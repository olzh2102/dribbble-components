import { Box } from '@mui/material'
import styled from '@emotion/styled'

const App = () => {
    return (
        <Container>
            <Box>Autocomplete Search component</Box>
            <Box>Weather graphs and chart about city</Box>
        </Container>
    )
}

export default App

const Container = styled(Box)`
    display: flex;
    gap: 32px;
`