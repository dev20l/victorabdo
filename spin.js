  async function extractLinksFromMultipleUrls(urls) {
        const allLinks = [];
        for (const url of urls) {
            try {
                const response = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent(url));
                if (!response.ok) {
                    throw new Error('Failed to fetch from ' + url);
                }
                const text = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, 'text/html');
                const links = doc.querySelectorAll('a');
                links.forEach(link => {
                    if (link.href.startsWith('https://static.moonactive.net/static/coinmaster/reward/reward2.html?') ||
                        link.href.startsWith('https://rewards.coinmaster.com/rewards/rewards.html?')) {
                        const cleanLink = link.href;
                        const linkText = link.textContent.trim() || 'Unknown';
                        allLinks.push({ url: cleanLink, title: linkText, isNew: true }); 
                    }
                });
            } catch (error) {
                console.error('Error:', error.message);
            }
        }
        displayLinks(allLinks.slice(0, 8)); 
    }

    function displayLinks(links) {
        const container = document.getElementById('linksContainer');
        container.innerHTML = '';
        if (links.length === 0) {
            container.innerHTML = 'No links found.';
            return;
        }
        links.forEach(link => {
            const linkDiv = document.createElement('div');
            linkDiv.className = 'link-item';

            const image = document.createElement('img');
            image.src = 'https://i.imgur.com/YdXrFxR.png';
            image.alt = 'Link Image';

            const a = document.createElement('a');
            a.href = link.url;
            a.textContent = link.title;
            a.target = '_blank';

            if (link.isNew) {
                const newSpan = document.createElement('span');
                newSpan.textContent = ' ✔️ ';
                newSpan.style.color = 'red'; 
                newSpan.style.fontWeight = 'normal'; 
                a.appendChild(newSpan); 
            }

            linkDiv.appendChild(image);
            linkDiv.appendChild(a);
            container.appendChild(linkDiv);
        });

        container.style.display = 'block';
    }

    document.getElementById('victorabdo').addEventListener('click', () => {
        const urls = [
            'https://www.vg247.com/coin-master-free-spins-links',
        ];
        extractLinksFromMultipleUrls(urls);
    });

    window.addEventListener('load', () => {
        const linksContainer = document.getElementById('linksContainer');
        linksContainer.style.display = 'block';
    });
