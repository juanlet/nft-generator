function onSubmit(e) {
    e.preventDefault();
  
    const collectionDescription = document.querySelector('#collection_description').value;
    const imageSize = document.querySelector('#image_size').value;
    const numberOfImages = document.querySelector('#number_of_images').value;

  
    if (collectionDescription === '') {
      alert('Please add some text');
      return;
    }
  
    generateNFTCollection(collectionDescription, imageSize, numberOfImages);
  }
  
  async function generateNFTCollection(collectionDescription, imageSize, numberOfImages) {
    try {
      showSpinner();
  
      const response = await fetch('/nft/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collectionDescription,
          imageSize,
          numberOfImages
        }),
      });
  
      if (!response.ok) {
        removeSpinner();
        throw new Error('That image could not be generated');
      }
  
      const data = await response.json();
      console.log(data);
      
      const generatedImages = data.data;
      const nftShowcase = document.querySelector('.nft-showcase');
      nftShowcase.innerHTML = '';
      generatedImages.forEach(image => {
        const imgContainer =  document.createElement('div');
        imgContainer.classList.add('image-container')
        const img = document.createElement('img');
        img.src = image.url;           
        imgContainer.appendChild(img);
        nftShowcase.appendChild(imgContainer);
      });

      removeSpinner();

    } catch (error) {
      
    }
  }
  
  function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
  }
  
  function removeSpinner() {
    console.log('removing spinner')
    document.querySelector('.spinner').classList.remove('show');
  }
  
  document.querySelector('#image-form').addEventListener('submit', onSubmit);