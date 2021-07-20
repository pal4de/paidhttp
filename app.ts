import express from 'express';
import cookieParser from 'cookie-parser';
import Web3 from 'web3';
import { AbiItem } from "web3-utils";
import { PaidHTTP } from './types/web3-v1-contracts/PaidHTTP';

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cookieParser());

const provider = 'http://127.0.0.1:8545';
const contractInfo = require('./build/contracts/PaidHTTP.json')
const contractAddr = '0xa430eE8Ab73FdbAD40Ef2E3CdD8aEc22480Fa90D';
const ownerAddr = '0x374FB850aE93eF9aFE6827547a232c31593A458c';

const web3 = new Web3(new Web3.providers.HttpProvider(provider));
const abi = contractInfo.abi as AbiItem;
const contract = new web3.eth.Contract(abi, contractAddr) as unknown as PaidHTTP;

app.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const path = req.originalUrl;
    const visitorAddr = req.cookies['paidhttp-addr'];

    let isPaid = false;
    if (web3.utils.isAddress(visitorAddr)) {
        isPaid = await contract.methods.checkTicket(visitorAddr, path).call();
    }

    if (!isPaid) {
        res.status(402);
    } else {
        await contract.methods.punchTicket(visitorAddr, path).send({from: ownerAddr});
    }
    res.render('./index.ejs', {paid: isPaid});
});

console.log('ready');
app.listen(3000);
