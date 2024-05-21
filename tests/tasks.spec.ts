import { expect, test } from '@playwright/test'
import { TaskModel } from './fixtures/task.model'
import { deleteTaskHelper, postTask } from './support/helpers'
import { TaskPage, TaskPage } from './support/pages/tasks'
import data from './fixtures/tasks.json'

//import { faker } from '@faker-js/faker'


test('deve poder cadastrar uma nova tarefa', async ({ page, request }) => {


    const tasksPage: TaskPage = new TaskPage(page)
    const task = data.sucess as TaskModel

    await deleteTaskHelper(request, task.name)

    await tasksPage.go()
    await tasksPage.createTask(task)
    await tasksPage.shoudHaveText(task.name)
})

test('não deve permitir tarefa duplicada', async ({ page, request }) => {

    const tasksPage: TaskPage = new TaskPage(page)
    const task = data.duplicate as TaskModel

    await deleteTaskHelper(request, task.name)
    await postTask(request, task)

    await tasksPage.go()
    await tasksPage.createTask(task)
    await tasksPage.shoudHaveText(task.name)

    await tasksPage.alertHaveText('Task already exists!')
})

test('campo obrigatório', async ({ page }) => {

    const task = data.required as TaskModel

    const tasksPage: TaskPage = new TaskPage(page)

    await tasksPage.go()
    await tasksPage.createTask(task)

    //caso o campo seja required
    const validationMessage = await tasksPage.inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)
    expect(validationMessage).toEqual('This is a required field')
})

test('concluir uma tarefa', async ({ page, request }) => {

    const task = data.update as TaskModel

    await deleteTaskHelper(request, task.name)
    await postTask(request, task)

    const tasksPage : TaskPage = new TaskPage(page)

    await tasksPage.go()

    await tasksPage.toogle()
    




})



// localizador xPath //button[contains(text(), "Create")]
// localizador do Playwright 'css=button >> text=Create
// simular teclado await inputTask.press('Enter')
// usar faker inputTask.fill(faker.lorem.words())
