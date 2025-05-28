const { NFTStorage, File } = require('nft.storage');
require('dotenv').config();
const fs = require('fs');

const apiKey = process.env.NFT_STORAGE_API_KEY;
const client = new NFTStorage({ token: apiKey });

async function uploadReportCard(studentName, studentId, subjects) {
  const metadata = {
    name: `${studentName} - Report Card`,
    description: `Blockchain-verified report card for ${studentName}`,
    studentId: studentId,
    attributes: Object.entries(subjects).map(([subject, grade]) => ({
      trait_type: subject,
      value: grade
    }))
  };

  const metadataFile = new File([JSON.stringify(metadata)], "metadata.json", {
    type: "application/json"
  });

  const cid = await client.storeBlob(metadataFile);
  console.log(`IPFS CID: ${cid}`);
  return `ipfs://${cid}`;
}

// Example usage
uploadReportCard("John Doe", "ST123456", { Math: "A", Science: "B+" });