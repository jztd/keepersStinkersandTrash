import crypto from 'crypto';
import DataStore from './dataStore.js';

class UserHelpers {
    static isValidPassword = (password, hash, salt) => {
        let hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
        return hash === hashVerify;
    }
    
    static genPassword = (password) => {
        let salt = crypto.randomBytes(32).toString("hex");
        let genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
      
        return { salt: salt, hash: genHash };
    }

    static getUser = async (username, password, cb) => {
        try {
            let thisUser = await DataStore.getUser(username);
            if (!thisUser) {
                return cb(null, false);
            }
            
            const hasValidPassword = UserHelpers.isValidPassword(password, thisUser.hash, thisUser.salt);
            if (hasValidPassword) {
                return cb(null, thisUser);
            } else {
                return cb(null, false);
            }
        } catch (exception) {
            cb(exception);
        }


    }

    static crunchatizeUser = (user, cb) => {
        cb(null, user._id);
    }

    static decrunchatizeUser = async (userId, cb) => {
        try {
            let thisUser = await DataStore.getUserById(userId);
            return cb(null, thisUser);
        } catch (exception) {
            cb(exception);
        }

    }

    static registerUser = async (username, password) => {
        const saltHash = UserHelpers.genPassword(password);

        const salt = saltHash.salt;
        const hash = saltHash.hash;

        let user = await DataStore.createUser(username, hash, salt);
        return user;
    }


}

export default UserHelpers;