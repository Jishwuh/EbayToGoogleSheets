# eBay to Google Sheets Exporter

A simple Chrome extension to grab key order details from eBay order pages and output a tab‑delimited row ready for Google Sheets.

## Sheet Setup

Create a Google Sheet with the following header row (each field will map to one column):

```
SHIPDATE	ITEM	ORDER #	TRACKING #	GROSS	COST	SHIPPING	REFUND	RETURN LABEL
```

* `SHIPDATE` – manually replace the placeholder after pasting.
* `ITEM` – product name hyperlinked to its eBay page.
* `ORDER #` and `TRACKING #` – both linked back to the eBay order detail page.
* `GROSS` – auto‑calculated (order earnings + shipping).
* `COST` – manually enter your cost.
* `SHIPPING` – positive shipping label cost.
* `REFUND` & `RETURN LABEL` – default to `0`, update if a return occurs.

## Installation

1. Download or clone the entire extension folder (including `manifest.json`, `content.js`, `popup.html`, `popup.js`).
2. In Chrome, navigate to `chrome://extensions/`.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select this extension’s directory.
5. You should see **eBay to Google Sheets Exporter** in your extensions list.

## Usage

1. Navigate to any eBay order details page matching:

   ```
   https://www.ebay.com/mesh/ord/details?*_orderid=...
   ```
2. Click the extension icon in your toolbar and then the **Get Info for Sheets** button.
3. The extension will fetch the data and display a single row in the textarea.
4. Press **Ctrl+C** (or **Cmd+C** on Mac) to copy the row.
5. In your Google Sheet, select the first empty row under your header and paste.
6. Adjust the **SHIPDATE** and **COST** cells as needed.

## Troubleshooting

* If nothing appears, ensure you’re on a supported order URL.
* Verify that the page’s HTML structure hasn’t changed (selectors in `content.js`).
* Reload the extension on `chrome://extensions/` after any edits.

## Customization

* Change the `INSERTDATE` or `INSERTCOST` placeholders directly in the code if desired.
* Modify CSS in `popup.html` to adjust the popup appearance.

## License

Licensed under MIT. Feel free to modify and share!
