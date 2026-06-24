const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The block we want to reorder is between <div class="projects-grid" id="projectsGrid"> and its closing tag.
// Since it's tricky to parse HTML via regex reliably, let's just use string replacement for the exact chunks.

const tpBlock = `        <div class="project-card" data-reveal data-project="5">
          <div class="project-img">
            <div class="project-img-placeholder"><i class="fa-solid fa-calendar-check"></i></div>
            <img src="towardspoint_thumb.jpg" alt="TowardsPoint Thumbnail" class="project-thumbnail"
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 5;" />
            <div class="project-overlay">
              <span class="project-view"><i class="fa-solid fa-eye"></i> View Details</span>
            </div>
          </div>
          <div class="project-info">
            <div class="project-tags-row">
              <span class="tag-chip">HTML</span><span class="tag-chip">CSS</span><span
                class="tag-chip">JavaScript</span><span class="tag-chip">Firebase</span><span class="tag-chip">Netlify
              </span>
            </div>
            <h3>TowardsPoint - Travel Management System</h3>
            <p>Full booking platform with scheduling, payments, and notifications.</p>
            <div class="project-links">
              <a href="https://towardspoint12.netlify.app/" class="btn-link" data-magnetic><i
                  class="fa-solid fa-arrow-up-right-from-square"></i> Live
                Demo</a>
              <a href="https://github.com/rohanmhabdi18/TowardsP" class="btn-link" data-magnetic><i
                  class="fa-brands fa-github"></i> GitHub</a>
            </div>
          </div>
        </div>`;

// Remove the block from the end
html = html.replace(tpBlock + '\n', '');
html = html.replace(tpBlock, '');

// Insert it at the top of the grid
const gridStart = '<div class="projects-grid" id="projectsGrid">\n\n';
html = html.replace(gridStart, gridStart + tpBlock + '\n\n');

// Now re-index all data-project attributes sequentially
let index = 0;
html = html.replace(/data-project="\d+"/g, () => `data-project="${index++}"`);

fs.writeFileSync('index.html', html);
console.log('Done!');
