 const COUNTDOWN_DURATION = 3; 

    function getCountdownImage(seconds) {
        const baseUrl = 'https://i.imgur.com/UvDgpCs.gif';
        return `${baseUrl}?${seconds}`;
    }

    window.addEventListener('load', () => {
        const linksContainer = document.getElementById('linksContainer');
        linksContainer.style.display = 'block'; 
    });

    document.getElementById('abdo').addEventListener('click', () => {
        const countdownImage = document.getElementById('countdownImage');
        const loading = document.getElementById('loading');
        const loadingBar = document.getElementById('loadingBar');
        const linksContainer = document.getElementById('linksContainer');
        
        loading.style.display = 'block';
        loadingBar.style.width = '100%';

        let secondsLeft = COUNTDOWN_DURATION;
        countdownImage.src = getCountdownImage(secondsLeft); 

        const countdownInterval = setInterval(() => {
            secondsLeft--;
            if (secondsLeft >= 0) {
                countdownImage.src = getCountdownImage(secondsLeft); 
            }
            if (secondsLeft <= 0) {
                clearInterval(countdownInterval);
                countdownImage.src = 'https://i.imgur.com/92xFbAL.png'; 
                
                countdownImage.style.width = '20px';
                countdownImage.style.height = '20px';
                
                const urls = [
                    'https://monopolygo.wiki/latest-reward-links/',
                    'https://www.vg247.com/monopoly-go-dice-links', 
                    'https://www.pockettactics.com/free-monopoly-go-dice'  
                ];
                extractLinksFromMultipleUrls(urls);

                setTimeout(() => {
                    loading.style.display = 'none';
                }, 0);
            }
        }, 1800);
    });

    async function extractLinksFromMultipleUrls(urls) {
        const allLinks = new Set(); 
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
                        const cleanLink = link.href.split('?')[0]; 
                        if (!allLinks.has(cleanLink)) { 
                            const linkText = link.textContent.trim() || 'Unknown'; 
                            allLinks.add(cleanLink); 
                        }
                    }
                });
            } catch (error) {
                console.error('Error:', error.message);
            }
        }
        displayLinks(Array.from(allLinks));
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
            linkDiv.className = 'victor';

            const image = document.createElement('img');
            image.src = 'https://i.imgur.com/hMAhlhY.png';
            image.alt = 'Link Image';

            const title = document.createElement('span');
            const a = document.createElement('a');
            a.href = link;
            a.textContent = link;
            a.target = '_blank';

            linkDiv.appendChild(image);
            linkDiv.appendChild(title);
            linkDiv.appendChild(a);
            container.appendChild(linkDiv);
        });

        container.style.display = 'block';
    }
