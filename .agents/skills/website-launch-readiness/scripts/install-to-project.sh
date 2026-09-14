#!/usr/bin/env bash
# =================================================================
# Install 'website-launch-readiness' skill to any project (Bash)
# =================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_SKILL_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

TARGET_DIR="$1"

if [ -z "$TARGET_DIR" ]; then
  echo "Usage: $0 <path-to-target-project>"
  echo "Example: $0 ../../Garba/option-1-astro-tailwind"
  exit 1
fi

if [ ! -d "$TARGET_DIR" ]; then
  echo "Error: Target directory '$TARGET_DIR' does not exist."
  exit 1
fi

DEST_DIR="$TARGET_DIR/.agents/skills/website-launch-readiness"
mkdir -p "$DEST_DIR"

echo "Copying skill to $DEST_DIR..."
cp -R "$SOURCE_SKILL_DIR/"* "$DEST_DIR/"

if [ -f "$DEST_DIR/SKILL.md" ]; then
  echo "✅ Successfully installed website-launch-readiness skill into $TARGET_DIR"
else
  echo "❌ Installation failed."
  exit 1
fi
