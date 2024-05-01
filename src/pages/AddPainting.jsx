import React from 'react';
import {useState, useEffect} from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import ImageComponent from '../components/ImageComponent.jsx';
//firebase
import { useLogout } from '../hooks/useLogout.js';
import { db, auth, storage } from '../firebase.js';
import { addDoc, collection, deleteDoc, updateDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid'
//image processing
import { encode } from "blurhash";
import { srcToWebP } from 'webp-converter-browser';
//icons & images
import CloseIcon from '../assets/icons/closeonlyx-icon-18-black.svg';
import PlaceholderImage from '../assets/photos/Placeholder01.png';
import PlaceholderImage3 from '../assets/photos/Placeholder03.png';

export default function AddPaintingPage() {
    //image data saved to database
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    //actual image saved to storage
    const [imageUpload, setImageUpload] = useState(null);
    //whole current collection
    const [paintings, setPaintings] = useState([]);
    //alerts
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState('');
    //image to enlarge
    const [paintingToEnlarge, setPaintingToEnlarge]     = useState(null);
    const [cat01_Abstrakcje, setCat01_Abstrakcje]       = useState([]);
    const [cat02_Krajobrazy, setCat02_Krajobrazy]       = useState([]);
    const [cat03_MartwaNatura, setCat03_MartwaNatura]   = useState([]);
    const [cat04_Zwierzeta, setCat04_Zwierzeta]         = useState([]);
    const [cat05_Inne, setCat05_Inne]                   = useState([]);


    // --- FIREBASE
    //referencing the collection
    const colRef = collection(db, 'paintings')
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
                return(<div className="relative" onClick = { ()=>{popupImage(el.id, el.Link, el.Category, el.Description)} }>
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

    const handleDelete = async (id) => {
        const docToDelete = doc(db, 'paintings', id);
        await deleteDoc(docToDelete);
        setMessage('Obraz został usunięty.');
    }
    const handleEdit = async (e, id) => {
        e.preventDefault();
        const docToEdit = doc(db, 'paintings', id);
        if (!category) {
            setMessage('Wybierz kategorię.')
        }
        if (!description) {
            setMessage('Dodaj opis.')
        }
        await updateDoc(docToEdit, {
            Category: category,
            Description: description
        })
        setSuccess('Zmiany zostały zapisane.');
        setCategory('');
        setDescription('');
    }

    //PlaceholderImages
    // const fakeList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    // const paintingsElements = fakeList.map((el) => (
    //     <div className="relative" onClick = { ()=>{popupImage(PlaceholderImage3)} }>
    //         <ImageComponent key={el} src={PlaceholderImage} blurhash='U7G$[ou%^n2=7%7Ms;fl=M+lEIg6^Z[f9@OX' loading="lazy" alt="Placeholder image" />
    //     </div>
    // ))

    //real images
    // const paintingsElements = paintings.map((el) => (
    //     <div className="relative" onClick = { ()=>{popupImage(el.Link, el.id, el.Category, el.Description)} }>
    //         <ImageComponent key={el.id} src={el.Link} alt={el.Category + 'image'} blurhash={el.Blurhash} />
    //     </div>
    // ))

    //function of enlarging image/making it popup
    function popupImage(id, link, category, description) {
        setPaintingToEnlarge({id: id, link: link, category: category, description: description});
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


    //logging out 
    //authcontext
    const { logout } = useLogout();
    const handleLogout = () => {
        //firebase
        signOut(auth)
        .then(() => {
            //auth context
            logout();
        })
        .catch((error) => {
            console.log(error.message)
        })
    }

    //UPLOADING IMAGE
    //creating the image hash
    const loadImage = async src => 
        new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = (...args) => reject(args);
            //img.crossOrigin = "Anonymous";
            img.src = src;
        });
    // const loadImage = (src) => {
    //     const img =  document.createElement("img");
    //     let actualURL = src.slice(5)
    //     img.src = actualURL
    //     console.log(img.src[1])
    //     return img
    //   }
    // const loadImage = (src) => {
    //     const img = React.createElement("img", {
    //         src:src.slice(5),
    //      }, null);
    //      window.addEventListener('DOMContentLoaded', () => {
    //         document.getElementById('image-display-grid').appendChild(img)
    //      })
         
    //      return (img)
    // }
        
    const getImageData = image => {
        if(image.width) {
            const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0);
        return context.getImageData(0, 0, image.width, image.height);
        } else {
            console.log('There was a problem with getting image data')
        }
    };

    //this function is split up in pieces in function below
    // const encodeImageToBlurhash = async imageUrl => {
    //     const image = await loadImage(imageUrl);
    //     console.log('image created: ', image)
    //     const imageData = getImageData(image);
    //     console.log('imageData created: ', imageData)
    //     return encode(imageData.data, imageData.width, imageData.height, 4, 4);
    // };

    


    //adding images
    const handleUpload = async (e) => {
        e.preventDefault();
        //checking all fields
        if (imageUpload === null) {
            setMessage('Wybierz obraz z dysku.');
            return
        }
        if (category === '') {
            setMessage('Wybierz kategorię.');
            return
        } 
        //image ref
        const imageName = v4()
        const imageRef = ref(storage, `images/${imageName}`);

        //tempURL needed for webp & blurhash
        //console.log(imageUpload)
        const tempURL = URL.createObjectURL(imageUpload);
        //console.log('TempURL: ', tempURL)

        //getting image size for webp/size conversion
        const loadedImage = await loadImage(tempURL);
        //console.log('Loaded image: ', loadedImage);
        const loadedImageData = getImageData(loadedImage);
        const actualHeight = loadedImageData.height;
        const actualWidth = loadedImageData.width;
        let desiredHeight = '';
        let desiredWidth = '';
        if (actualHeight > actualWidth) {
            desiredHeight = 800
            const ratio =  desiredHeight / actualHeight
            desiredWidth = Math.round(actualWidth * ratio)
        } else if (actualHeight < actualWidth){
            desiredWidth = 800
            const ratio =  desiredWidth / actualWidth
            desiredHeight = Math.round(actualHeight * ratio)
        } else {
            desiredHeight = 800
            desiredWidth = 800
        }
        //console.log('Actual dimensions: ', actualHeight, actualWidth)
        //console.log('Desired image dimensions: ', desiredHeight, desiredWidth)

        //convert upload to webp
        const webpBlob = await srcToWebP(tempURL, {desiredHeight, desiredWidth})
        //console.log('Webp created: ', webpBlob)

        //uploading to Firebase storage
        await uploadBytes(imageRef, webpBlob);
        //await uploadBytes(imageRef, imageUpload);

        //getting URL
        const url = await getDownloadURL(ref(storage, imageRef));
        //console.log('Download URL created: ', url)

        //getting Blurhash
        //instead of using the encodeImageToBlurhush function I will just use encode,
        //as we already have used loadImage and getImageData to get image dimensions 
        //const createdBlurhash = await encodeImageToBlurhash(tempURL)
        const createdBlurhash = encode(loadedImageData.data, loadedImageData.width, loadedImageData.height, 4, 4);
        //console.log('Blurhash optimized image version created: ', createdBlurhash)

        //creating a doc in the database to add description/category
        await addDoc(colRef, {Blurhash: createdBlurhash, Category: category, Description: description, Link: url})

        setSuccess('Obraz został dodany.');
        //cleaning states
        setCategory('');
        setDescription('');
        setImageUpload(null);
        
    }
    

    return (
        <div className="section add-painting">
            <div className="row">
                <div className="half outline">
                    <h1>Panel edycji strony</h1>
                    <p>Jesteś zalogowana jako Właścicielka Strony.</p>
                    <p>
                        To jest prywatna część strony. Jeśli nie jesteś jej właścicielem, proszę wróć na 
                        <Link to="/" className="link underlined"> stronę główną.</Link>
                    </p>
                    <p>Użyj menu po prawej aby dodać nowy obraz.</p>
                    <p>Wybierz poszczególny obraz z menu poniżej aby go usunąć lub edytować.</p>
                    <button className="regular-button" onClick={ () => handleLogout() }>Wyloguj</button>
                </div>
                <div className="half outline">
                    <h2>Dodaj nowy obraz</h2>
                    {message && <div className="message">
                        <p>{message}</p>
                    </div>}
                    {success && <div className="success">
                        <p>{success}</p>
                    </div>}
                    <form className="add-painting-form" onSubmit = { handleUpload }>
                        <label className="add-painting-label">Kategoria:</label>
                        <select
                            className="add-painting-input" 
                            name="category" 
                            value={category}
                            onChange = { (e) => setCategory(e.target.value) }
                            >
                            <option value="">Wybierz kategorie:</option>
                            <option value="Abstrakcje">Abstrakcje</option>
                            <option value="Krajobrazy">Krajobrazy</option>
                            <option value="MartwaNatura">Martwa natura</option>
                            <option value="Zwierzeta">Zwierzęta</option>
                            <option value="Inne">Inne</option>
                        </select>

                        <label className="add-painting-label">Opis:</label>
                        <input 
                            className="add-painting-input" 
                            type="text" 
                            name="description"
                            value={description}
                            onChange = { (e) => setDescription(e.target.value) }/>
                        <label className="add-painting-label">Obraz:</label>
                        <input 
                            className="add-painting-input" 
                            type="file" 
                            name="file" 
                            onChange = { (e) => setImageUpload(e.target.files[0]) }
                            />
                        
                        <input type="submit" className="regular-button" value="Dodaj obraz" />
                    </form>
                </div>
            </div>

            <div className="full-row">
                <h2>Dodane obrazy:</h2>
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
            </div>

            {paintingToEnlarge && <div className="image-popup-div">
                <img src={ CloseIcon } className="icon close-icon" alt="Closing icon" onClick = { closeImage } />
                <div className="editing-image-menu">
                    <img src={ paintingToEnlarge.link } className="image-popup" alt="Enlarged chosen image popup"/>
                    <div className="half outline">
                        <h2>Edycja obrazu</h2>
                        {message && <div className="message">
                            <p>{message}</p>
                        </div>}
                        {success && <div className="success">
                            <p>{success}</p>
                        </div>}
                        <form className="add-painting-form" onSubmit = { (e) => { handleEdit(e, paintingToEnlarge.id) } }>
                            <label className="add-painting-label">Kategoria:</label>
                            <select
                                className="add-painting-input" 
                                name="category"
                                placeholder = {paintingToEnlarge.category}
                                value={category}
                                onChange = { (e) => setCategory(e.target.value) }
                                >
                                <option value="">Wybierz kategorie:</option>
                                <option value="Abstrakcje">Abstrakcje</option>
                                <option value="Krajobrazy">Krajobrazy</option>
                                <option value="MartwaNatura">Martwa natura</option>
                                <option value="Zwierzeta">Zwierzęta</option>
                                <option value="Inne">Inne</option>
                            </select>

                            <label className="add-painting-label">Opis:</label>
                            <input 
                                className="add-painting-input" 
                                type="text" 
                                name="description"
                                placeholder= {paintingToEnlarge.description}
                                value={description}
                                onChange = { (e) => setDescription(e.target.value) }/>
                            
                            
                            <input type="submit" className="regular-button" value="Zapisz zmiany" />
                        </form>
                        <button className="regular-button" onClick = { ()=> {handleDelete(paintingToEnlarge.id)} }>Usuń obraz</button>
                    </div>
                </div>
            </div>}
        </div>
    )
}

