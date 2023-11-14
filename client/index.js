const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");
const { argv } = require("process");

const serverUrl = "http://localhost:1225";

const merkleTree = new MerkleTree(niceList);

const root = merkleTree.getRoot();

// get the name via the first argument after command in this case npm run client "name"
const name = argv[2];

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  // proof is an array of 10 items
  const index = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof,
    name,
    root,
  });

  console.log({ gift });
}

main();

// proof length goes up by 1 every time the niceList.length is doubled
// console.log(proof);
// console.log(niceList.length);
