import { test, expect } from '@playwright/test';

test.describe('TodoMVC Demo Tests', () => {
  test('Should add tasks, complete second task, verify first task, and delete Task C', async ({ page }) => {
    // Navigate to the TodoMVC page
    await page.goto('https://demo.playwright.dev/todomvc');

    // Locator for the input field to add new todos
    const newTodoInput = page.locator('.new-todo');

    // Add 3 tasks: Task A, Task B, Task C
    await newTodoInput.fill('Task A');
    await newTodoInput.press('Enter');

    await newTodoInput.fill('Task B');
    await newTodoInput.press('Enter');

    await newTodoInput.fill('Task C');
    await newTodoInput.press('Enter');

    // Verify that all 3 tasks were added
    const todoItems = page.locator('.todo-list li');
    await expect(todoItems).toHaveCount(3);

    // Tick/check the second task (index 1) using .nth(1)
    const secondTaskCheckbox = todoItems.nth(1).locator('.toggle');
    await secondTaskCheckbox.check();

    // Verify the second task is completed
    await expect(todoItems.nth(1)).toHaveClass(/completed/);

    // Verify the first task is "Task A" using .first()
    const firstTask = todoItems.first().locator('label');
    await expect(firstTask).toHaveText('Task A');

    // Use .filter() to select the task with content "Task C" and delete it
    const taskC = todoItems.filter({ hasText: 'Task C' });
    
    // Hover over Task C to reveal the delete button
    await taskC.hover();
    
    // Click the delete button for Task C
    const deleteButton = taskC.locator('.destroy');
    await deleteButton.click();

    // Verify Task C is deleted - now should have only 2 tasks
    await expect(todoItems).toHaveCount(2);

    // Verify remaining tasks are Task A and Task B
    await expect(todoItems.first()).toContainText('Task A');
    await expect(todoItems.nth(1)).toContainText('Task B');
  });
});
