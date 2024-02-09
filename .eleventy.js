const { DateTime } = require("luxon");


module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy('/src/assets/css/**/*.css');
    eleventyConfig.addPassthroughCopy("/src/assets");
    eleventyConfig.addPassthroughCopy("/src/admin");
  eleventyConfig.addPassthroughCopy("/src/images");
  eleventyConfig.addPassthroughCopy('./src/_redirects');
  eleventyConfig.addPassthroughCopy({ './src/robots.txt': '/robots.txt' });

// open on npm start and watch CSS files for changes - doesn't trigger 11ty rebuild
eleventyConfig.setBrowserSyncConfig({
  open: true,
  files: './public/assets/css/**/*.css',
});


  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });
 


    // Return your Object options:
    return {
      dir: {
        input: "src",
        includes: '_includes',
        output: "public"
      }
    }
    htmlTemplateEngine: "njk"
    
}