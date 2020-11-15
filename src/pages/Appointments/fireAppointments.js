import firebase from '../../firebase/config';

export const saveAppointments = async (list) => {
    const batch = firebase.firestore().batch();
    const appointRef = firebase.firestore().collection('shorts').doc('appointments');

    list.map(time => {
        return batch.update(appointRef, {
            [time.unixTime] : {
                appointmentTime: time.appointmentTime,
                date: time.date,
                time: time.time,
                unixTime: time.unixTime
            }
        })
    });

    await batch.commit().then(() => console.log("Times updated")).catch(err => console.log(err));
}

export const removeAppointments = async (removeList) => {
    const batch = firebase.firestore().batch();
    const appointRef = firebase.firestore().collection('shorts').doc('appointments');

    removeList.map(time => {
        return batch.update(appointRef, {
            [time]: firebase.firestore.FieldValue.delete()
        })
    })

    await batch.commit().then(() => console.log("Times deleted")).catch(err => console.log(err));
}