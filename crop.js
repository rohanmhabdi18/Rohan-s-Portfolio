const fs = require('fs');

try {
  const file = 'Brand Fevicon.svg';
  const content = fs.readFileSync(file, 'utf8');

  const svgStartRegex = /<svg[^>]*>/i;
  const match = content.match(svgStartRegex);

  if (match) {
    const startTag = match[0];
    const innerContent = content.slice(match.index + startTag.length, content.lastIndexOf('</svg>'));
    
    const newSvg = `${startTag}
  <defs>
    <clipPath id="circleClip">
      <circle cx="50%" cy="50%" r="50%" />
    </clipPath>
  </defs>
  <g clip-path="url(#circleClip)">
  ${innerContent}
  </g>
  </svg>`;

    fs.writeFileSync('Brand_Fevicon_Circle.svg', newSvg);
    console.log('Success');
  } else {
    console.log('Failed to find SVG tag');
  }
} catch (e) {
  console.error(e);
}
