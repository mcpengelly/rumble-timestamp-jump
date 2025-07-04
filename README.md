# Rumble Timestamp Jump

**Rumble Timestamp Jump** is a Chrome extension that makes comment timestamps on [rumble.com](https://rumble.com) clickable — jumping the video to the right time.

🎯 Unofficial utility to improve Rumble usability for creators and viewers.

---

## 🔧 Features

- Detects timestamps like `1:23`, `12:34`, or `1:02:03` in comment text
- Makes them clickable — jump directly to that moment in the video
- Displays an overlay confirmation (`⏩ Jumped to 1:23`)
- Automatically watches for dynamically loaded comments (no refresh needed)

---

## 🧩 How it Works (Code Summary)

| Function                      | Purpose                                                               |
| ----------------------------- | --------------------------------------------------------------------- |
| `parseTimestamp(text)`        | Converts `hh:mm:ss` or `mm:ss` to total seconds                       |
| `createOverlay(text, y)`      | Shows a brief confirmation overlay                                    |
| `enhanceTimestamps()`         | Finds and replaces timestamp text with clickable spans                |
| `waitForCommentsAndEnhance()` | Uses a MutationObserver to wait for and track comment section updates |

The extension adds `dataset.processed = true` to each comment to prevent re-processing.

---

## Installation
Get it on the [Chrome Webstore](https://chromewebstore.google.com/detail/rumble-timestamp-jump/pjdbbnijgmfcplbbkppchdnolhgablbp).

---

## 🛑 Disclaimer

This tool is **not affiliated with or endorsed by Rumble**. All trademarks belong to their respective owners.

---

## 📜 License

MIT © [Matt Pengelly](https://mattpengelly.com)
