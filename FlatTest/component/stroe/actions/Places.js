
import { SET_PLACES, REMOVE_PLACE } from './ActionType';
///// start fom here 
import firebase from '../../firebase/config.js';
import thunk from 'redux-thunk';

// export const add_place = (placeName, email, image) => {
//     return dispatch => {

//         const placeData = {
//             name: placeName,
//             // location: location
//         };
//         // fetch('https://flattest-2ccf5.firebaseio.com/places.json', {
//         //     method : 'POST',
//         //     body : JSON.stringify(placeData),
//         // })

//         // .catch(err =>console.log (err))
//         // .then(res => res.json())
//         // .then(paredRes =>{
//         //     console.log(paredRes)
//         // });
//         firebase.database().ref('/places/').push({
//             name: placeName,
//             email:email
//         });

//     };

// };
export const add_place = (placeName, email,gender,selected, image) => {
    return dispatch => {

        const placeData = {
            name: placeName,
            // location: location
            image:image
        };

        // const str = firebase.storage().ref()

        // const ntr = str.child('image.jpg')
        // const mtr = ntr.child('images/image/jpg')
        // ntr.name === mtr.name            // true

        // ref.putString(image, 'base64').then(function(snapshot) {
        //     console.log('Uploaded a base64 string!');
        //     alert('bnnnnnnnnn')
        //   });
        // alert(JSON.stringify(placeData))
        // fetch(' https://us-central1-flattest-2ccf5.cloudfunctions.net/storeImage', {
        //     method : 'POST',
        //     body : JSON.stringify({
        //         placeData
        //     }),
        // })

        // .catch(err =>console.log (err))
        // .then(res =>         alert(JSON.stringify(res.json()))
        // )
        // .then(paredRes =>{
        //     console.log(paredRes)
            
        //     const n = firebase.database().ref('/places/').push({
        //             name: placeName,
        //             email:email,
        //             image:paredRes.imageUrl
        //         });
        // });n
        // return 
        firebase.database().ref('/places/').push({
            name: placeName,
            email:email,
            gender:gender,
            selected:selected
            // image:image.base64
        });

    };

};


// export const add_place = (placeName, location, image) => {
//     return {
//         type: ADD_PLACE,
//         placeName: placeName,
//         location : location,
//         image : image
//     };

// };

export const getPlaces = () => {
    return dispatch => {
        // fetch('https://flattest-2ccf5.firebaseio.com/places.json')
        // .catch(err => {
        //     alert("Something went wrong, sorry :/");
        //     console.log(err);
        // })
        // .then(res => res.json())
        // .then(parsedRes => {
        //     const places = [];
        //     for (let key in parsedRes) {
        //         places.push({
        //             ...parsedRes[key],
        //             key: key
        //         });
        //     }
        //     dispatch(setPlaces(places));
        // });


        firebase.database().ref(`/places`).on('value', snap => {

            let parsedRes = snap.val();

            // console.log(snap);
        //   alert(JSON.stringify(snap));
            

            const places = [];
            for (let key in parsedRes) {
                        places.push({
                            ...parsedRes[key],
                            image: {
                                uri: parsedRes[key].image
                            },
                            key: key
                        });
            
            };
            
            

            dispatch(setPlaces(places));
          
        })

        //     const places = [];
        //     firebase.database().ref(`/`).once('value', snap => {
        //         snap.forEach(data => {
        //             let task = data.val();
        //             places.push(task)
        //         })
        //     })
        //         .then(() => dispatch(setPlaces(places)))

        // }
        // firebase.database().ref(`/`).on('value', (snap) => {
        //     alert(JSON.stringify(snap));
        //     dispatch(setPlaces(snap.val()));
        // });
    }

};

    // export const getPlaces = () => {
    //     return dispatch => {

    //         // firebase.database().ref('/places').on('value', data => {
    //         //     if (data.val()) {
    //         //       dispatch({
    //         //         type: 'SET_PLACES',
    //         //         places: data.val() 
    //         //       });
    //         //     }
    //         //   });
    //         // firebase.database()
    //         //         .ref('places')
    //         //         .on('value', (snapshot) => {
    //         //             setTimeout(() => {
    //         //                 const messages = snapshot.val() || [];
    //         //                 dispatch(setPlaces(messages))
    //         //             }, 0);
    //         //         });
    //     }

    // };
    // const getData = () => {
    //     const userRef = firebase.database().ref('places/');
    //     return userRef;     
    // }
    export const setPlaces = places => {
        return {
            type: SET_PLACES,
            places: places
        };
    };

    // export const delet_place = (key) => {
    //     return {
    //         type: DELET_PLACE,
    //         placeKey: key

    //     };

    // }; 

    //endpoint that i make a request to it 
    ///https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=[API_KEY]

    export const deletePlace = (key) => {
        return dispatch => {
            dispatch(removePlace(key));
            // fetch("https://awesome-places-1511248766522.firebaseio.com/places/" + key + ".json", {
            //     method: "DELETE"
            // })
            //     .catch(err => {
            //         alert("Something went wrong, sorry :/");
            //         console.log(err);
            //     })
            //     .then(res => res.json())
            //     .then(parsedRes => {
            //         console.log("Done!");
            //     });
            firebase.database().ref('/places/').child(key).remove();
           
        };
    };

    export const removePlace = key => {
        return {
            type: REMOVE_PLACE,
            key: key
        };
    };

 // fetch('https://us-central1-exalted-booster-204014.cloudfunctions.net/imageStore', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         image: image.base64
        //     })

        // })
        //     .catch(err => {
        //         alert('somthing wrong')
        //         console.log('nnnnnnna'+err)})
        //     .then(res => res.json())
        //     .then(paredRes => {
        //         console.log(paredRes)

        //     });