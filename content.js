function extractData() {
    const shipDate = "INSERTDATE";

    const itemAnchor = document.querySelector(
        '#itemInfo > div > div > div > div > div.lineItemCardInfo__content > div.details > a'
    );
    const itemText = itemAnchor ? itemAnchor.innerText.trim() : '';
    const itemHref = itemAnchor ? itemAnchor.href : '';

    const orderUrl = window.location.href;
    const urlParams = new URL(orderUrl).searchParams;
    const orderId = urlParams.get('orderid') || '';

    const trackingButton = document.querySelector(
        'body > div.sh-core-layout.vod-details > div.sh-core-layout__body > div > div.wrapper > div.content > div:nth-child(8) > div > div.content > div.details > div:nth-child(2) > div.tracking-info > div:nth-child(2) > div > button:nth-child(1)'
    );
    const trackingNumber = trackingButton ? trackingButton.innerText.trim() : '';

    const earningsSection = document.querySelector(
        'body > div.sh-core-layout.vod-details > div.sh-core-layout__body > div > div.wrapper > div.side > div:nth-child(2) > div > dl > div.earnings'
    );

    const orderEarningsEl = earningsSection ?
        earningsSection.querySelector('.total dd.amount .value span.sh-bold') :
        null;
    const orderEarnings = orderEarningsEl ?
        parseFloat(orderEarningsEl.innerText.replace(/[^0-9.-]+/g, '')) :
        0;

    let shippingCostRaw = 0;
    if (earningsSection) {
        const level2Els = earningsSection.querySelectorAll('.level-2');
        level2Els.forEach(el => {
            const labelEl = el.querySelector('dt.label');
            if (labelEl && /shipping/i.test(labelEl.innerText)) {
                const amountEl = el.querySelector('dd.amount .value span');
                if (amountEl) {
                    shippingCostRaw = parseFloat(amountEl.innerText.replace(/[^0-9.-]+/g, ''));
                }
            }
        });
    }
    const shippingCost = Math.abs(shippingCostRaw);

    const gross = orderEarnings + shippingCost;

    const cost = "INSERTCOST";
    const refund = "0";
    const returnLabel = "0";

    const fields = [
        shipDate,
        `=HYPERLINK("${itemHref}", "${itemText}")`,
        `=HYPERLINK("${orderUrl}", "${orderId}")`,
        `=HYPERLINK("${orderUrl}", "${trackingNumber}")`,
        gross.toFixed(2),
        cost,
        shippingCost.toFixed(2),
        refund,
        returnLabel
    ];

    return fields.join("\t");
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getData') {
        const row = extractData();
        sendResponse({
            data: row
        });
    }
});