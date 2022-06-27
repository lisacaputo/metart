const button = document.querySelector('button')
const input = document.querySelector('input')
const artworkInfo = document.getElementById('artwork-info')
const artistInfo = document.getElementById('artist-info')

const getObjectID = async () => {
    let objectID = input.value
    //string interpolation being used, below is an endpoint (the url)
    let response = await axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}
        `
    )

    //*** Artist Info ***/
    let artistName = response.data.artistDisplayName
    let artistNationality = response.data.artistNationality

    //*** Artwork Info ***/
    let title = response.data.title
    let image = response.data.primaryImage
    //Year, a span of years, or a phrase that describes the specific or approximate date when an artwork was designed or created
    let objectDate = response.data.objectDate
    //Refers to the materials that were used to create the artwork
    let medium = response.data.medium
    //location of artwork in the Met
    let gallery = response.data.GalleryNumber
    let publicDomain = response.data.isPublicDomain
    
    if(publicDomain === true) {
        //filling out the artwork information
        artworkInfo.innerHTML =`<h2>Artwork Information</h2>
                            <span><strong>Title: </strong>${title}</span><br />
                            <img src=${image} alt="artwork" /><br />
                            <span><strong>Artwork Date: </strong>${objectDate}</span><br />
                            <span><strong>Medium: </strong>${medium}</span><br />
                            <span><strong>Gallery Location: </strong>${gallery}</span>`
        
        //filling out the artist information
        artistInfo.innerHTML = `<h2>Artist Information</h2>
                                <span><strong>Artist: </strong>${artistName}</span><br />
                                <span><strong>Nationality: </strong>${artistNationality}</span>`

    } else {
        alert(`Sorry, ${objectID} is not public domain. Please enter a different number.`)
    }
    
 
    console.log(response)
}

button.addEventListener('click', getObjectID)

//Keep using 459201 as the objectID for testing purposes