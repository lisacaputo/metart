const button = document.querySelector('button')
const input = document.querySelector('input')
const artworkInfo = document.getElementById('artwork-info')
const artistInfo = document.getElementById('artist-info')

const getObjectID = async () => {
    const objectID = input.value
    let response
    //string interpolation being used, below is an endpoint (the url)
    try {
        response = await axios.get(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}
            `
        )
    } catch (error) {
        alert(`Sorry, ${objectID} is not a valid entry. Please enter a different number.`)
        return
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

    // if(objectDate === '') {
    //     objectDate.innerHTML = `n/a`
    // }

    //console.log(response.data);

    // response.data.objectDate = 'hello'
    // for (const property in response.data) {
    //     // console.log(property+' hello' + response.data[property] + 'hello');
    //     // if(response.data[property] === '') {
    //     //     response.data[property] === 'n/a'
    //     // }

    //     console.log(`${property}: ${response.data[property]}`);
    // }
    
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

//Keep using 459201, 343523 as the objectID for testing purposes