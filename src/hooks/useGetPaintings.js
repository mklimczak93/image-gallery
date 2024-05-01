import React, { useEffect, useState } from 'react';
import ImageComponent from '../components/ImageComponent.jsx';
import {db} from '../firebase.js'
import { collection, getDocs, query, where } from 'firebase/firestore';


export const useGetPaintings = async () => {
    //categories states
    const [cat01_Abstrakcje, setCat01_Abstrakcje]       = useState([]);
    const [cat02_Krajobrazy, setCat02_Krajobrazy]       = useState([]);
    const [cat03_MartwaNatura, setCat03_MartwaNatura]   = useState([]);
    const [cat04_Zwierzeta, setCat04_Zwierzeta]         = useState([]);
    const [cat05_Inne, setCat05_Inne]                   = useState([]);
    const [paintingToEnlarge, setPaintingToEnlarge]     = useState(null);

    //functions for opening image closeup/closing it
    //function of enlarging image/making it popup
    function popupImage(image) {
        console.log('Popup')
        setPaintingToEnlarge(image);
    }

    //function to get paintings from given categories and map them to ImageComponent
    async function getObcjectsFromCategory(colRef, category) {
        const paintings = query(colRef, where('Category', '==', category))
        if (paintings.empty) {
            console.log('No matching documents.');
            return;
        } else {
            const querySnapshot = await getDocs(paintings)
            const paintingObjects = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
            const paintingsElements = paintingObjects.map((el) => {
                return(<div className="relative" onClick = { ()=>{popupImage(el.Link)} }>
                    <ImageComponent key={el.id} src={el.Link} alt={el.Category + 'image'} blurhash={el.Blurhash} />
                </div>)
            })
            return paintingsElements
        }    
    }
    //function getting paintings and asssigning them to right category
    useEffect(()=> {
        const getData = async () => {
            console.log('Getting data')
                //referencing the collection
            const colRef = collection(db, 'paintings');
            //categories
            const cat01 = await getObcjectsFromCategory(colRef, 'Abstrakcje')
            setCat01_Abstrakcje(cat01)
            const cat02 = await getObcjectsFromCategory(colRef, 'Krajobrazy')
            setCat02_Krajobrazy(cat02)
            const cat03 = await getObcjectsFromCategory(colRef, 'MartwaNatura')
            setCat03_MartwaNatura(cat03)
            const cat04 = await getObcjectsFromCategory(colRef, 'Zwierzeta')
            setCat04_Zwierzeta(cat04)
            const cat05 = await getObcjectsFromCategory(colRef, 'Inne')
            setCat05_Inne(cat05)
        }
        getData();
    }, [])


    console.log(cat01_Abstrakcje)


    return {
        cat01: cat01_Abstrakcje, 
        cat02: cat02_Krajobrazy, 
        cat03: cat03_MartwaNatura, 
        cat04: cat04_Zwierzeta, 
        cat05: cat05_Inne }
    //return { getData }
}