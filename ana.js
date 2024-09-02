async function extractLinksFromMultipleUrls(urls) {
    try {
        const responses = await Promise.all(urls.map(url =>
            fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent(url))
        ));
        
        const texts = await Promise.all(responses.map(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch from ' + response.url);
            }
            return response.text();
        }));

        const allLinks = texts.flatMap(text => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const links = doc.querySelectorAll('a');
            return Array.from(links)
                .filter(link => link.href.startsWith('https://mply.io/'))
                .map(link => {
                    const cleanLink = link.href.split('?')[0]; 
                    return { url: cleanLink };
                });
        });

        displayLinks(allLinks);
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
    links.forEach(link => {
        const linkDiv = document.createElement('div');
        linkDiv.className = 'link-item';

        const image = document.createElement('img');
        image.src = 'https://i.imgur.com/hMAhlhY.png'; 
        image.alt = 'Link Image'; 

        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.url;
        a.target = '_blank';

        linkDiv.appendChild(image);
        linkDiv.appendChild(a);
        container.appendChild(linkDiv);
    });

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
