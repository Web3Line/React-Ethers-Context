import { useWeb3 } from "../contexts/Web3Context"

const Web3 = () => {
  const { connect, connected } = useWeb3()

  return (
    <>
      <button onClick={connect} disabled={connected}>{connected ? 'Connected' : 'Connect'}</button>
    </>
  )
}

export default Web3