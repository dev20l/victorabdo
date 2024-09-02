async function extractLinksFromMultipleUrls(urls) {
    try {
        const responses = await Promise.all(urls.map(url =>
            fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent(url))
        ));
        
        const texts = await Promise.all(responses.map(response => {
            if (!response.ok) throw new Error('Failed to fetch from ' + response.url);
            return response.text();
        }));

        const allLinks = texts.flatMap(text => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const links = doc.querySelectorAll('a');
            return Array.from(links).map(link => {
                if (link.href.startsWith('https://static.moonactive.net/static/coinmaster/reward/reward2.html?') ||
                    link.href.startsWith('https://rewards.coinmaster.com/rewards/rewards.html?')) {
                    return { url: link.href, title: link.textContent.trim() || 'Unknown', isNew: true };
                }
                return null;
            }).filter(link => link !== null);
        });

        displayLinks(allLinks.slice(0, 8));
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function displayLinks(links) {
    const container = document.getElementById('linksContainer');
    container.innerHTML = '';
    
    if (links.length === 0) {
        container.innerHTML = 'Oops! Looks like we're a bit overwhelmed with traffic right now. Hang tight and give it another shot in a bit. We're on it!';
        return;
    }

    const fragment = document.createDocumentFragment();
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
        fragment.appendChild(linkDiv);
    });

    container.appendChild(fragment);
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
