import { MongoClient, type Db } from "mongodb";

declare global {
  var mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not configured");
  let clientPromise = global.mongoClientPromise;
  if (!clientPromise) {
    clientPromise = new MongoClient(uri).connect();
    global.mongoClientPromise = clientPromise;
  }
  void clientPromise.catch(() => {
    if (global.mongoClientPromise === clientPromise) {
      global.mongoClientPromise = undefined;
    }
  });
  return clientPromise;
}

export async function getDatabase(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(process.env.MONGODB_DB || "panditji");
}
