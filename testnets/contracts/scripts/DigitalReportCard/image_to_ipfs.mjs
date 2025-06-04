import { NFTStorage, File } from "nft.storage"
import mime from "mime"
import fs from "fs"
import path from "path"
import 'dotenv/config'

const NFT_STORAGE_KEY = process.env.NFT_STORAGE_API_KEY

/**
 * Reads an image file from `imagePath` and stores an NFT with the given name and description.
 * @param {string} imagePath the path to an image file
 * @param {string} name a name for the NFT
 * @param {string} description a text description for the NFT
 */
async function storeNFTs(imagesPath) {
    const fullImagesPath = path.resolve(imagesPath)
    const files = fs.readdirSync(fullImagesPath)
    let responses = []
    for (const file of files) {
        const image = await fileFromPath(`${fullImagesPath}/${file}`)
        const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });
        const dogName = file.replace(".png", "");
        const response = await nftstorage.store({
            image,
            name: dogName,
            description: `An adorable ${dogName}`,
        });
        responses.push(response);
    }

    //return responses;
}

/**
 * A helper to read a file from a location on disk and return a File object.
 * Note that this reads the entire file into memory and should not be used for
 * very large files.
 * @param {string} filePath the path to a file to store
 * @returns {File} a File object containing the file content
 */
async function fileFromPath(filePath) {
    const content = await fs.promises.readFile(filePath)
    const type = mime.getType(filePath)
    return new File([content], path.basename(filePath), { type })
}

try{
    storeNFTs('./scripts/DigitalReportCard/images')
} catch (err){
    console.err("Error with uploading image:", err)
}