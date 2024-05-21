import { test, expect } from '@playwright/test'


test('verificar campo cpf', async({page}) => { 
    await page.goto('https://www.portoseguro.com.br/loja/cartao-de-credito/aquisicao')
    await expect(page).toHaveTitle('Boas vindas')
   
    const locatorTitle = page.locator('css=h1 >> text="Solicite o seu Cartão Porto Bank"')
    await expect(locatorTitle).toBeVisible()

    const inputCPF = page.locator('input[type="text"]')
    expect(inputCPF).toBeVisible({timeout: 2000})
    await inputCPF.fill('44364354821')

    //const buttonContinue = page.locator('//button[contains(.,Vamos lá)])')
    //expect(buttonContinue).toBeVisible()
})