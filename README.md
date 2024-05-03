# Image Gallery App

https://agnieszkaklimczak.com/

A custom made website for a painter, with publicly open part serving as an image gallery and an owner-only-access dashboard to add/remove/edit paintings.
Application was created using React and Firebase (storage, database, auth).

The most interesting aspects:
- images added are automatically resized, converted to webp file format and saved to Firebase storage bucket. After that, a custom Blushash is created. The blurhash code, along with chosen category and added description and image url link are saved to Firebase database. When retriving the images with slow connection firstly a Blurhash version is being loaded, creating more pleasant experience for the end user. All images are being lazy loaded.
- the editing panel can be accessed only by the owner (using Firebase auth) - there the owner themselves can alter the website content.

## Images

![Main-page-01](https://github.com/mklimczak93/image-gallery/assets/123643355/fdfc94b7-1e1e-4815-9eb2-d59852f13839)

Main page - desktop view

![Main-page-02](https://github.com/mklimczak93/image-gallery/assets/123643355/c5f8c688-79fa-462a-adf2-22371636bf12)

Main page - tablet view

![Main-page-03](https://github.com/mklimczak93/image-gallery/assets/123643355/9fc18c48-6220-40e9-b8fe-973ea9bf33e1)

Main page - mobile view

![Add-01](https://github.com/mklimczak93/image-gallery/assets/123643355/c27bb937-c693-4f1c-9626-d6df08758836)

Editing dashboard - tablet view


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


