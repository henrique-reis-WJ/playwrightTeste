import { Locator, Page, expect } from "@playwright/test"
import { TaskModel } from "../../../fixtures/task.model"

export class TaskPage {

    readonly page: Page
    readonly inputTaskName: Locator

    constructor(page: Page) {
        this.page = page
        this.inputTaskName = page.locator('#newTask')
    }

    async go() {
        await this.page.goto('http://localhost:8080')
        await expect(this.page).toHaveTitle('Gerencie suas tarefas com Mark L')
    }
    
    async createTask(task: TaskModel) {
        await this.inputTaskName.fill(task.name)
        await this.page.click('css=button >> text=Create')
    }

    async shoudHaveText(taskName: string) {
        const target = this.page.locator(`css=.task-item p >> text=${taskName}`)
        await expect(target).toBeVisible()
    }

    async alertHaveText(text: string) {
        const target = this.page.locator('.swal2-html-container')
        await expect(target).toHaveText(text)
    }

    async toogle()
}