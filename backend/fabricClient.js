const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

async function getContract() {
  const ccpPath = path.resolve(__dirname, 'connection-org1.json');
  const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

  const walletPath = path.resolve(__dirname, 'wallet');
  const wallet = await Wallets.newFileSystemWallet(walletPath);

  const identity = await wallet.get('appUser');
  if (!identity) {
    throw new Error('An identity for the user "appUser" does not exist in the wallet. Register user first.');
  }

  const gateway = new Gateway();
  await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: false } });

  const network = await gateway.getNetwork('mychannel');
  const contract = network.getContract('tracecc');
  return { gateway, contract };
}

module.exports = { getContract };
