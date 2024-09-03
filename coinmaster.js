  const COUNTDOWN_DURATION = 3;

    function getCountdown1Image(seconds) {
      const baseUrl = 'https://i.imgur.com/UvDgpCs.gif';
      return `${baseUrl}?${seconds}`;
    }

    window.addEventListener('load', () => {
      const linksContainer = document.getElementById('linksContainer1');
      linksContainer.style.display = 'block';
    });

    document.getElementById('abdo1').addEventListener('click', () => {
      const loading = document.getElementById('loading');
      loading.style.display = 'block';

      let secondsLeft = COUNTDOWN_DURATION;

      const countdown1Interval = setInterval(() => {
        secondsLeft--;
        if (secondsLeft <= 0) {
          clearInterval(countdown1Interval);

          const urls = [
            'https://www.vg247.com/coin-master-free-spins-links'
          ];
          extractLinksFromMultipleUrls(urls);

          setTimeout(() => {
            loading.style.display = 'none';
          }, 0);
        }
      }, 1800);
    });

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
            if (
              link.href.startsWith('https://static.moonactive.net/static/coinmaster/reward/reward2.html?') ||
              link.href.startsWith('https://rewards.coinmaster.com/rewards/rewards.html?')
            ) {
              if (allLinks.length < 5) {  
                const linkData = {
                  url: link.href,
                  title: link.textContent.trim() || 'No Title',
                  isNew: true
                };
                allLinks.push(linkData);
              }
            }
          });
        } catch (error) {
          console.error('Error:', error.message);
        }
      }
      displayLinks(allLinks);
    }

    function displayLinks(links) {
      const container = document.getElementById('linksContainer1');
      container.innerHTML = '';
      if (links.length === 0) {
        container.innerHTML = 'No links found.';
        return;
      }
      links.forEach(link => {
        const linkDiv = document.createElement('div');
        linkDiv.className = 'victor1';

        const image = document.createElement('img');
        image.src = 'https://i.imgur.com/YdXrFxR.png';
        image.alt = 'Link Image';

        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.title;
        a.target = '_blank';

        if (link.isNew) {
          const newSpan = document.createElement('span');
          newSpan.innerHTML = ' &#10004;';
          newSpan.style.color = 'Green'; 
          newSpan.style.fontWeight = 'normal'; 
          a.appendChild(newSpan); 
        }

        linkDiv.appendChild(image);
        linkDiv.appendChild(a);
        container.appendChild(linkDiv);
      });

      container.style.display = 'block';
    }
