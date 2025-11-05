import { DateTime } from "luxon";

export default function(eleventyConfig) {
  // Add date filter for Nunjucks
  eleventyConfig.addNunjucksFilter("date", function(dateObj, format = "yyyy-LL-dd") {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format);
  });

  // Add year shortcode for copyright
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addCollection("posts", c =>
    c.getFilteredByGlob("src/blog/**/*.md").sort((a,b)=>b.date - a.date)
  );
  return {
    dir: { input: "src", includes: "_includes", layouts: "_layouts" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
