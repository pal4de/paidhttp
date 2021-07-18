import express from 'express';
const app = express();

import Web3 from 'web3';
import { AbiItem } from "web3-utils";
import { PaidHTTP } from './types/web3-v1-contracts/PaidHTTP';

const provider = 'http://127.0.0.1:8545';
const paidhttpAddress = '0x6d57cCd4F3f52fAB1103b178cdE0f2aBF95cc5D8';
const ownerAddress = '0x93074Ec6AB154eE02Ec294FD3aADd291789d3796';

const web3 = new Web3(new Web3.providers.HttpProvider(provider));
const paidhttpAbi = require('./build/contracts/PaidHTTP.json').abi as AbiItem;
const contract = new web3.eth.Contract(paidhttpAbi, paidhttpAddress) as unknown as PaidHTTP;

app.use(async (request: express.Request, response: express.Response) => {
    const path = request.originalUrl;

    const price = await contract.methods.getFee(path).call({from: ownerAddress});
    response.status(200).send(`${path}: ${price}`);

    const newPrice = parseInt(price) + 100;
    await contract.methods.setFee(path, newPrice).send({from: ownerAddress});
});

app.listen(3000);
