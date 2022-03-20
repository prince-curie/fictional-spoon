import { 
  Container, AppBar, Box, Button, Typography, Toolbar, TextField 
} from '@mui/material'
import Head from 'next/head'
import Web3Modal from 'web3modal';
import { useEffect, useRef, useState } from 'react'
import { Contract, providers, ethers } from 'ethers';
import { abi, STAKING_CONTRACT_ADDRESS } from '../constants';


export default function Home() {

  const [walletConnect, setWalletConnect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState("Not available")
  const web3ModalRef = useRef()
  const contractProviderRef = useRef()
  const contractSignerRef = useRef()

  const connectWallet = async () => {
    try {
      const provider = await getProviderOrSigner()

      await getBalance(provider)

      setWalletConnect(true)
    } catch (err) {
      throw new Error('System Error');
    }
  };

  const getProviderOrSigner = async (signer = false) => {
    const instance = await web3ModalRef.current.connect()

    const provider = new providers.Web3Provider(instance)

    if(signer) {
      return provider.getSigner()
    }

    return provider
  }

  const getBalance = async (provider) => {    
    try {
      const signer = provider.getSigner()

      const contract = new Contract(
        STAKING_CONTRACT_ADDRESS,
        abi,
        provider
      )
  
      const address = await signer.getAddress()

      const balance = await contract.balanceOf(address)
      
      setBalance(ethers.utils.formatUnits(balance, 18))
    } catch (error) {
      throw new Error('System Error')
    }  
  }

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

  useEffect(() => {
    if(walletConnect == false) {
      web3ModalRef.current = new Web3Modal({
        network: "rinkeby",
        disableInjectedProvider: false,
        cacheProvider: false
      })
    }
  }, [walletConnect]);

  return (
    <>
      <Head>
        <title>Monk Token</title>
        <meta name="description" content="Monk-Token" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar position="static" width="100%" sx={{
        display: "flex", flexGrow: 1, flexDirection: "row", 
        bgcolor: 'grey.500', justifyContent: "space-between"
      }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ m: 2, display: { xs: 'none', md: 'flex' } }}
          >
            MONK
          </Typography>
        </Toolbar>

        <p>
          Balance: {balance}
        </p>
          
        <Box sx={{ flexGrow: 0 }}>
          <Button onClick={connectWallet} 
            sx={{ p: .5, m: 2, color:"white", borderColor: 'black', 
            display: { xs: 'none', md: 'flex' } }} variant="outlined"
          >
            {walletConnect ? "Wallet Connected" : "Connect Wallet"}
          </Button>
        </Box>
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
