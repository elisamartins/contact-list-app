import { render, screen, waitFor } from "@testing-library/react";
import { IContact } from "../../src/types";
import React from "react";
import ContactList from "../../src/components/ContactList";
import { it, expect, describe, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";

describe(ContactList, () => {
  const mockOnClickAddContact = vi.fn();
  const mockOnClickContact = vi.fn();

  describe("no contacts provided", () => {
    it("displays an empty list message if no contacts are provided", () => {
      render(
        <ContactList
          contacts={[]}
          onClickAddContact={mockOnClickAddContact}
          onClickContact={mockOnClickContact}
        />,
      );

      expect(screen.getByText(/Contacts \(0\)/)).toBeInTheDocument();
    });
  });

  describe("list of contacts provided", () => {
    const contacts: IContact[] = [
      {
        id: "1",
        name: "Alice Johnson",
        jobTitle: "Engineer",
        imageUrl: "",
        phoneNumbers: [],
      },
      {
        id: "2",
        name: "Bob Smith",
        jobTitle: "Designer",
        imageUrl: "",
        phoneNumbers: [],
      },
      {
        id: "3",
        name: "Charlie Brown",
        jobTitle: "Manager",
        imageUrl: "",
        phoneNumbers: [],
      },
    ];

    beforeEach(() => {
      mockOnClickAddContact.mockClear();
      mockOnClickContact.mockClear();
      render(
        <ContactList
          contacts={contacts}
          onClickAddContact={mockOnClickAddContact}
          onClickContact={mockOnClickContact}
        />,
      );
    });

    it("renders a list of contacts", () => {
      contacts.forEach((contact) => {
        const contactButton = screen.getByRole("button", {
          name: new RegExp(`${contact.name} ${contact.jobTitle}`, "i"),
        });
        expect(contactButton).toBeInTheDocument();
      });
      expect(screen.getByText(/Contacts \(3\)/)).toBeInTheDocument();
    });

    it("calls onClickAddContact", async () => {
      clickAddContactButton();

      await waitFor(() => {
        expect(mockOnClickAddContact).toHaveBeenCalledOnce();
      });
    });

    it("calls onClickContact with the correct id when a contact is clicked", async () => {
      const firstContactButton = screen.getByRole("button", {
        name: /alice johnson engineer/i,
      });

      await userEvent.click(firstContactButton);

      await waitFor(() => {
        expect(mockOnClickContact).toHaveBeenCalledWith("1");
        expect(mockOnClickContact).toHaveBeenCalledOnce();
      });
    });
  });
});

function clickAddContactButton() {
  userEvent.click(screen.getByRole("button", { name: /add contact/i }));
}
