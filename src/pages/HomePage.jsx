import React, { useEffect, useState } from 'react';
import '../App.css';
import ImageComponent from '../components/ImageComponent.jsx';
import {db} from '../firebase.js'
import { collection, getDocs, query, where } from 'firebase/firestore';
// import PlaceholderImage from '../assets/photos/Placeholder01.png';
// import PlaceholderImage3 from '../assets/photos/Placeholder03.png';
import CloseIcon from '../assets/icons/closeonlyx-icon-18-black.svg';


export default function HomePage() {
    const [paintings, setPaintings]                     = useState([]);
    const [cat01_Abstrakcje, setCat01_Abstrakcje]       = useState([]);
    const [cat02_Krajobrazy, setCat02_Krajobrazy]       = useState([]);
    const [cat03_MartwaNatura, setCat03_MartwaNatura]   = useState([]);
    const [cat04_Zwierzeta, setCat04_Zwierzeta]         = useState([]);
    const [cat05_Inne, setCat05_Inne]                   = useState([]);
    const [paintingToEnlarge, setPaintingToEnlarge]     = useState(null);
    
    // --- FIREBASE
    //fetching docs
    async function getObcjectsFromCategory(colRef, category) {
        const paintings = query(colRef, where('Category', '==', category))
        //const paintings = colRef.where('Category', '==', category).get()
        if (paintings.empty) {
            console.log('No matching documents.');
            return;
        } else {
            const querySnapshot = await getDocs(paintings)
            const paintingObjects = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
            //console.log(paintingObjects)
            const paintingsElements = paintingObjects.map((el) => {
                return(<div className="relative" onClick = { ()=>{popupImage(el)} }>
                    <ImageComponent key={el.id} src={el.Link} alt={el.Category + 'image'} blurhash={el.Blurhash} />
                </div>)
            })
            return paintingsElements
        }
        
    }
    useEffect(()=>{
        const getData = async () => {
            console.log('Getting data')
             //referencing the collection
            const colRef = collection(db, 'paintings');
            const paintingsObjects = await getDocs(colRef)
            setPaintings(paintingsObjects.docs.map(doc => ({...doc.data(), id: doc.id}) ))
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
        getData()
    },[])

    // const { getData } = useGetPaintings();
    // useEffect(()=> {
    //     let categories = getData()
    //     setCat01_Abstrakcje(categories[0])
    //     setCat02_Krajobrazy(categories[1])
    //     setCat03_MartwaNatura(categories[2])
    //     setCat04_Zwierzeta(categories[3])
    //     setCat05_Inne(categories[4])
    // }, [])

    //trying it with hook
    // const  categories = useGetPaintings();
    // console.log(categories.cat01)

    

    //function of enlarging image/making it popup
    function popupImage(image) {
        //console.log('Popup')
        setPaintingToEnlarge(image);
    }
    function closeImage() {
        setPaintingToEnlarge(null);
    }
    //closing popup on escape key pressed
    useEffect(() => {
        function handleEscapeKey(event) {
          if (event.code === 'Escape') {
            setPaintingToEnlarge(null);
          }
        }
        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey)
      }, [])

    
    //PlaceholderImage
    // const fakeList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    // const paintingsElements = fakeList.map((el) => (
    //     <div onClick = { ()=>{popupImage(PlaceholderImage3)} }>
    //         <ImageComponent key={el} src={PlaceholderImage} blurhash='U7G$[ou%^n2=7%7Ms;fl=M+lEIg6^Z[f9@OX' loading="lazy" alt="Placeholder image" />
    //     </div>
    // ))

    //real images
    // const paintingsElements = paintings.map((el) => (
    //     <div className="relative" onClick = { ()=>{popupImage(el.Link)} }>
    //         <ImageComponent key={el.id} src={el.Link} alt={el.Category + 'image'} blurhash={el.Blurhash} />
    //     </div>
    // ))

    return (
        <div className="section home">
            {/* category 01 - Abstrakcje */}
            <div className="category">
                <h1 className="category-heading">Abstrakcje</h1>
                <div className="grid">
                    {cat01_Abstrakcje}
                </div>
            </div>
            {/* category 02 - Krajobrazy */}
            <div className="category">
                <h1 className="category-heading">Krajobrazy</h1>
                <div className="grid">
                    {cat02_Krajobrazy}
                </div>
            </div>
            {/* category 03 - Martwa Natura */}
            <div className="category">
                <h1 className="category-heading">Martwa Natura</h1>
                <div className="grid">
                    {cat03_MartwaNatura}
                </div>
            </div>
            {/* category 04 - Zwierzeta */}
            <div className="category">
                <h1 className="category-heading">Zwierzęta</h1>
                <div className="grid">
                    {cat04_Zwierzeta}
                </div>
            </div>
            {/* category 05 - Inne */}
            <div className="category">
                <h1 className="category-heading">Inne</h1>
                <div className="grid">
                    {cat05_Inne}
                </div>
            </div>
            
            {paintingToEnlarge && <div className="image-popup-div" onClick= {closeImage} >
                <img src={ CloseIcon } className="icon close-icon" alt="Closing icon" onClick = { closeImage } />
                <img src={paintingToEnlarge.Link} className="image-popup" alt="Enlarged chosen image popup"/>
                <p>{paintingToEnlarge.Description}</p>
            </div>}
        </div>
    )
}