# THE RIOT PROTOCOL: A Decentralized IOT Security Gateway
----

### The Problem
IoT is facing identity, security, and interoperability problems. Current systems rely on a centralized client-server model that will soon be unsatisfactory due to the rapid increase in the number of devices connected to the Internet. 

Networks are highly prone to trojan devices that piggyback into the so-called smart devices and steal sensitive data and hack into our lives. This is more cynical when it comes to industrial automation, where high-volume sensor data can easily get into the wrong hands. 

A single protocol that ensures device authentication, authorization and manages the data layer is a much needed technology of the hour.

![image](https://github.com/fabianferno/the-riot-protocol/assets/57835412/9ce746af-ca05-4c0f-aa81-5a18afbd9a85)
### What is RioT?

The Internet of Things (IoT) has seen widespread adoption in recent years, connecting numerous devices to the internet. However, current IoT networks are vulnerable to various security threats such as data breaches, unauthorized access, and cyber-attacks. To address these security challenges, we propose the Riot protocol - a comprehensive solution for securing IoT networks by providing device authentication, data encryption, decentralized key generation, scalability, and more with cryptographic wallet-based authentication. This protocol ensures the confidentiality, integrity, and authenticity of the data exchanged between IoT devices (publishers) or users (subscribers). The Riot protocol aims to provide a secure and reliable communication between devices, offering an extensive solution to the challenges of IoT security using blockchain technology.
The Riot protocol provides robust device authentication and data encryption mechanisms to secure the communication between IoT devices and users.
With decentralized key generation, the Riot protocol ensures that cryptographic keys are generated securely and distributed in a decentralized manner.

#### Authentication & Encryption:
The Riot protocol provides robust device authentication and data encryption mechanisms to secure the communication between IoT devices and users.

<img width="1165" alt="image" src="https://github.com/fabianferno/the-riot-protocol/assets/57835412/ad3f5a73-a174-42ef-b16d-2cfaa0dc2aae">

#### Decentralized Key Generation
With decentralized key generation, the Riot protocol ensures that cryptographic keys are generated securely and distributed in a decentralized manner.

<img width="846" alt="image" src="https://github.com/fabianferno/the-riot-protocol/assets/57835412/8cfaab71-e557-40e4-ba90-ee998e2c4ea8">


## Technical Implementation
The platform has a cross-chain infrastructure that lets you secure devices on two of the most scalable chains available right now: One on PolygonzkEVM and the other on PolygonPOS.

![riot.png](https://cdn.dorahacks.io/static/files/18882dd509e340dc09710b24a4e9b6be.png)

#### Modules

- Blockchain Smart Contract:
    The Blockchain Smart Contract module is responsible for managing the group membership, verifying device identities, and storing device keys. The module uses Ethereum smart contracts to enforce the rules and regulations of the protocol. When a new device is registered in the system, the smart contract verifies its identity and adds it to the group. The device keys are also stored in the smart contract, making them easily accessible to other devices in the group. 

- Device firmware module:
    The Device Firmware Module is responsible for managing the firmware of each device in the Riot protocol. It ensures that all devices are running the latest firmware and are compatible with the other devices in the group. The module uses Over-the-Air (OTA) updates to remotely update the firmware of devices in the group. It also checks the integrity of the firmware by comparing its hash with the hash stored in the blockchain network.

- Key Distribution Module:
    The Key Distribution Module in the Riot protocol is responsible for generating and distributing unique device keys to authorized devices. The keys are used to encrypt and decrypt messages sent between devices in a group. The module uses a combination of group salt, session salt, and other token ingredients to create a Merkle hash, which is used to generate a unique key for each device. These keys are then securely distributed to each device in the group using the blockchain network.

- Device Registration Module:
    The Device Registration Module is responsible for registering new devices in the Riot protocol. It verifies the identity of the device by checking its firmware hash and device subscriber address. Once the identity is verified, the module generates a unique device ID and adds the device to the blockchain network. The module also generates a unique device key for the device using the Key Distribution Module.

- Encryption/Decryption Module:
    The encryption/decryption module is responsible for securing the IoT sensor data before it is stored in the data storage microservice. Fernet symmetric encryption is used for encryption, which provides a high level of security and speed.

### Screenshots
<img width="1046" alt="image" src="https://github.com/fabianferno/the-riot-protocol/assets/57835412/19bdd684-aafb-4265-b848-625aae86afde">
<img width="1017" alt="image" src="https://github.com/fabianferno/the-riot-protocol/assets/57835412/adb93969-8bd8-4b49-bb12-3a9ace393a02">
<img width="1034" alt="image" src="https://github.com/fabianferno/the-riot-protocol/assets/57835412/41755028-cbd6-4b66-ad7f-221a6ffb917a">
<img width="824" alt="image" src="https://github.com/fabianferno/the-riot-protocol/assets/57835412/707812cb-cbce-4775-aaa4-bcaae39c7621">
<img width="938" alt="image" src="https://github.com/fabianferno/the-riot-protocol/assets/57835412/6493af00-4392-4981-b25a-6f75bfef1b3a">
<img width="881" alt="image" src="https://github.com/fabianferno/the-riot-protocol/assets/57835412/8cd72e2e-0a7c-4a1d-9b4e-27acfbf8234b">


### Tracks applied
- Application Layer Track
- Tooling & Public Goods Track 
- zkEVM Tooling Track
- Specific Problem Statements Track: (Open Track)
- Newman Capital
- Luniverse (Luniverse NOVA's multichain API)


#### BUIDLERS
- @fabianferno
- @gabrielaxyeth
