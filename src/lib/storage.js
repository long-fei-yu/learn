import {AsyncStorage} from 'react-native';

const keys = {
    history: 'history',
};

async function save(key, value) {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log('AsyncStorage save error', error);
    }
}

async function load(key) {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
    } catch (error) {
        console.log('AsyncStorage load error', error);
    }
}


async function clear(keys) {
    try {
        await AsyncStorage.multiRemove(keys);
    } catch (error) {
        console.log('AsyncStorage clear error', error);
    }
}

export {keys, save, load, clear}