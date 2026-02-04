import { test, expect } from "@playwright/test";

test("navbar navigation and logo return", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "About" }).click();
  await expect(
    page.getByRole("heading", { name: "About ClearDrop Tech" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "ClearDrop Tech home" }).click();
  await expect(
    page.getByRole("heading", {
      name: "Data-driven platforms for resilient, distributed operations.",
    }),
  ).toBeVisible();
});

test("solutions dropdown navigates to detail pages", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Solutions" }).click();
  await page.getByRole("link", { name: "Inventory Intelligence" }).click();
  await expect(
    page.getByRole("heading", { name: "Inventory Intelligence" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Solutions" }).click();
  await page.getByRole("link", { name: "IoT Security" }).click();
  await expect(
    page.getByRole("heading", { name: "IoT Security" }),
  ).toBeVisible();
});

test("blog and case study breadcrumbs work", async ({ page }) => {
  await page.goto("/blog");
  await page.getByRole("link", { name: "Introducing ClearDrop Tech" }).click();
  await expect(
    page.getByRole("link", { name: "Blog" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Blog" }).click();
  await expect(page).toHaveURL("/blog");

  await page.goto("/case-studies");
  await page
    .getByRole("link", { name: "Nairobi Retailers Reclaimed Inventory Accuracy" })
    .click();
  await expect(
    page.getByRole("link", { name: "Case Studies" }),
  ).toBeVisible();
});

test("contact form validation blocks empty submissions", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Name is required.")).toBeVisible();
  await expect(page.getByText("Enter a valid email.")).toBeVisible();
  await expect(
    page.getByText("Message must be at least 10 characters."),
  ).toBeVisible();
});
