import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { Ensure, equals } from "@serenity-js/assertions";
import { type Actor } from "@serenity-js/core";
import { Login } from "../../serenity/onehub/Login";
setDefaultTimeout(60 * 1000);

Given(
  "{actor} has navigated to the login page",
  { timeout: 7000000 },
  async (actor: Actor) => {
    await actor.attemptsTo(Login.goToLoginPage());
  }
);

When("{pronoun} signs in", { timeout: 7000000 }, async (actor: Actor) => {
  await actor.attemptsTo(Login.enterCCEmail());
  await actor.attemptsTo(Login.enterMSFTPassword());
  await actor.attemptsTo(Login.msftStaySignedIn());
});

Then(
  "The home page will should be displayed",
  { timeout: 7000000 },
  async () => {
    Ensure.that(Login.homePageTitle(), equals("Home | Nutrien HUB"));
  }
);
