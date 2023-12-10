import {
    collection,
    getDocs,
    query,
    where
} from 'firebase/firestore';

import { db, auth } from './src/js/utils/firebase.js';
import Auth from './src/js/network/auth.js';

async function getAll() {
    await Auth.login({
        email: 'silence19ltor@gmail.com',
        password: 'FirebaseJTL3#19'
    });

    const ref = collection(db, 'transactions');

    const transactionsQuery = query(ref, where("userId", "==", auth.currentUser.uid));

    const transactions = await getDocs(transactionsQuery);

    // console.log(transactions);

    transactions.forEach((item) => {
        console.log({
            id: item.id,
            ...item.data()
        });
    });
}

getAll();