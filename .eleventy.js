// imports for the various eleventy plugins (postdate & image)
const { DateTime } = require('luxon');
const Image = require("@11ty/eleventy-img");
const path = require('path');
const { execSync } = require('child_process')

// allows the use of {% image... %} to create responsive, optimised images
// CHANGE DEFAULT MEDIA QUERIES AND WIDTHS
async function imageShortcode(src, alt, className, loading, sizes = '(max-width: 600px) 400px, 850px') {
  // don't pass an alt? chuck it out. passing an empty string is okay though
  if (alt === undefined) {
    throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
  }

  // create the metadata for an optimised image
  let metadata = await Image(`${src}`, {
    widths: [200, 400, 850, 1920, 2500],
    formats: ['webp', 'jpeg'],
    urlPath: './images/',
    outputDir: './public/images',
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${width}w.${format}`;
    },
  });

  // get the smallest and biggest image for picture/image attributes
  let lowsrc = metadata.jpeg[0];
  let highsrc = metadata.jpeg[metadata.jpeg.length - 1];

  // when {% image ... %} is used, this is what's returned
  return `<picture class="${className}">
    ${Object.values(metadata)
      .map((imageFormat) => {
        return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat
          .map((entry) => entry.srcset)
          .join(', ')}" sizes="${sizes}">`;
      })
      .join('\n')}
      <img
        src="${lowsrc.url}"
        width="${highsrc.width}"
        height="${highsrc.height}"
        alt="${alt}"
        loading="${loading}"
        decoding="async">
    </picture>`;
}

module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("./src/assets/css/main.css");
    eleventyConfig.addPassthroughCopy("./src/assets");
    eleventyConfig.addPassthroughCopy("./src/admin");
  eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addPassthroughCopy("./src/_redirects");
  eleventyConfig.addPassthroughCopy({ "./src/robots.txt": "/robots.txt" });

   //11ty, nunjucks, tag counts https://claytonerrington.com/blog/11ty-nunjucks-tag-count/
    eleventyConfig.addCollection("tagList", collection => {
      const tagsObject = {}
      collection.getAll().forEach(item => {
        if (!item.data.tags) return;
        item.data.tags
          .filter(tag => !['post', 'all'].includes(tag))
          .forEach(tag => {
            if(typeof tagsObject[tag] === 'undefined') {
              tagsObject[tag] = 1
            } else {
              tagsObject[tag] += 1
            }
          });
      });
  
      const tagList = []
      Object.keys(tagsObject).forEach(tag => {
        tagList.push({ tagName: tag, tagCount: tagsObject[tag] })
      })
    return tagList.sort((a, b) => b.tagCount - a.tagCount)
  });

// open on npm start and watch CSS files for changes - doesn't trigger 11ty rebuild
eleventyConfig.setBrowserSyncConfig({
  open: true,
  files: '/public/assets/css/main.css',
});

// allows the {% image %} shortcode to be used for optimised iamges (in webp if possible)
eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

// normally, 11ty will render dates on blog posts in full JSDate format (Fri Dec 02 18:00:00 GMT-0600). That's ugly
// this filter allows dates to be converted into a normal, locale format. view the docs to learn more (https://moment.github.io/luxon/api-docs/index.html#datetime)
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });
 
  //
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("posts/**/*.md")
})
// We want to run the PageFind CLI after the site has been built so we use the after Eleventy event 
// and run the command with execSync on all HTML files in the built site:
  eleventyConfig.on('eleventy.after', () => {
    execSync(`npx pagefind --source public --bundle-dir pagefind --glob \"**/*.html\"`, { encoding: 'utf-8' })
})
    // Return your Object options:
    return {
      dir: {
        input: "src",
        includes: '_includes',
        output: "public"
      }
    }
    // allows .html files to contain nunjucks templating language
    htmlTemplateEngine: "njk"
    
}