import { test } from "@playwright/test";
import { injectAxe, checkA11y } from "@axe-core/playwright";

const pagesToTest = ["/", "/solutions", "/blog", "/contact"];

for (const path of pagesToTest) {
  test(`axe check ${path}`, async ({ page }) => {
    await page.goto(path);
    await injectAxe(page);
    await checkA11y(page, undefined, {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });
  });
}
