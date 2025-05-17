        let web3;
        let connectedAccount = null;
        let currentChainId = null;

        async function connectWallet() {
            if (!window.ethereum) {
                alert("MetaMask is not installed! Please install it.");
                return;
            }

            web3 = new Web3(window.ethereum);
            try {
                // Request wallet connection
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                connectedAccount = accounts[0];
                document.getElementById("walletAddress").innerText = connectedAccount;
                
                alert("MetaMask connected successfully!");

                // Get network and balance
                await getNetwork();
                await getBalance(connectedAccount);

            } catch (error) {
                console.error("User denied MetaMask access:", error);
            }
        }

        async function getBalance(account) {
            try {
                const balance = await web3.eth.getBalance(account);
                document.getElementById("walletBalance").innerText = 
                    web3.utils.fromWei(balance, "ether") + " ETH";
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        }

        async function getNetwork() {
            try {
                currentChainId = await web3.eth.getChainId();
                let networkName = "Unknown";

                // Common Ethereum networks
                const networks = {
                    1: "Ethereum Mainnet",
                    5: "Goerli",
                    11155111: "Sepolia",
                    17000: "Holesky"
                };

                if (networks[currentChainId]) {
                    networkName = networks[currentChainId];
                }

                document.getElementById("selectedNetwork").innerText = `${networkName} (Chain ID: ${currentChainId})`;
            } catch (error) {
                console.error("Error getting network:", error);
            }
        }

        async function switchNetwork(chainId) {
            if (!connectedAccount) {
                alert("Please connect MetaMask before switching networks.");
                return;
            }

            if (chainId === currentChainId) {
                alert("You are already connected to this network.");
                return;
            }

            try {
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: chainId }], 
                });

                console.log("Switched to chain:", chainId);
                await getNetwork(); // Update displayed network
                
                // Update balance after switching networks
                await getBalance(connectedAccount);
                alert(`Successfully switched to Chain ${chainId}`);
            } catch (error) {
                console.error("Error switching network:", error);
            }
        }

        function handleNetworkSwitch() {
            const chainId = document.getElementById("chainIdInput").value.trim();

            if (!chainId.startsWith("0x")) {
                alert("Chain ID must be in hexadecimal format (e.g., 0xaa36a7 for Sepolia).");
                return;
            }

            switchNetwork(chainId);
            console.log(`Switching to Chain ${chainId})`);
        }

        // Listen for account changes (User reconnects or switches accounts)
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length === 0) {
                    alert("MetaMask disconnected. Please reconnect.");
                    document.getElementById("walletAddress").innerText = "-";
                    document.getElementById("walletBalance").innerText = "-";
                    connectedAccount = null;
                } else {
                    connectedAccount = accounts[0];
                    alert(`MetaMask account changed: ${connectedAccount}`);
                    document.getElementById("walletAddress").innerText = connectedAccount;
                    getBalance(connectedAccount);
                }
            });

            // Listen for network changes
            window.ethereum.on("chainChanged", async (chainId) => {
                console.log(`Network changed to ${chainId}`);
                await getNetwork();
                if (connectedAccount) {
                    await getBalance(connectedAccount);
                }
            });
        }