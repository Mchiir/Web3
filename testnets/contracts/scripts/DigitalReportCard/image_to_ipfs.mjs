import { NFTStorage, File } from 'nft.storage';
import mime from 'mime';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const NFT_STORAGE_KEY = process.env.NFT_STORAGE_API_KEY;

async function storeNFTs(imagesPath) {
  const fullImagesPath = path.resolve(imagesPath);
  const files = fs.readdirSync(fullImagesPath).filter(file =>
    /\.(png|jpg|jpeg)$/i.test(file)
  );

  let responses = [];

  for (const fileName of files) {
    const image = await fileFromPath(`${fullImagesPath}/${fileName}`);
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });
    const name = fileName.replace(path.extname(fileName), "");
    const response = await nftstorage.store({
      image,
      name,
      description: `An adorable ${name}`,
    });
    responses.push(response);
  }

  return responses;
}

async function fileFromPath(filePath) {
  const content = await fs.promises.readFile(filePath);
  const type = mime.getType(filePath);
  return new File([content], path.basename(filePath), { type });
}

const imagesFolderPath = './';

storeNFTs(imagesFolderPath)
  .then((responses) => {
    console.log("\Uploaded Files:");
    responses.forEach((res, i) => {
      console.log(`Image ${i + 1}:`);
      console.log(`- Metadata URL: https://ipfs.io/ipfs/${res.ipnft}/metadata.json`);
      console.log(`- Image URL: ${res.data.image.href}`);
    });
  })
  .catch((err) => {
    console.error("Upload failed:", err);
  });