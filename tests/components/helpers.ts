import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";

export function getName() {
  return screen.getByRole("textbox", {
    name: /name/i,
  });
}

export function getJobTitle() {
  return screen.getByRole("textbox", {
    name: /job title/i,
  });
}

export function getPhones() {
  return screen.getAllByRole("textbox", {
    name: /phone number/i,
  });
}

export function getEmail() {
  return screen.getByRole("textbox", {
    name: /email/i,
  });
}

export function getAddress() {
  return screen.getByRole("textbox", {
    name: /address/i,
  });
}

export function getImageUrl() {
  return screen.getByRole("textbox", {
    name: /image url/i,
  });
}

export function getAddPhoneNumber() {
  return screen.getByText(/add a phone number/i);
}

export function getFirstPhoneDeleteButton() {
  return screen.getByRole("button", {
    name: new RegExp(`delete phone field ${0}`, "i"),
  });
}

export function clickSubmitButton() {
  userEvent.click(screen.getByRole("button", { name: /save changes/i }));
}

export function clickAddContactButton() {
  userEvent.click(screen.getByRole("button", { name: /add contact/i }));
}

export function clickEditButton() {
  userEvent.click(
    screen.getByRole("button", {
      name: /edit contact/i,
    }),
  );
}

export function clickDeleteButton() {
  userEvent.click(
    screen.getByRole("button", {
      name: /delete contact/i,
    }),
  );
}
