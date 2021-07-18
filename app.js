const express = require('express');
const Web3 = require('web3');

const app = express();

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
const address = '0xE3B3D5BfFb680Df948545Ce74F42f76b04C47980';
const abi = require('./build/contracts/PaidHTTP.json').abi;
const contract = new web3.eth.Contract(abi, address);

contract.methods.setFee('/', 100).send({from: '0x93074Ec6AB154eE02Ec294FD3aADd291789d3796'});

app.get('/', async (request, response) => {
    const res = await contract.methods.getFee('/').call({from: '0x93074Ec6AB154eE02Ec294FD3aADd291789d3796'});
    response.status(200).send(res);
});

app.listen(3000);
