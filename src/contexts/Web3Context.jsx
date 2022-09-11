import {useContext, createContext, useEffect, useState} from "react"

import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers"

const Web3Context = createContext(undefined)

const Web3Provider = ({children}) => {
  const [modernWeb3, setModernWeb3] = useState(false)
  const [connected, setConnected] = useState(false)
  const [signer, setSigner] = useState()

  useEffect(() => {
    if (window.ethereum !== undefined) {
      setModernWeb3(true)
    }
  }, [])

  const connect = async () => {
    console.log(modernWeb3 ? 'Have modernWeb3' : 'Dont Have modernWeb3')
    if (modernWeb3) {
      try {
        console.log('Trying to connect using modernWeb3...')
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        setConnected(true)
        setSigner(provider.getSigner())
        console.log('Conncted successfully!')
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        console.log('Trying to connect using WalletConnect...')
        const web3Provider = new WalletConnectProvider({
          infuraId: 'dfc5e146ea7a48ffa8624c47cd9810b9'
        });
        await web3Provider.enable()
        const provider = new ethers.providers.Web3Provider(web3Provider);
        setConnected(true)
        let scopeSigner = provider.getSigner()
        setSigner(provider.getSigner())
        let balance = await scopeSigner.getBalance()
        console.log(Number(balance))
        console.log('Conncted successfully!')
      } catch (e) {
        console.log(e)
      }
    }
  }
  
  return (
    <Web3Context.Provider value={{
      connect,
      connected,
      signer
    }}>
        {children}
    </Web3Context.Provider>
  )
}

const useWeb3 = () => useContext(Web3Context)

export default Web3Provider
export {useWeb3}