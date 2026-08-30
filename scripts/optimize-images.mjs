#!/usr/bin/env node

/**
 * Image Optimization Script
 *
 * This script optimizes images for the portfolio:
 * - Converts images to WebP format
 * - Generates responsive image sizes
 * - Compresses images to optimal quality
 * - Creates thumbnails automatically
 *
 * Usage:
 *   npm run optimize-images
 *   node scripts/optimize-images.mjs [path]
 */

import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  // Source and output directories
  sourceDir: path.join(__dirname, "../public/projects"),
  outputDir: path.join(__dirname, "../public/projects"),

  // Image quality settings
  quality: {
    webp: 85,
    jpeg: 85,
    png: 85,
  },

  // Responsive sizes to generate
  sizes: {
    cover: [
      { width: 1200, height: 800, suffix: "" },
      { width: 800, height: 533, suffix: "-md" },
      { width: 400, height: 267, suffix: "-sm" },
    ],
    gallery: [
      { width: 1920, height: 1080, suffix: "" },
      { width: 1280, height: 720, suffix: "-md" },
      { width: 640, height: 360, suffix: "-sm" },
    ],
    thumbnail: [
      { width: 600, height: 400, suffix: "" },
      { width: 300, height: 200, suffix: "-sm" },
    ],
  },

  // Supported input formats
  supportedFormats: [".jpg", ".jpeg", ".png", ".webp", ".tiff"],
};

// ANSI color codes for console output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  red: "\x1b[31m",
};

/**
 * Log formatted message
 */
function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Get all image files from directory recursively
 */
async function getImageFiles(dir) {
  const files = [];

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        if (entry.name === "optimized" || entry.name.startsWith(".")) {
          continue;
        }
        files.push(...(await getImageFiles(fullPath)));
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (CONFIG.supportedFormats.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  } catch (error) {
    return files;
  }

  return files;
}

/**
 * Get file size in KB
 */
async function getFileSize(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return (stats.size / 1024).toFixed(2);
  } catch {
    return 0;
  }
}

/**
 * Determine image category from path
 */
function getImageCategory(filePath) {
  const normalized = filePath.toLowerCase();
  if (normalized.includes("cover")) return "cover";
  if (normalized.includes("gallery")) return "gallery";
  if (normalized.includes("thumb")) return "thumbnail";
  return "cover";
}

/**
 * Optimize single image
 */
async function optimizeImage(inputPath) {
  const category = getImageCategory(inputPath);
  const sizes = CONFIG.sizes[category] || CONFIG.sizes.cover;

  const dir = path.dirname(inputPath);
  const ext = path.extname(inputPath);
  const name = path.basename(inputPath, ext);

  const results = [];

  for (const size of sizes) {
    const outputName = `${name}${size.suffix}.webp`;
    const outputPath = path.join(dir, outputName);

    try {
      const image = sharp(inputPath);

      await image
        .resize(size.width, size.height, {
          fit: "cover",
          position: "center",
        })
        .webp({ quality: CONFIG.quality.webp })
        .toFile(outputPath);

      const originalSize = await getFileSize(inputPath);
      const optimizedSize = await getFileSize(outputPath);
      const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

      results.push({
        output: outputName,
        size: `${optimizedSize}KB`,
        savings: `${savings}%`,
      });
    } catch (error) {
      log(`  ❌ Error processing ${outputName}: ${error.message}`, "red");
    }
  }

  return results;
}

/**
 * Create directory if it doesn't exist
 */
async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

/**
 * Main optimization process
 */
async function main() {
  log("\n🖼️  Image Optimization Script\n", "bright");

  const targetDir = process.argv[2] || CONFIG.sourceDir;

  log(`📁 Scanning directory: ${targetDir}\n`, "blue");

  await ensureDir(path.join(targetDir, "covers"));
  await ensureDir(path.join(targetDir, "gallery"));
  await ensureDir(path.join(targetDir, "thumbnails"));

  const imageFiles = await getImageFiles(targetDir);

  if (imageFiles.length === 0) {
    log("⚠️  No images found to optimize", "yellow");
    log("\n💡 Add images to public/projects/ and run again\n", "blue");
    return;
  }

  log(`Found ${imageFiles.length} image(s) to process\n`, "green");

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let processedCount = 0;

  for (const imagePath of imageFiles) {
    const relativePath = path.relative(process.cwd(), imagePath);
    log(`\n📸 Processing: ${relativePath}`, "blue");

    const originalSize = await getFileSize(imagePath);
    totalOriginalSize += parseFloat(originalSize);

    const results = await optimizeImage(imagePath);

    if (results.length > 0) {
      processedCount++;

      for (const result of results) {
        log(
          `  ✅ ${result.output} - ${result.size} (saved ${result.savings})`,
          "green",
        );
        totalOptimizedSize += parseFloat(result.size);
      }
    }
  }

  log("\n" + "─".repeat(50), "blue");
  log("✨ Optimization Complete!\n", "bright");
  log(`📊 Summary:`, "blue");
  log(`   • Images processed: ${processedCount}`, "green");
  log(`   • Original size: ${totalOriginalSize.toFixed(2)}KB`, "yellow");
  log(`   • Optimized size: ${totalOptimizedSize.toFixed(2)}KB`, "green");

  if (totalOriginalSize > 0) {
    const totalSavings = (
      (1 - totalOptimizedSize / totalOriginalSize) *
      100
    ).toFixed(1);
    log(`   • Total savings: ${totalSavings}%`, "green");
  }

  log("\n💡 Tips:", "blue");
  log("   • Images converted to WebP format");
  log("   • Multiple sizes generated for responsive images");
  log("   • Use Next.js Image component for optimization");
  log("");
}

main().catch((error) => {
  log(`\n❌ Error: ${error.message}`, "red");
  console.error(error);
  process.exit(1);
});
