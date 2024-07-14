const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;

const uploadImage = async (image) => {
    // Log the cloud name for debugging
    console.log('Cloudinary Cloud Name:', process.env.REACT_APP_CLOUD_NAME_CLOUDINARY);

    // Convert image into form data
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "mern_product");

 
        const dataResponse = await fetch(url, {
            method: "post",
            body: formData
        });
        
        const result = await dataResponse.json();
        
       return result
        
    
}

export default uploadImage;
