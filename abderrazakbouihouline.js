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
                    if (link.href.startsWith('https://mply.io/')) {
                        const cleanLink = link.href.split('?')[0]; // Remove query parameters
                        const linkText = link.textContent.trim() || 'Unknown'; // Use link text if available
                        allLinks.push({ url: cleanLink, title: linkText });
                    }
                });
            } catch (error) {
                console.error('Error:', error.message);
            }
        }
        displayLinks(allLinks);
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
            image.src = 'https://i.imgur.com/hMAhlhY.png'; // Use the provided image URL
            image.alt = 'Link Image'; // Alternative text for the image

            const title = document.createElement('span');
            const a = document.createElement('a');
            a.href = link.url;
            a.textContent = link.url;
            a.target = '_blank';

            linkDiv.appendChild(image);
            linkDiv.appendChild(title);
            linkDiv.appendChild(a);
            container.appendChild(linkDiv);
        });

        // Show the links container immediately
        container.style.display = 'block';
    }

    document.getElementById('extractButton').addEventListener('click', () => {
        const urls = [
            'https://monopolygo.wiki/latest-reward-links/',
        ];
        extractLinksFromMultipleUrls(urls);
    });

    window.addEventListener('load', () => {
        const linksContainer = document.getElementById('linksContainer');
        linksContainer.style.display = 'block';
    });
