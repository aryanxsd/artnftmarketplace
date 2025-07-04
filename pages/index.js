import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Web3Modal from "web3modal";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Marketplace from "../artifacts/contracts/Marketplace.sol/Marketplace.json";

const nftAddress = "<DEPLOYED_NFT_CONTRACT_ADDRESS>";
const marketplaceAddress = "<DEPLOYED_MARKETPLACE_CONTRACT_ADDRESS>";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function Home() {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({ name: "", description: "", price: "" });

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function createNFT() {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return;
    const data = JSON.stringify({ name, description, image: fileUrl });

    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      createSale(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(nftAddress, NFT.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();

    const price = ethers.utils.parseUnits(formInput.price, "ether");

    contract = new ethers.Contract(marketplaceAddress, Marketplace.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await contract.createMarketItem(nftAddress, tokenId, price, { value: listingPrice });
    await transaction.wait();
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Mint Your Art NFT</h1>
      <input
        placeholder="NFT Name"
        className="border p-2 mb-2 w-full rounded"
        onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
      />
      <textarea
        placeholder="NFT Description"
        className="border p-2 mb-2 w-full rounded"
        onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
      />
      <input
        placeholder="Price in MATIC"
        className="border p-2 mb-2 w-full rounded"
        onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
      />
      <input type="file" name="Asset" className="my-4" onChange={onChange} />
      {fileUrl && <img className="rounded mt-4" width="350" src={fileUrl} />}
      <button onClick={createNFT} className="bg-blue-600 text-white px-6 py-2 rounded mt-4">
        Mint and List NFT
      </button>
    </div>
  );
}
