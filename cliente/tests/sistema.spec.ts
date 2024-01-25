import { test, expect } from '@playwright/test';

test('Iniciar sesión & shake & add food to calendar', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await page.locator('div').filter({ hasText: /^Iniciar Sesion$/ }).getByRole('button').click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('g@gmail.com');
  await page.getByPlaceholder('Contraseña').click();
  await page.getByPlaceholder('Contraseña').fill('g12345');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.locator('div').filter({ hasText: /^Comidas Diarias$/ }).click();
  await page.getByRole('button', { name: 'Shake It' }).click();
  await page.locator('.absolute > .inline-flex').click();
  await page.getByRole('button', { name: 'Ver en Calendario' }).click();
  console.log("Test 1 passed")
});

test('Iniciar sesión & add food to calendar & check food', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await page.locator('div').filter({ hasText: /^Iniciar Sesion$/ }).getByRole('button').click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('g@gmail.com');
  await page.getByPlaceholder('Contraseña').click();
  await page.getByPlaceholder('Contraseña').fill('g12345');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

  await page.locator('div').filter({ hasText: /^Comidas Diarias$/ }).click();
  await page.getByRole('button', { name: 'Comida' }).click();
  await page.locator('div').filter({ hasText: /^testFood$/ }).click();
  await page.getByRole('button').nth(1).click();
  await page.locator('button').filter({ hasText: 'Ver en Calendario' }).click();
    // await expect(page.getByLabel('Jueves, 24 Enero')).toContainText('testFood');
  await expect(page.getByText('testFood')).toContainText('testFood');
  console.log("Test 2 passed")
})

test('Iniciar & crear Template & leave template', async ({ page }) => {
	await page.goto('http://localhost:8080/');
  await page.locator('div').filter({ hasText: /^Iniciar Sesion$/ }).getByRole('button').click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('g@gmail.com');
  await page.getByPlaceholder('Contraseña').click();
  await page.getByPlaceholder('Contraseña').fill('g12345');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
	
  await page.getByRole('button', { name: 'Mis Plantillas' }).getByRole('button').click();
  await page.getByPlaceholder('Nombre').click();
  await page.getByPlaceholder('Nombre').fill('New Template');
  await page.getByRole('button', { name: 'Crear' }).click();
  await page.locator('div').filter({ hasText: /^New Template$/ }).click();
  await page.locator('section').filter({ hasText: /^New Template Comida$/ }).getByRole('button').nth(1).click();
  await page.getByRole('button', { name: 'Salir del grupo' }).click();
  await page.getByText('Confirmar').click();  
  console.log("Test 3 passed")
});
