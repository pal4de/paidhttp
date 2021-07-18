const express = require('express');
const Web3 = require('web3');

const app = express();

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
const paidhttpAddress = '0x6d57cCd4F3f52fAB1103b178cdE0f2aBF95cc5D8';
const paidhttpAbi = require('./build/contracts/PaidHTTP.json').abi;
const contract = new web3.eth.Contract(paidhttpAbi, paidhttpAddress);

const ownerAddress = '0x93074Ec6AB154eE02Ec294FD3aADd291789d3796';

let price = 100;

app.get('/', async (request, response) => {
    await contract.methods.setFee('/', price).send({from: ownerAddress});
    const res = await contract.methods.getFee('/').call({from: ownerAddress});
    response.status(200).send(res);
    price += 100;
});

app.listen(3000);
