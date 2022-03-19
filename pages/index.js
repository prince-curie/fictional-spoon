import { 
  Container, AppBar, Box, Button, Typography, Toolbar, TextField 
} from '@mui/material'
import Head from 'next/head'
import { useState } from 'react'

export default function Home() {

  const [walletConnect, setWalletConnect] = useState(false);
  const [loading, setLoading] = useState(false);

  const connectWallet = () => {
    // setAnchorElNav(null);
  };

  const handleChange = () => {
    // setAnchorElNav(null);
  };

  const buyToken = () => {
    // setAnchorElNav(null);
  };

  const stake = () => {
    // setAnchorElNav(null);
  };

  const transfer = () => {
    // setAnchorElNav(null);
  };

  return (
    <>
      <Head>
        <title>Monk Token</title>
        <meta name="description" content="Monk-Token" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar position="static" >
        <Container maxWidth="xl" width="100%" sx={{bgcolor: "gray"}}>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              MONK
            </Typography>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              MONK
            </Typography>
            
            <Box sx={{ flexGrow: 0 }}>
              <Button onClick={connectWallet} sx={{ p: 0, color:"white" }} variant="outlined">
                Connect Wallet
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="buy-address"
            label="Address"
            onChange={handleChange}
          />
          <Button onClick={buyToken} sx={{ p: 0 }} variant="outlined">
            Buy Monk
          </Button>
        </Box>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="stake-monk"
            label="Amount"
            onChange={handleChange}
          />
          <Button onClick={stake} sx={{ p: 0 }} variant="outlined">
            Stake Monk
          </Button>
        </Box>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="transfer-address"
            label="Address"
            onChange={handleChange}
          />
          <TextField
            id="transfer-amount"
            label="Amount"
            onChange={handleChange}
          />
          <Button onClick={transfer} sx={{ p: 0 }} variant="outlined">
            Transfer Monk
          </Button>
        </Box>
      </Box>
    </>
  )
}
