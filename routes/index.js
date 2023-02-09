const express = require('express');

const router = express.Router();
const { generateWallet } = require('../utils/walletGen');
const {
  mintNFT,
  updateMetadata,
  sendEther,
  transferNFT,
  getBalance
} = require('../utils/nftHelp');

const mint = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    mintNFT(id).then(() => res.status(200).json({ result: 'Success' }));
  } catch (error) {
    res.status(500).json({ result: 'Server error', msg: error });
  }
};

const handleUpdateMetadata = (req, res) => {
  try {
    const { tokenId, metadata } = req.body;
    updateMetadata(tokenId, metadata).then(() => res.status(200).json({ result: 'Metadata update success' }));
  } catch (error) {
    res.status(500).json({ result: 'Server error', msg: error });
  }
};

const handletransferNFT = (req, res) => {
  try {
    const { tokenId, recipient } = req.body;
    transferNFT(tokenId, recipient).then(() => res.status(200).json({ result: 'Transfer NFT success' }));
  } catch (error) {
    res.status(500).json({ result: 'Server error', msg: error });
  }
};

const handleSendEther = (req, res) => {
  try {
    const { recipient, amount } = req.body;
    sendEther(recipient, amount).then(() => res.status(200).json({ result: 'Transfer NFT success' }));
  } catch (error) {
    res.status(500).json({ result: 'Server error', msg: error });
  }
};

router.get('/createWallet', generateWallet);
router.post('/mint/:id', mint);
router.post('/updateMetadata', handleUpdateMetadata);
router.post('/sendEther', handleSendEther);
router.post('/transferNFT', handletransferNFT);
router.get('/balance/:address', getBalance);

module.exports = router;