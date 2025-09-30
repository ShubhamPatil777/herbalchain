'use strict';

const { Contract } = require('fabric-contract-api');

class TraceContract extends Contract {

  async initLedger(ctx) {
    console.info('Ledger initialized');
  }

  async createBatch(ctx, batchId, herbName, collectorId, latitude, longitude, timestamp, metadata) {
    const exists = await this._batchExists(ctx, batchId);
    if (exists) {
      throw new Error(`Batch ${batchId} already exists`);
    }
    const batch = {
      batchId,
      herbName,
      collectorId,
      location: { latitude, longitude },
      createdAt: timestamp,
      metadata: metadata || '',
      events: [
        { type: 'COLLECTION', details: metadata || '', timestamp }
      ],
      docType: 'batch'
    };
    await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(batch)));
    return JSON.stringify(batch);
  }

  async addProcessingEvent(ctx, batchId, eventType, details, timestamp) {
    const batchAsBytes = await ctx.stub.getState(batchId);
    if (!batchAsBytes || batchAsBytes.length === 0) {
      throw new Error(`Batch ${batchId} does not exist`);
    }
    const batch = JSON.parse(batchAsBytes.toString());
    batch.events.push({ type: eventType, details, timestamp });
    await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(batch)));
    return JSON.stringify(batch);
  }

  async queryBatch(ctx, batchId) {
    const batchAsBytes = await ctx.stub.getState(batchId);
    if (!batchAsBytes || batchAsBytes.length === 0) {
      throw new Error(`Batch ${batchId} does not exist`);
    }
    return batchAsBytes.toString();
  }

  async listBatchesByCollector(ctx, collectorId) {
    const iterator = await ctx.stub.getStateByRange('', '');
    const allResults = [];
    for (let res = await iterator.next(); !res.done; res = await iterator.next()) {
      if (res.value && res.value.value.toString()) {
        const record = JSON.parse(res.value.value.toString('utf8'));
        if (record.collectorId === collectorId) {
          allResults.push(record);
        }
      }
    }
    return JSON.stringify(allResults);
  }

  // helper
  async _batchExists(ctx, batchId) {
    const data = await ctx.stub.getState(batchId);
    return data && data.length > 0;
  }
}

module.exports = TraceContract;
