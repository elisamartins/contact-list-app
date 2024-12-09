import { it, expect, describe, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import ContactDetails from "../../src/components/ContactDetails";
import { IContact } from "../../src/types";
import userEvent from "@testing-library/user-event";

describe(ContactDetails, () => {
	const contact: IContact = {
		id: "1",
		name: "Johnny Appleseed",
		jobTitle: "Frontend Developer",
		address: "123 Apple St.",
		email: "johnny.appleseed@gmail.com",
		phoneNumbers: ["123-456-7890", "987-654-3210"],
		imageUrl: "https://mock.com",
	};

	const mockGoBackComponent = <button>Go Back</button>;
	const mockOnClickEdit = vi.fn();
	const mockOnClickDelete = vi.fn();

	beforeEach(() => {
		mockOnClickEdit.mockClear();
		mockOnClickDelete.mockClear();
		render(
			<ContactDetails
				contact={contact}
				goBackComponent={mockGoBackComponent}
				onClickDelete={mockOnClickDelete}
				onClickEdit={mockOnClickEdit}
			/>
		);
	});

	it("renders contact detailed information", () => {
		expect(screen.getByText("Johnny Appleseed")).toBeInTheDocument();
		expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
		expect(
			screen.getByText("123 Apple St.")
		).toBeInTheDocument();
		expect(screen.getByText("johnny.appleseed@gmail.com")).toBeInTheDocument();

		expect(screen.getByText("123-456-7890")).toBeInTheDocument();
		expect(screen.getByText("987-654-3210")).toBeInTheDocument();

		const image = screen.getByRole('img');
		expect(image).toHaveAttribute('src', "https://mock.com")
	});

	it("calls onClickEdit when edit button is clicked", async () => {
		clickEditButton();
		await waitFor(() => {
			expect(mockOnClickEdit).toHaveBeenCalledOnce();
		});
	});

	it("calls onClickDelete when delete button is clicked", async () => {
		clickDeleteButton();
		await waitFor(() => {
			expect(mockOnClickDelete).toHaveBeenCalledOnce();
		});
	});
});

function clickEditButton() {
	userEvent.click(screen.getByRole("button", {
		name: /edit contact/i,
	}))
}

function clickDeleteButton() {
	userEvent.click(screen.getByRole("button", {
		name: /delete contact/i,
	}))
}



