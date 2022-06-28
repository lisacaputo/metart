const button = document.querySelector('button')
const input = document.querySelector('input')
const artworkInfo = document.getElementById('artwork-info')
const artistInfo = document.getElementById('artist-info')

const getObjectID = async () => {
    const objectID = input.value
    let response
    //checking if object ID is existent in the database
    //string interpolation being used, below is an endpoint (the url)
    try {
        response = await axios.get(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
        )
    } catch (error) {
        alert(`Sorry, ${objectID} is not a valid entry. Please enter a different serial number.`)
        return
    }

    // checking properties to be blank
    for (const property in response.data) {        
        if(response.data[property] === '') {
            response.data[property] = 'n/a'
        }
   }

    //*** Artist Info ***/
    const artistName = response.data.artistDisplayName
    const artistNationality = response.data.artistNationality

    //*** Artwork Info ***/
    const title = response.data.title
    const image = response.data.primaryImage
    //Year, a span of years, or a phrase that describes the specific or approximate date when an artwork was designed or created
    const objectDate = response.data.objectDate
    //Refers to the materials that were used to create the artwork
    const medium = response.data.medium
    //location of artwork in the Met
    const gallery = response.data.GalleryNumber
    const publicDomain = response.data.isPublicDomain
    
    //filling out the artwork information
    artworkInfo.innerHTML =`<h2>Artwork Information</h2>
                            <span><strong>Title: </strong>${title}</span>
                            <img id="artwork-info-img" src=${image} alt="artwork" />
                            <span><strong>Artwork Date: </strong>${objectDate}</span>
                            <span><strong>Medium: </strong>${medium}</span>
                            <span><strong>Gallery Location: </strong>${gallery}</span>`
        
    //filling out the artist information
    artistInfo.innerHTML = `<h2>Artist Information</h2>
                            <span><strong>Artist: </strong>${artistName}</span>
                            <span><strong>Nationality: </strong>${artistNationality}</span>`
    
    //If the public domain is not public, it will not display an image. Therefore, we let the user know the image of the artwork is not available
    const artworkInfoImg = document.getElementById('artwork-info-img')
    const privateDomainMsg = document.createElement('p')
    privateDomainMsg.innerText = 'This image is not public domain.'
    
    if(publicDomain === false) {
        artworkInfoImg.replaceWith(privateDomainMsg)
    }
    
    console.log(response)
}

button.addEventListener('click', getObjectID)

//Keep using 459201, 343523, 437133 (this one doesn't have an image that is public) as the objectID for testing purposes