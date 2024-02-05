const { DateTime } = require("luxon");


module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy("/src/assets/css");
    eleventyConfig.addPassthroughCopy("/src/assets");
    eleventyConfig.addPassthroughCopy("/src/admin");
  eleventyConfig.addPassthroughCopy("/src/assets/webfonts");
  eleventyConfig.addPassthroughCopy("/src/images");
  eleventyConfig.addPassthroughCopy("/src/assets/js");
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