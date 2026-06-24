const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// We want to move the Motion Graphics card to the top of the videos-masonry list.
const motionCard = `        <div class="video-card tall" data-category="motion" data-reveal
          data-url="https://youtube.com/shorts/9UB0LUdbKxQ?si=SkYStNE7TXMFFAQi">
          <div class="video-thumb" style="padding: 0;">
            <iframe
              src="https://www.youtube.com/embed/9UB0LUdbKxQ?autoplay=1&mute=1&loop=1&playlist=9UB0LUdbKxQ&controls=0&showinfo=0&rel=0&modestbranding=1"
              style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; border: none; pointer-events: none;"
              allow="autoplay; encrypted-media" allowfullscreen>
            </iframe>
          </div>
          <div class="video-info">
            <span class="video-cat">Motion Graphics</span>
            <h4>Motion Graphics Reel</h4>
            <p>Creative vertical reel showcasing motion effects.</p>
          </div>
        </div>`;

// Delete it from its current location
html = html.replace(motionCard + '\n\n', '');
html = html.replace(motionCard + '\n', '');
html = html.replace(motionCard, '');

// Insert it at the top of videos-masonry
const masonryStart = '<div class="videos-masonry" id="videosMasonry">\n\n';
html = html.replace(masonryStart, masonryStart + motionCard + '\n\n');

fs.writeFileSync('index.html', html);
console.log('Done!');
