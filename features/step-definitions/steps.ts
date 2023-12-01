import { Given, When, Then, type DataTable } from "@cucumber/cucumber";
import { Ensure, equals } from "@serenity-js/assertions";
import { type Actor } from "@serenity-js/core";
import { TodoList } from "../../serenity/todo-list-app/TodoList";
import { CucumberHelpers } from "../../support/cucumber-helper";

Given(
  "{actor} starts/started with a list containing:",
  { timeout: 7000000 },
  async (actor: Actor, table: DataTable) => {
    await actor.attemptsTo(
      TodoList.createListContaining(CucumberHelpers.itemsFrom(table))
    );
  }
);

When(
  "{pronoun} marks/marked the following item(s) as completed:",
  async (actor: Actor, table: DataTable) => {
    await actor.attemptsTo(
      TodoList.markAsCompleted(CucumberHelpers.itemsFrom(table))
    );
  }
);

When(
  "{pronoun} marks/marked the following item(s) as outstanding:",
  async (actor: Actor, table: DataTable) => {
    await actor.attemptsTo(
      TodoList.markAsOutstanding(CucumberHelpers.itemsFrom(table))
    );
  }
);

Then(
  "{pronoun} should see that she has {int} item(s) outstanding",
  async (actor: Actor, expectedCount: number) => {
    await actor.attemptsTo(
      Ensure.that(TodoList.outstandingItemsCount(), equals(expectedCount))
    );
  }
);
