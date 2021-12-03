import mongodb from 'mongodb';
import redis from 'redis';

class DataStore {
    // mongoDb
    static mongo;
    static kstDatabase
    static recipies;

    //redis
    static cache;

    static connect = async () => {
        const { MongoClient } = mongodb;
        DataStore.mongo = new MongoClient(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        await DataStore.mongo.connect();

        DataStore.kstDatabase = await DataStore.mongo.db('kst');
        DataStore.recipies = await DataStore.kstDatabase.collection('recipe');

        DataStore.cache = await redis.createClient();
        await DataStore.cache.connect();

    }

    static addOne = async () => {
        return await DataStore.recipies.insertOne({ name: "testTwo" }); 
    }

    static getRecipe = async (name) => {
        let recipe = await DataStore.getFromCache('recipe', name);
        if (recipe) {
            console.log("cached");
            return recipe;
        }
        recipe = await DataStore.recipies.findOne({ "name" : name });
        console.log(recipe);
        await DataStore.setCache('recipe', name, recipe);
        return recipe;

    }

    static getFromCache = async (namespace, key) => {
        return await DataStore.cache.get(namespace + ':' + key);
    }

    static setCache = async (namespace, key, value) => {
        if (!value) {
            return;
        }
        const keyWithNamespace = namespace + ':' + key;
        console.log(DataStore.cache);
        await DataStore.cache.set(keyWithNamespace, JSON.stringify(value), { EX: 10, NX: true });
        return;
    }
    
}

export default DataStore;