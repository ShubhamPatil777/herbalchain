const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function main() {
  try {
    const ccpPath = path.resolve(__dirname, 'connection-org1.json');
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    const wallet = await Wallets.newFileSystemWallet(path.join(__dirname, 'wallet'));
    const identity = await wallet.get('appUser');

    if (!identity) throw new Error('appUser not found in wallet.');

    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: 'appUser',
      discovery: { enabled: true, asLocalhost: true }
    });

    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('tracecc');
    console.log('✅ Successfully connected to Fabric and got contract!');

    await gateway.disconnect();
  } catch (err) {
    console.error('❌ Connection failed:', err);
  }
}

main();
