import { expect } from "@playwright/test";

export function assertConsoleErrors(page) {
    const consoleErrors = [];
  
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
  
    expect(consoleErrors).toEqual([]);
    //return consoleErrors;
  }