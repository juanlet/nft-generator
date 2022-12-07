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

  function setErrorMsg(msg) {
    const errorMsg = document.querySelector('.err-msg');
    errorMsg.textContent = msg;
  }
  
  async function generateNFTCollection(collectionDescription, imageSize, numberOfImages) {
    try {
      showSpinner();
      setErrorMsg('');
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
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        removeSpinner();
        throw new Error(data.error);
      }      
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
        setErrorMsg(error);
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