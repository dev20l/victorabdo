async function extractLinksFromMultipleUrls(urls) {
    const allLinks = [];
    for (const url of urls) {
        try {
            const response = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent(url));
            if (response.ok) {
                const text = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, 'text/html');
                const links = doc.querySelectorAll('a');
                links.forEach(link => {
                    if (link.href.startsWith('https://mply.io/')) {
                        allLinks.push({ url: link.href, title: link.textContent.trim() || 'Unknown', isNew: true });
                    }
                });
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
    displayLinks(allLinks.slice(0, 2));
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
        image.src = 'https://i.imgur.com/hMAhlhY.png';
        image.alt = 'Link Image';

        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.title;
        a.target = '_blank';

        if (link.isNew) {
            const newSpan = document.createElement('span');
            newSpan.textContent = ' new  ';
            newSpan.style.color = 'Red';
            newSpan.style.fontWeight = 'normal';
            newSpan.style.pointerEvents = 'none';  
            a.appendChild(newSpan);
        }

        linkDiv.appendChild(image);
        linkDiv.appendChild(a);
        container.appendChild(linkDiv);
    });

    container.style.display = 'block';
}

window.addEventListener('DOMContentLoaded', () => {
    const urls = ['https://www.vg247.com/monopoly-go-dice-links'];
    extractLinksFromMultipleUrls(urls);
});
