import {
  contain,
  Ensure,
  equals,
  includes,
  isGreaterThan,
} from "@serenity-js/assertions";
import {
  type Answerable,
  Check,
  d,
  type QuestionAdapter,
  Task,
  Wait,
  Duration,
  WaitUntil,
} from "@serenity-js/core";
import {
  By,
  Enter,
  ExecuteScript,
  isVisible,
  Key,
  Navigate,
  Page,
  PageElement,
  PageElements,
  Press,
  Text,
} from "@serenity-js/web";
import * as creds from "../../support/creds.json";

export class Login {
  static #emailInput = () =>
    PageElement.located(By.css('input[aria-label="Email"]')).describedAs(
      "Email Input"
    );

  static #passwordInput = () =>
    PageElement.located(By.css('input[aria-label="Password"]')).describedAs(
      "Password Input"
    );

  static #microsoftPasswordInput = () =>
    PageElement.located(By.css('input[name="passwd"]')).describedAs(
      "Microsoft Password Input"
    );

  static #nutrienLoginButton = () =>
    PageElement.located(By.css('button[aria-label="Log In"')).describedAs(
      "Log in button on the login page"
    );

  static #microsoftSignInButton = () =>
    PageElement.located(By.css('input[value="Sign in"]')).describedAs(
      "Microsoft Sign In Button"
    );

  static #microsoftStaySignedInYesButton = () =>
    PageElement.located(By.css('input[value="Yes"]')).describedAs(
      "Stay signed in yes button"
    );

  static homePageTitle = () =>
    Page.current().title().describedAs("Home page title");

  static goToLoginPage = () =>
    Task.where(
      "#actor navigates to the onehub login page",
      Navigate.to("https://hub.sit.nutrienagsolutions.com"),
      Ensure.that(
        Page.current().title().describedAs("Login page title"),
        equals("Nutrien HUB")
      ),
      Wait.until(this.#emailInput(), isVisible())
    );

  static login = () =>
    Task.where(
      d`#actor logs into nutrien onehub`,
      Enter.theValue(creds.email).into(this.#emailInput()),
      Press.the(Key.Enter).in(this.#nutrienLoginButton()),
      Wait.until(this.#microsoftPasswordInput(), isVisible()),
      Enter.theValue(creds.pw).into(this.#microsoftPasswordInput()),
      Press.the(Key.Enter).in(this.#microsoftSignInButton()),
      Wait.until(this.#microsoftStaySignedInYesButton(), isVisible()),
      Press.the(Key.Enter).in(this.#microsoftStaySignedInYesButton()),
      Wait.until(
        Page.current().title().describedAs("Home page title"),
        equals("Home | Nutrien HUB")
      )
    );

  static enterCCEmail = () =>
    Task.where(
      d`#actor enters their email into onehub login`,
      Enter.theValue(creds.email).into(this.#emailInput()),
      Press.the(Key.Enter).in(this.#nutrienLoginButton()),
      Wait.until(this.#microsoftPasswordInput(), isVisible())
    );

  static enterMSFTPassword = () =>
    Task.where(
      "#actor enters the password on the microsoft sso page",
      Enter.theValue(creds.pw).into(this.#microsoftPasswordInput()),
      Press.the(Key.Enter).in(this.#microsoftSignInButton()),
      Wait.until(this.#microsoftStaySignedInYesButton(), isVisible())
    );

  static msftStaySignedIn = () =>
    Task.where(
      "#actor selects to stay signed in",
      Press.the(Key.Enter).in(this.#microsoftStaySignedInYesButton()),
      Wait.until(
        Page.current().title().describedAs("Home page title"),
        equals("Home | Nutrien HUB")
      )
    );
}
