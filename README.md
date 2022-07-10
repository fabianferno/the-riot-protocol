### OVERVIEW OF THE PROJECT

The rIOT platform is blockchain enabled decentralized IoT gateway that aims to utilize the blockchain technology to register and validate the legitimacy of the connected devices in a smart infrastructure also providing means to store data on a decentralized storage medium that can solve the data, security and the communication problems of “Internet of Things”. Devices connected to the platform are verified based on their firmware, owner details, manufacturer metadata and a device identifier. This merkle hash is used to call a smart contract on a blockchain to check if the device was already minted (registered) on the platform. The project consists of three layers - a front end dApp, a device firmware and a smart contract that is deployed on the blockchain network, “Polygon”. The decentralized data storage is provided by IPFS.

Blockchain encryption makes it virtually impossible for anyone to overwrite existing data records. And using blockchain to store IoT data adds another layer of security to prevent malicious attackers from gaining access to the network. The rIOT gateway platform used the cryptographic hashes - one of the important characteristics of blockchain to leverage security in the IOT devices. Simply, a device is first minted (registered) on the blockchain similar to the NFTs on their smart contract. The mint occurs by creating the rIOT hash based on firmware, metadata, owner address and the device identifier.  The next time the device tries to authenticate using the rIOT platform, this rIOT hash is compared with the on-chain data and allows further access to the IPFS API to transact the sensor data. The admin can use the front end dApp to mint, view devices and look at the sensor data collected by the rIOT platform. This is done completely decentralized from end to end, meaning there’s no single point of failure and hence byzantine fault tolerance is achieved. 

![image](https://user-images.githubusercontent.com/57835412/178139777-7d51df8c-809f-4d89-8eee-444f69a0abc4.png)

![image](https://user-images.githubusercontent.com/57835412/178139787-21338a13-68c8-4ef1-8cbc-eaac0c848e5b.png)

![image](https://user-images.githubusercontent.com/57835412/178139794-847a185f-eb73-4937-9fbb-ccd5268fb1c6.png)

![image](https://user-images.githubusercontent.com/57835412/178139801-3c7e6f4c-7ec9-4ce4-8618-34daecf920c1.png)

![image](https://user-images.githubusercontent.com/57835412/178139823-b78831b2-2963-417f-be66-674d1f0cbbd4.png)
