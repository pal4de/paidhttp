import express from 'express';
import Web3 from 'web3';
import { AbiItem } from "web3-utils";
import { PaidHTTP } from './types/web3-v1-contracts/PaidHTTP';

const app = express();
app.set('view engine', 'ejs');

const provider = 'http://127.0.0.1:8545';
const constructInfo = require('./build/contracts/PaidHTTP.json')
const constructAddr = '0x6d57cCd4F3f52fAB1103b178cdE0f2aBF95cc5D8';
const ownerAddr = '0x93074Ec6AB154eE02Ec294FD3aADd291789d3796';

const web3 = new Web3(new Web3.providers.HttpProvider(provider));
const paidhttpAbi = constructInfo.abi as AbiItem;
const contract = new web3.eth.Contract(paidhttpAbi, constructAddr) as unknown as PaidHTTP;

app.use(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const data = {
        paid: false
    };
    if (!data.paid) {
        res.status(402);
    }
    res.render('./index.ejs', data);
});

console.log('ready');
app.listen(3000);
