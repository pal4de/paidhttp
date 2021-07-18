const paymentHandler = async () => {
    if (!ethereum) {
        alert("Please install MetaMask to use this dApp!");
        return false;
    }

    await ethereum.request({method: 'eth_requestAccounts'});
    window.web3 = new Web3(window.ethereum);

    document.cookie = `paidhttp-addr=${ethereum.selectedAddress}`;

    const contractInfoRes = await fetch('/contract.json');
    const contractInfo = await contractInfoRes.json();
    const abi = contractInfo.abi;
    const contractAddr = '0x9AaC81401acA4Dd5D07D7Ca4223C019204853c73';
    const contract = new web3.eth.Contract(abi, contractAddr);

    const path = location.pathname;
    const fee = await contract.methods.getFee(path).call();
    await contract.methods.pay(path).send({from: ethereum.selectedAddress, value: fee});

    document.location.reload();
}
