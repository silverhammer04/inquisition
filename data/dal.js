const {ObjectID, MongoClient} = require('mongodb');
const assert = require('assert');

const url = process.env.DB_URL;
const db_name = process.env.DB_NAME;
const col_name = process.env.COL_NAME;
const options = {
    useUnifiedTopology: true
}

const readOrdos = () => {
    const iou = new Promise((resolve, reject) => {
    MongoClient.connect(url, options, (err, client) => {
        assert.equal(err, null);
        const db = client.db(db_name);
        const collection = db.collection(col_name);
        collection.find({}).toArray((err, docs) => {
            assert.equal(err, null);
            resolve(docs);
            client.close();
        })
      });
    });
    return iou;
};
const readOrdoByID = (id) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, options, (err, client) => {
            assert.equal(err, null);           
            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.find({_id: new ObjectID(id)}).toArray((err, docs) => {
                assert.equal(err, null);
                resolve(docs[0]);
                client.close();
                })
            });
        });
    return iou;
}

const createOrdos = (ordo) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, options, (err, client) => {
            assert.equal(err, null);
            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.insertOne(ordo, (err, result) => {
                assert.equal(err, null);
                resolve(result.ops[0]);
                client.close();
            })
        });
    });
    return iou;
}
const upcertOrdos = (id, ordo) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, options, (err, client) => {
            assert.equal(err, null);
            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.findAndModify({ _id: new ObjectID(id)}, 
            null,
            {$set: {...ordo}},
            {upsert: true},
            (err, result) => {
                assert.equal(err, null);
                readOrdoByID(id)
                    .then(ordo => resolve(ordo))
                    .then(() => client.close ());
            })
        });
    });
    return iou;
}
const deleteOrdos = (id) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, options, (err, client) => {
            assert.equal(err, null);
            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.findOneAndDelete({_id: new ObjectID(id) }, (err, result)=>{
                assert.equal(err, null);
                resolve(result,);
                client.close();
            });
        });
    });
  return iou;
};
module.exports = {
    createOrdos,
    readOrdos,
    upcertOrdos,
    deleteOrdos
};