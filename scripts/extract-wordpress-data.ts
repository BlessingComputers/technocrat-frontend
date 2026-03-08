/**
 * WordPress SQL Dump → JSON Extractor
 *
 * Reads the WordPress/WooCommerce SQL dump and extracts meaningful content
 * into structured JSON files for the Next.js file-based content system.
 *
 * Usage:
 *   npx tsx scripts/extract-wordpress-data.ts
 *
 * To regenerate JSON when the SQL file changes, simply re-run the command above.
 * Output is written to src/data/content/
 */

import fs from "fs";
import path from "path";
import readline from "readline";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const SQL_PATH = path.join(__dirname, "../src/data/technoc2_wp137.sql");
const OUTPUT_DIR = path.join(__dirname, "../src/data/content");

// The WP table prefix used in this dump
const PREFIX = "wpft_";

// Tables we care about
const TARGET_TABLES = [
  `${PREFIX}posts`,
  `${PREFIX}postmeta`,
  `${PREFIX}terms`,
  `${PREFIX}term_taxonomy`,
  `${PREFIX}term_relationships`,
  `${PREFIX}comments`,
  `${PREFIX}users`,
];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RawPost {
  ID: string;
  post_author: string;
  post_date: string;
  post_date_gmt: string;
  post_content: string;
  post_title: string;
  post_excerpt: string;
  post_status: string;
  comment_status: string;
  ping_status: string;
  post_password: string;
  post_name: string;
  to_ping: string;
  pinged: string;
  post_modified: string;
  post_modified_gmt: string;
  post_content_filtered: string;
  post_parent: string;
  guid: string;
  menu_order: string;
  post_type: string;
  post_mime_type: string;
  comment_count: string;
}

interface RawUser {
  ID: string;
  user_login: string;
  user_pass: string;
  user_nicename: string;
  user_email: string;
  user_url: string;
  user_registered: string;
  user_activation_key: string;
  user_status: string;
  display_name: string;
}

interface RawTerm {
  term_id: string;
  name: string;
  slug: string;
  term_group: string;
}

interface RawTermTaxonomy {
  term_taxonomy_id: string;
  term_id: string;
  taxonomy: string;
  description: string;
  parent: string;
  count: string;
}

interface RawTermRelationship {
  object_id: string;
  term_taxonomy_id: string;
  term_order: string;
}

interface RawComment {
  comment_ID: string;
  comment_post_ID: string;
  comment_author: string;
  comment_author_email: string;
  comment_author_url: string;
  comment_author_IP: string;
  comment_date: string;
  comment_date_gmt: string;
  comment_content: string;
  comment_karma: string;
  comment_approved: string;
  comment_agent: string;
  comment_type: string;
  comment_parent: string;
  user_id: string;
}

interface RawPostMeta {
  meta_id: string;
  post_id: string;
  meta_key: string;
  meta_value: string;
}

// ---------------------------------------------------------------------------
// SQL Value Parser
// ---------------------------------------------------------------------------

/**
 * Parse the VALUES portion of an INSERT statement, handling nested parens,
 * quoted strings with escaped characters, etc.
 *
 * Returns an array of row-tuples, where each tuple is an array of string values.
 */
function parseInsertValues(valuesPart: string): string[][] {
  const rows: string[][] = [];
  let i = 0;
  const len = valuesPart.length;

  while (i < len) {
    // Find next opening paren
    while (i < len && valuesPart[i] !== "(") i++;
    if (i >= len) break;
    i++; // skip '('

    const fields: string[] = [];
    let field = "";
    let inString = false;
    let stringChar = "";

    while (i < len) {
      const ch = valuesPart[i];

      if (inString) {
        if (ch === "\\" && i + 1 < len) {
          // Escaped character
          field += ch + valuesPart[i + 1];
          i += 2;
          continue;
        }
        if (ch === stringChar) {
          // Check for doubled quote ('' escape)
          if (i + 1 < len && valuesPart[i + 1] === stringChar) {
            field += ch + ch;
            i += 2;
            continue;
          }
          inString = false;
          field += ch;
          i++;
          continue;
        }
        field += ch;
        i++;
        continue;
      }

      // Not in string
      if (ch === "'" || ch === '"') {
        inString = true;
        stringChar = ch;
        field += ch;
        i++;
        continue;
      }

      if (ch === ",") {
        fields.push(field.trim());
        field = "";
        i++;
        continue;
      }

      if (ch === ")") {
        fields.push(field.trim());
        rows.push(fields);
        i++; // skip ')'
        break;
      }

      field += ch;
      i++;
    }
  }

  return rows;
}

