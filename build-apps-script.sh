#!/bin/bash
# Build script for Google Apps Script deployment
# Bundles CSS and JS into a single HTML file

set -e

OUTPUT="src/index.html"

# Start HTML
cat > "$OUTPUT" << 'HTMLHEAD'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Design Studio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
HTMLHEAD

# Append CSS
cat css/styles.css >> "$OUTPUT"

# Close style, continue HTML
cat >> "$OUTPUT" << 'HTMLBODY'
  </style>
</head>
<body>
HTMLBODY

# Extract body content from index.html (between <body> and </body>)
sed -n '/<body>/,/<\/body>/p' index.html | sed '1d;$d' >> "$OUTPUT"

# Add Monaco CDN and scripts
cat >> "$OUTPUT" << 'HTMLSCRIPTS'
  <!-- Monaco Editor from CDN -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs/loader.min.js"></script>
  <script>
HTMLSCRIPTS

# Append all JS files
cat js/themes.js >> "$OUTPUT"
echo "" >> "$OUTPUT"
cat js/claude.js >> "$OUTPUT"
echo "" >> "$OUTPUT"
cat js/editor.js >> "$OUTPUT"
echo "" >> "$OUTPUT"
cat js/preview.js >> "$OUTPUT"
echo "" >> "$OUTPUT"
cat js/app.js >> "$OUTPUT"

# Close script and HTML
cat >> "$OUTPUT" << 'HTMLEND'
  </script>
</body>
</html>
HTMLEND

echo "Built $OUTPUT successfully!"
echo "File size: $(wc -c < "$OUTPUT") bytes"