/**
 * Unquote a SQL string value: remove surrounding quotes and unescape.
 */
function unquote(val: string): string {
  if (val === "NULL") return "";
  if (
    (val.startsWith("'") && val.endsWith("'")) ||
    (val.startsWith('"') && val.endsWith('"'))
  ) {
    val = val.slice(1, -1);
  }
  // Unescape
  val = val
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, "\\")
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\r")
    .replace(/\\t/g, "\t")
    .replace(/\\0/g, "\0");
  return val;
}

// ---------------------------------------------------------------------------
// Data stores
// ---------------------------------------------------------------------------

const posts: RawPost[] = [];
const postmeta: RawPostMeta[] = [];
const users: RawUser[] = [];
const terms: RawTerm[] = [];
const termTaxonomy: RawTermTaxonomy[] = [];
const termRelationships: RawTermRelationship[] = [];
const comments: RawComment[] = [];

// ---------------------------------------------------------------------------
// Line processor
// ---------------------------------------------------------------------------

function processLine(line: string) {
  // Only care about INSERT INTO lines for our target tables
  if (!line.startsWith("INSERT INTO")) return;

  // Extract table name
  const tableMatch = line.match(/^INSERT INTO `([^`]+)`/);
  if (!tableMatch) return;

  const tableName = tableMatch[1];
  if (!TARGET_TABLES.includes(tableName)) return;

  // Extract the VALUES(...) portion
  const valuesIdx = line.indexOf(" VALUES ");
  if (valuesIdx === -1) return;

  const valuesPart = line.substring(valuesIdx + 8); // after " VALUES "
  const rows = parseInsertValues(valuesPart);

  for (const row of rows) {
    const vals = row.map(unquote);

    switch (tableName) {
      case `${PREFIX}posts`:
        if (vals.length >= 23) {
          posts.push({
            ID: vals[0],
            post_author: vals[1],
            post_date: vals[2],
            post_date_gmt: vals[3],
            post_content: vals[4],
            post_title: vals[5],
            post_excerpt: vals[6],
            post_status: vals[7],
            comment_status: vals[8],
            ping_status: vals[9],
            post_password: vals[10],
            post_name: vals[11],
            to_ping: vals[12],
            pinged: vals[13],
            post_modified: vals[14],
            post_modified_gmt: vals[15],
            post_content_filtered: vals[16],
            post_parent: vals[17],
            guid: vals[18],
            menu_order: vals[19],
            post_type: vals[20],
            post_mime_type: vals[21],
            comment_count: vals[22],
          });
        }
        break;

      case `${PREFIX}postmeta`:
        if (vals.length >= 4) {
          postmeta.push({
            meta_id: vals[0],
            post_id: vals[1],
            meta_key: vals[2],
            meta_value: vals[3],
          });
        }
        break;

      case `${PREFIX}users`:
        if (vals.length >= 10) {
          users.push({
            ID: vals[0],
            user_login: vals[1],
            user_pass: vals[2],
            user_nicename: vals[3],
            user_email: vals[4],
            user_url: vals[5],
            user_registered: vals[6],
            user_activation_key: vals[7],
            user_status: vals[8],
            display_name: vals[9],
          });
        }
        break;

      case `${PREFIX}terms`:
        if (vals.length >= 4) {
          terms.push({
            term_id: vals[0],
            name: vals[1],
            slug: vals[2],
            term_group: vals[3],
          });
        }
        break;

      case `${PREFIX}term_taxonomy`:
        if (vals.length >= 6) {
          termTaxonomy.push({
            term_taxonomy_id: vals[0],
            term_id: vals[1],
            taxonomy: vals[2],
            description: vals[3],
            parent: vals[4],
            count: vals[5],
          });
        }
        break;

      case `${PREFIX}term_relationships`:
        if (vals.length >= 3) {
          termRelationships.push({
            object_id: vals[0],
            term_taxonomy_id: vals[1],
            term_order: vals[2],
          });
        }
        break;

      case `${PREFIX}comments`:
        if (vals.length >= 15) {
          comments.push({
            comment_ID: vals[0],
            comment_post_ID: vals[1],
            comment_author: vals[2],
            comment_author_email: vals[3],
            comment_author_url: vals[4],
            comment_author_IP: vals[5],
            comment_date: vals[6],
            comment_date_gmt: vals[7],
            comment_content: vals[8],
            comment_karma: vals[9],
            comment_approved: vals[10],
            comment_agent: vals[11],
            comment_type: vals[12],
            comment_parent: vals[13],
            user_id: vals[14],
          });
        }
        break;
    }
  }
}

// ---------------------------------------------------------------------------
// Content builders
// ---------------------------------------------------------------------------

function stripShortcodes(html: string): string {
  // Remove WordPress/WPBakery shortcodes like [vc_row], [woodmart_info_box], etc.
  return html.replace(/\[\/?\w+[^\]]*\]/g, "");
}

function cleanHtml(html: string): string {
  let cleaned = stripShortcodes(html);
  // Remove inline styles
  cleaned = cleaned.replace(/\s*style="[^"]*"/gi, "");
  // Remove css attributes
  cleaned = cleaned.replace(/\s*css="[^"]*"/gi, "");
  // Clean up empty paragraphs
  cleaned = cleaned.replace(/<p>\s*<\/p>/gi, "");
  // Remove &nbsp;
  cleaned = cleaned.replace(/&nbsp;/g, " ");
  // Trim whitespace
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n").trim();
  return cleaned;
}

function buildLookups() {
  // term_id -> term
  const termById = new Map<string, RawTerm>();
  for (const t of terms) {
    termById.set(t.term_id, t);
  }

  // term_taxonomy_id -> taxonomy record
  const taxById = new Map<string, RawTermTaxonomy>();
  for (const tt of termTaxonomy) {
    taxById.set(tt.term_taxonomy_id, tt);
  }

  // post_id -> meta records
  const metaByPostId = new Map<string, RawPostMeta[]>();
  for (const pm of postmeta) {
    const existing = metaByPostId.get(pm.post_id) || [];
    existing.push(pm);
    metaByPostId.set(pm.post_id, existing);
  }

  // object_id -> term_taxonomy_ids
  const relsByObjectId = new Map<string, string[]>();
  for (const tr of termRelationships) {
    const existing = relsByObjectId.get(tr.object_id) || [];
    existing.push(tr.term_taxonomy_id);
    relsByObjectId.set(tr.object_id, existing);
  }

  // user_id -> user
  const userById = new Map<string, RawUser>();
  for (const u of users) {
    userById.set(u.ID, u);
  }

  // attachment post_id -> guid (url)
  const attachmentUrls = new Map<string, string>();
  for (const p of posts) {
    if (p.post_type === "attachment" && p.guid) {
      attachmentUrls.set(p.ID, p.guid);
    }
  }

  return {
    termById,
    taxById,
    metaByPostId,
    relsByObjectId,
    userById,
    attachmentUrls,
  };
}

function getPostCategories(
  postId: string,
  taxonomy: string,
  lookups: ReturnType<typeof buildLookups>,
) {
  const ttIds = lookups.relsByObjectId.get(postId) || [];
  const cats: { id: number; name: string; slug: string }[] = [];

  for (const ttId of ttIds) {
    const tax = lookups.taxById.get(ttId);
    if (!tax || tax.taxonomy !== taxonomy) continue;
    const term = lookups.termById.get(tax.term_id);
    if (!term) continue;
    cats.push({
      id: parseInt(term.term_id),
      name: term.name,
      slug: term.slug,
    });
  }

  return cats;
}

function getPostMeta(postId: string, lookups: ReturnType<typeof buildLookups>) {
  return lookups.metaByPostId.get(postId) || [];
}

function getMetaValue(metas: RawPostMeta[], key: string): string | undefined {
  const m = metas.find((m) => m.meta_key === key);
  return m?.meta_value;
}

function getPostImages(
  postId: string,
  metas: RawPostMeta[],
  lookups: ReturnType<typeof buildLookups>,
): string[] {
  const images: string[] = [];

  // Featured image / thumbnail
  const thumbnailId = getMetaValue(metas, "_thumbnail_id");
  if (thumbnailId) {
    const url = lookups.attachmentUrls.get(thumbnailId);
    if (url) images.push(url);
  }

  // WooCommerce product gallery
  const galleryIds = getMetaValue(metas, "_product_image_gallery");
  if (galleryIds) {
    for (const id of galleryIds.split(",")) {
      const url = lookups.attachmentUrls.get(id.trim());
      if (url && !images.includes(url)) images.push(url);
    }
  }

  return images;
}

function buildProducts(lookups: ReturnType<typeof buildLookups>) {
  const products = posts.filter(
    (p) =>
      p.post_type === "product" &&
      p.post_status === "publish" &&
      p.post_title.trim() !== "",
  );

  return products.map((p) => {
    const metas = getPostMeta(p.ID, lookups);
    const categories = getPostCategories(p.ID, "product_cat", lookups);
    const tags = getPostCategories(p.ID, "product_tag", lookups);
    const images = getPostImages(p.ID, metas, lookups);

    return {
      id: parseInt(p.ID),
      name: p.post_title,
      slug: p.post_name,
      description: cleanHtml(p.post_content),
      short_description: cleanHtml(p.post_excerpt),
      date_created: p.post_date,
      status: p.post_status,
      price: getMetaValue(metas, "_price") || "",
      regular_price: getMetaValue(metas, "_regular_price") || "",
      sale_price: getMetaValue(metas, "_sale_price") || "",
      sku: getMetaValue(metas, "_sku") || "",
      stock_status: getMetaValue(metas, "_stock_status") || "instock",
      stock_quantity: getMetaValue(metas, "_stock")
        ? parseInt(getMetaValue(metas, "_stock")!)
        : null,
      images,
      categories,
      tags,
      attributes: [],
      meta: {
        total_sales: getMetaValue(metas, "total_sales") || "0",
        average_rating: getMetaValue(metas, "_wc_average_rating") || "0",
        rating_count: getMetaValue(metas, "_wc_rating_count") || "0",
        featured: getMetaValue(metas, "_featured") === "yes",
      },
    };
  });
}

function buildBlogPosts(lookups: ReturnType<typeof buildLookups>) {
  const blogPosts = posts.filter(
    (p) =>
      p.post_type === "post" &&
      p.post_status === "publish" &&
      p.post_title.trim() !== "",
  );

  return blogPosts.map((p) => {
    const metas = getPostMeta(p.ID, lookups);
    const categories = getPostCategories(p.ID, "category", lookups);
    const tags = getPostCategories(p.ID, "post_tag", lookups);
    const images = getPostImages(p.ID, metas, lookups);
    const author = lookups.userById.get(p.post_author);

    return {
      id: parseInt(p.ID),
      title: p.post_title,
      slug: p.post_name,
      content: cleanHtml(p.post_content),
      excerpt:
        cleanHtml(p.post_excerpt) ||
        cleanHtml(p.post_content).substring(0, 200),
      featuredImage: images[0] || null,
      categories,
      tags,
      author: author
        ? { id: parseInt(author.ID), name: author.display_name }
        : null,
      createdAt: p.post_date,
      modifiedAt: p.post_modified,
    };
  });
}

function buildPages(lookups: ReturnType<typeof buildLookups>) {
  const pages = posts.filter(
    (p) =>
      p.post_type === "page" &&
      p.post_status === "publish" &&
      p.post_title.trim() !== "",
  );

  return pages.map((p) => {
    const metas = getPostMeta(p.ID, lookups);
    const images = getPostImages(p.ID, metas, lookups);
    const author = lookups.userById.get(p.post_author);

    return {
      id: parseInt(p.ID),
      title: p.post_title,
      slug: p.post_name,
      content: cleanHtml(p.post_content),
      featuredImage: images[0] || null,
      author: author
        ? { id: parseInt(author.ID), name: author.display_name }
        : null,
      createdAt: p.post_date,
      modifiedAt: p.post_modified,
      parent: parseInt(p.post_parent),
      menuOrder: parseInt(p.menu_order),
    };
  });
}

function buildCategories(lookups: ReturnType<typeof buildLookups>) {
  // Product categories
  const productCats = termTaxonomy
    .filter((tt) => tt.taxonomy === "product_cat")
    .map((tt) => {
      const term = lookups.termById.get(tt.term_id);
      if (!term) return null;
      return {
        id: parseInt(tt.term_taxonomy_id),
        term_id: parseInt(term.term_id),
        name: term.name,
        slug: term.slug,
        parent: parseInt(tt.parent),
        count: parseInt(tt.count),
      };
    })
    .filter(Boolean);

  return productCats;
}

function buildUsers() {
  // Only include the first admin user and strip sensitive data
  return users.slice(0, 5).map((u) => ({
    id: parseInt(u.ID),
    name: u.display_name,
    slug: u.user_nicename,
    registeredAt: u.user_registered,
  }));
}

function buildComments(lookups: ReturnType<typeof buildLookups>) {
  // Filter out WooCommerce order notes and only get real comments
  const realComments = comments.filter(
    (c) =>
      c.comment_type !== "order_note" &&
      c.comment_approved === "1" &&
      c.comment_content.trim() !== "",
  );

  return realComments.map((c) => ({
    id: parseInt(c.comment_ID),
    postId: parseInt(c.comment_post_ID),
    author: c.comment_author,
    content: c.comment_content,
    date: c.comment_date,
    parentId: parseInt(c.comment_parent),
  }));
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("=== WordPress SQL Dump Extractor ===\n");

  if (!fs.existsSync(SQL_PATH)) {
    console.error(`SQL file not found: ${SQL_PATH}`);
    process.exit(1);
  }

  console.log(`Reading: ${SQL_PATH}`);
  console.log(`Output:  ${OUTPUT_DIR}\n`);

  // Stream-read the file line by line for memory efficiency
  const fileStream = fs.createReadStream(SQL_PATH, { encoding: "utf8" });
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let lineCount = 0;
  let insertCount = 0;
  let currentInsert = "";

  for await (const line of rl) {
    lineCount++;
    if (lineCount % 100000 === 0) {
      console.log(`  processed ${lineCount.toLocaleString()} lines...`);
    }

    // INSERT statements can span multiple lines. Accumulate until we find
    // a line that ends with ';'
    if (line.startsWith("INSERT INTO")) {
      currentInsert = line;
      if (line.trimEnd().endsWith(";")) {
        processLine(currentInsert);
        currentInsert = "";
        insertCount++;
      }
    } else if (currentInsert) {
      currentInsert += " " + line;
      if (line.trimEnd().endsWith(";")) {
        processLine(currentInsert);
        currentInsert = "";
        insertCount++;
      }
    }
  }

  console.log(
    `\nParsed ${lineCount.toLocaleString()} lines, ${insertCount} INSERT statements\n`,
  );

  // Stats
  console.log("Raw data counts:");
  console.log(`  posts:              ${posts.length}`);
  console.log(`  postmeta:           ${postmeta.length}`);
  console.log(`  users:              ${users.length}`);
  console.log(`  terms:              ${terms.length}`);
  console.log(`  term_taxonomy:      ${termTaxonomy.length}`);
  console.log(`  term_relationships: ${termRelationships.length}`);
  console.log(`  comments:           ${comments.length}`);

  // Build lookups
  console.log("\nBuilding lookups...");
  const lookups = buildLookups();

  // Generate output
  console.log("Generating JSON files...\n");
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const products = buildProducts(lookups);
  const blogPosts = buildBlogPosts(lookups);
  const pages = buildPages(lookups);
  const categories = buildCategories(lookups);
  const userList = buildUsers();
  const commentList = buildComments(lookups);

  const files = {
    "products.json": products,
    "posts.json": blogPosts,
    "pages.json": pages,
    "categories.json": categories,
    "users.json": userList,
    "comments.json": commentList,
  };

  for (const [filename, data] of Object.entries(files)) {
    const filePath = path.join(OUTPUT_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    console.log(
      `  ${filename}: ${Array.isArray(data) ? data.length : 0} records`,
    );
  }

  // Also copy products and categories to the existing data paths
  // so the existing app continues to work
  const existingProductsPath = path.join(
    __dirname,
    "../src/data/products.json",
  );
  const existingCategoriesPath = path.join(
    __dirname,
    "../src/data/categories.json",
  );
  fs.writeFileSync(
    existingProductsPath,
    JSON.stringify(products, null, 2),
    "utf8",
  );
  fs.writeFileSync(
    existingCategoriesPath,
    JSON.stringify(categories, null, 2),
    "utf8",
  );
  console.log(
    "\n  Also updated src/data/products.json and src/data/categories.json",
  );

  console.log("\nDone! JSON files written to src/data/content/");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
